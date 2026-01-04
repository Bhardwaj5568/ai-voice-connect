import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Cache for knowledge base
let knowledgeCache: { data: string; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getKnowledgeBase(): Promise<string> {
  // Check cache first
  if (knowledgeCache && Date.now() - knowledgeCache.timestamp < CACHE_DURATION) {
    return knowledgeCache.data;
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("ai_knowledge")
      .select("section_title, content")
      .eq("is_active", true)
      .order("priority", { ascending: false });

    if (error) {
      console.error("Error fetching knowledge:", error);
      return getFallbackKnowledge();
    }

    if (!data || data.length === 0) {
      return getFallbackKnowledge();
    }

    const knowledge = data
      .map((item) => `## ${item.section_title}\n${item.content}`)
      .join("\n\n");

    // Update cache
    knowledgeCache = { data: knowledge, timestamp: Date.now() };
    return knowledge;
  } catch (error) {
    console.error("Error in getKnowledgeBase:", error);
    return getFallbackKnowledge();
  }
}

function getFallbackKnowledge(): string {
  return `
## About AIVocal
AIVocal is India's leading AI voice calling agency. We provide intelligent voice solutions for businesses.

## Services
- AI Voice Calling Automation
- Lead Generation & Qualification
- Customer Support Automation
- Appointment Booking
- Multi-language Support (Hindi, English, Regional)

## Pricing
- Starter: ₹15,000/month (1,000 calls)
- Professional: ₹35,000/month (5,000 calls)
- Enterprise: Custom pricing

## Contact
WhatsApp: +91 7792848355
Website: aivocal.in
`;
}

function detectLanguage(text: string): string {
  const hindiPattern = /[\u0900-\u097F]/;
  const hinglishPatterns = [
    /\b(hai|hain|ho|tha|thi|the|ka|ki|ke|ko|se|me|ye|wo|kya|kaise|kab|kahan|kyun|aur|par|bhi|nahi|mat|abhi|bahut|accha|theek|sab|kuch|aap|tum|hum|main|mera|tera|uska|iska|wala|wali|wale)\b/i,
    /\b(karo|karna|karenge|karunga|karungi|bolo|bolna|batao|batana|dekho|dekhna|suno|sunna|jao|jana|aao|aana|khao|khana|piyo|pina)\b/i,
  ];

  if (hindiPattern.test(text)) return "hindi";
  for (const pattern of hinglishPatterns) {
    if (pattern.test(text)) return "hinglish";
  }
  
  // Check for other languages
  const bengaliPattern = /[\u0980-\u09FF]/;
  const tamilPattern = /[\u0B80-\u0BFF]/;
  const teluguPattern = /[\u0C00-\u0C7F]/;
  const marathiPattern = /[\u0900-\u097F].*[\u0900-\u097F]/;
  
  if (bengaliPattern.test(text)) return "bengali";
  if (tamilPattern.test(text)) return "tamil";
  if (teluguPattern.test(text)) return "telugu";
  if (marathiPattern.test(text) && hindiPattern.test(text)) return "marathi";
  
  return "english";
}

function buildSystemPrompt(knowledge: string, detectedLang: string): string {
  const langInstruction = detectedLang === "hindi" 
    ? "Respond in Hindi (Devanagari script)."
    : detectedLang === "hinglish"
    ? "Respond in Hinglish (Hindi words in Roman script mixed with English)."
    : detectedLang === "bengali"
    ? "Respond in Bengali."
    : detectedLang === "tamil"
    ? "Respond in Tamil."
    : detectedLang === "telugu"
    ? "Respond in Telugu."
    : detectedLang === "marathi"
    ? "Respond in Marathi."
    : "Respond in English.";

  return `You are AIVocal's helpful AI assistant. You help visitors learn about our AI voice calling services.

${langInstruction}

KNOWLEDGE BASE:
${knowledge}

RULES:
1. Be friendly, helpful and concise
2. Keep responses under 150 words
3. If asked about pricing, share the plans
4. For demo requests, ask them to contact via WhatsApp: +91 7792848355
5. Stay focused on AIVocal's services
6. If you don't know something, honestly say so and suggest contacting support
7. Use emojis sparingly to be friendly 😊`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const detectedLang = detectLanguage(message);
    const knowledge = await getKnowledgeBase();
    const systemPrompt = buildSystemPrompt(knowledge, detectedLang);

    // Build messages array with history
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      { role: "user", content: message }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment.", language: detectedLang }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable.", language: detectedLang }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again.";

    return new Response(
      JSON.stringify({ response: aiResponse, language: detectedLang }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
