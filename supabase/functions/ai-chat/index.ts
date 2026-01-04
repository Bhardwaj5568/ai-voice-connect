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
  // === INDIAN LANGUAGES ===
  const hindiPattern = /[\u0900-\u097F]/;
  const bengaliPattern = /[\u0980-\u09FF]/;
  const tamilPattern = /[\u0B80-\u0BFF]/;
  const teluguPattern = /[\u0C00-\u0C7F]/;
  const gujaratiPattern = /[\u0A80-\u0AFF]/;
  const kannadaPattern = /[\u0C80-\u0CFF]/;
  const malayalamPattern = /[\u0D00-\u0D7F]/;
  const punjabiPattern = /[\u0A00-\u0A7F]/;
  const odiaPattern = /[\u0B00-\u0B7F]/;
  
  // === INTERNATIONAL LANGUAGES ===
  const arabicPattern = /[\u0600-\u06FF]/;
  const chinesePattern = /[\u4E00-\u9FFF]/;
  const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF]/;
  const koreanPattern = /[\uAC00-\uD7AF\u1100-\u11FF]/;
  const cyrillicPattern = /[\u0400-\u04FF]/; // Russian, Ukrainian, etc
  const thaiPattern = /[\u0E00-\u0E7F]/;
  const hebrewPattern = /[\u0590-\u05FF]/;
  const greekPattern = /[\u0370-\u03FF]/;
  
  // Word-based detection for Latin script languages (expanded patterns)
  const spanishPatterns = /\b(hola|gracias|por favor|buenos|buenas|cómo|está|qué|muy|también|pero|porque|tengo|quiero|necesito|dónde|cuándo|puedo|sí|español|cuál|cuáles|precio|precios|modelo|servicio|servicios|empresa|ayuda|información|su|sus|este|esta|estos|estas|el|la|los|las|un|una|unos|unas|con|sin|para|por|del|al|más|menos|hacer|tiene|tienen|cuesta|cuánto|cuánta|ustedes|nosotros|nuestro|nuestra)\b/i;
  const frenchPatterns = /\b(bonjour|merci|s'il vous plaît|comment|êtes|très|aussi|mais|parce que|j'ai|je veux|où|quand|puis-je|oui|français|bonsoir|au revoir|quel|quelle|quels|quelles|prix|modèle|service|entreprise|aide|information|votre|vos|ce|cette|ces|le|la|les|un|une|des|avec|sans|pour|par|du|au|plus|moins|faire|avez|coûte|combien|vous|nous|notre|nos)\b/i;
  const germanPatterns = /\b(hallo|danke|bitte|guten|wie|sehr|auch|aber|weil|ich|möchte|wo|wann|kann|ja|nein|deutsch|morgen|abend|welche|welcher|welches|preis|preise|modell|dienst|dienste|unternehmen|hilfe|information|ihr|ihre|dieser|diese|dieses|der|die|das|ein|eine|mit|ohne|für|von|mehr|weniger|machen|haben|kostet|wieviel|sie|wir|unser|unsere|ist|sind|was|warum|brauche|möglich|können|würde|gerne|service)\b/i;
  const portuguesePatterns = /\b(olá|obrigado|por favor|como|está|muito|também|mas|porque|tenho|quero|preciso|onde|quando|posso|sim|não|português|qual|quais|preço|preços|modelo|serviço|serviços|empresa|ajuda|informação|seu|sua|seus|suas|este|esta|estes|estas|o|a|os|as|um|uma|uns|umas|com|sem|para|por|do|ao|mais|menos|fazer|tem|custa|quanto|vocês|nós|nosso|nossa)\b/i;
  const italianPatterns = /\b(ciao|grazie|per favore|come|stai|molto|anche|ma|perché|ho|voglio|dove|quando|posso|sì|no|italiano|buongiorno|quale|quali|prezzo|prezzi|modello|servizio|servizi|azienda|aiuto|informazione|vostro|vostra|questo|questa|questi|queste|il|la|lo|i|le|gli|un|una|uno|con|senza|per|da|del|al|più|meno|fare|avete|costa|quanto|voi|noi|nostro|nostra)\b/i;
  const dutchPatterns = /\b(hallo|dank|alstublieft|hoe|gaat|zeer|ook|maar|omdat|ik heb|ik wil|waar|wanneer|kan ik|ja|nee|nederlands|welke|welk|prijs|prijzen|model|dienst|diensten|bedrijf|hulp|informatie|uw|dit|deze|de|het|een|met|zonder|voor|van|meer|minder|doen|heeft|kost|hoeveel|u|wij|ons|onze)\b/i;
  const turkishPatterns = /\b(merhaba|teşekkür|lütfen|nasıl|çok|da|ama|çünkü|istiyorum|nerede|ne zaman|yapabilir miyim|evet|hayır|türkçe|hangi|fiyat|fiyatlar|model|hizmet|hizmetler|şirket|yardım|bilgi|sizin|bu|şu|bir|ile|için|den|dan|daha|az|yapmak|var|kaç|ne kadar|siz|biz|bizim)\b/i;
  const indonesianPatterns = /\b(halo|terima kasih|tolong|bagaimana|sangat|juga|tetapi|karena|saya|ingin|di mana|kapan|bisa|ya|tidak|indonesia|mana|harga|model|layanan|perusahaan|bantuan|informasi|anda|ini|itu|sebuah|dengan|tanpa|untuk|dari|lebih|kurang|melakukan|ada|berapa|kami|kita|kami punya)\b/i;
  const vietnamesePatterns = /\b(xin chào|cảm ơn|làm ơn|như thế nào|rất|cũng|nhưng|vì|tôi|muốn|ở đâu|khi nào|có thể|vâng|không|tiếng việt|nào|giá|mô hình|dịch vụ|công ty|giúp đỡ|thông tin|của bạn|này|đó|một|với|không có|cho|từ|hơn|ít|làm|có|bao nhiêu|bạn|chúng tôi|của chúng tôi)\b/i;
  
  // Hinglish patterns
  const hinglishPatterns = [
    /\b(hai|hain|ho|tha|thi|the|ka|ki|ke|ko|se|me|ye|wo|kya|kaise|kab|kahan|kyun|aur|par|bhi|nahi|mat|abhi|bahut|accha|theek|sab|kuch|aap|tum|hum|main|mera|tera|uska|iska|wala|wali|wale)\b/i,
    /\b(karo|karna|karenge|karunga|karungi|bolo|bolna|batao|batana|dekho|dekhna|suno|sunna|jao|jana|aao|aana|khao|khana|piyo|pina|chahiye|chahte|milega|dedo|lelo)\b/i,
    /\b(namaste|dhanyavad|shukriya|kripya|jaroor|zaroor|bilkul|lekin|isliye|kyunki|phir|warna|matlab|samajh|pata)\b/i,
  ];
  
  // Check script-based languages (most reliable)
  if (arabicPattern.test(text)) return "arabic";
  if (chinesePattern.test(text)) return "chinese";
  if (japanesePattern.test(text)) return "japanese";
  if (koreanPattern.test(text)) return "korean";
  if (cyrillicPattern.test(text)) return "russian";
  if (thaiPattern.test(text)) return "thai";
  if (hebrewPattern.test(text)) return "hebrew";
  if (greekPattern.test(text)) return "greek";
  
  // Indian scripts
  if (bengaliPattern.test(text)) return "bengali";
  if (tamilPattern.test(text)) return "tamil";
  if (teluguPattern.test(text)) return "telugu";
  if (gujaratiPattern.test(text)) return "gujarati";
  if (kannadaPattern.test(text)) return "kannada";
  if (malayalamPattern.test(text)) return "malayalam";
  if (punjabiPattern.test(text)) return "punjabi";
  if (odiaPattern.test(text)) return "odia";
  if (hindiPattern.test(text)) return "hindi";
  
  // Latin script languages - use global matching for accurate scoring
  const germanMatchPattern = /\b(hallo|danke|bitte|guten|wie|sehr|auch|aber|weil|ich|möchte|wo|wann|kann|ja|nein|deutsch|morgen|abend|welche|welcher|welches|preis|preise|modell|dienst|dienste|unternehmen|hilfe|ihr|ihre|dieser|diese|dieses|der|die|das|ein|eine|mit|ohne|für|von|mehr|weniger|machen|haben|kostet|wieviel|sie|wir|unser|unsere|ist|sind|was|warum|brauche|möglich|können|würde|gerne)\b/gi;
  const frenchMatchPattern = /\b(bonjour|merci|comment|êtes|très|aussi|mais|j'ai|où|quand|oui|français|bonsoir|quel|quelle|quels|quelles|prix|modèle|entreprise|aide|votre|vos|ce|cette|ces|le|la|les|un|une|des|avec|sans|pour|par|du|au|plus|moins|faire|avez|coûte|combien|vous|nous|notre|nos)\b/gi;
  const spanishMatchPattern = /\b(hola|gracias|buenos|buenas|cómo|está|qué|muy|también|pero|porque|tengo|quiero|necesito|dónde|cuándo|puedo|sí|español|cuál|cuáles|precio|precios|modelo|servicio|servicios|empresa|ayuda|información|su|sus|este|esta|estos|estas|el|la|los|las|un|una|unos|unas|con|sin|para|por|del|al|más|menos|hacer|tiene|tienen|cuesta|cuánto|cuánta)\b/gi;
  const portugueseMatchPattern = /\b(olá|obrigado|como|está|muito|também|mas|porque|tenho|quero|preciso|onde|quando|posso|sim|não|português|qual|quais|preço|preços|modelo|serviço|serviços|empresa|ajuda|informação|seu|sua|seus|suas|este|esta|estes|estas|o|a|os|as|um|uma|uns|umas|com|sem|para|por|do|ao|mais|menos|fazer|tem|custa|quanto)\b/gi;
  const italianMatchPattern = /\b(ciao|grazie|come|stai|molto|anche|ma|perché|ho|voglio|dove|quando|posso|sì|no|italiano|buongiorno|quale|quali|prezzo|prezzi|modello|servizio|servizi|azienda|aiuto|informazione|vostro|vostra|questo|questa|questi|queste|il|la|lo|i|le|gli|un|una|uno|con|senza|per|da|del|al|più|meno|fare|avete|costa|quanto)\b/gi;
  
  const germanScore = (text.match(germanMatchPattern) || []).length;
  const frenchScore = (text.match(frenchMatchPattern) || []).length;
  const spanishScore = (text.match(spanishMatchPattern) || []).length;
  const portugueseScore = (text.match(portugueseMatchPattern) || []).length;
  const italianScore = (text.match(italianMatchPattern) || []).length;
  
  // Pick language with most matches
  const scores = [
    { lang: "german", score: germanScore },
    { lang: "french", score: frenchScore },
    { lang: "spanish", score: spanishScore },
    { lang: "portuguese", score: portugueseScore },
    { lang: "italian", score: italianScore },
  ];
  
  const bestMatch = scores.reduce((a, b) => a.score > b.score ? a : b);
  if (bestMatch.score > 0) return bestMatch.lang;
  
  if (dutchPatterns.test(text)) return "dutch";
  if (turkishPatterns.test(text)) return "turkish";
  if (indonesianPatterns.test(text)) return "indonesian";
  if (vietnamesePatterns.test(text)) return "vietnamese";
  
  // Check for Hinglish
  for (const pattern of hinglishPatterns) {
    if (pattern.test(text)) return "hinglish";
  }
  
  return "english";
}

function buildSystemPrompt(knowledge: string, detectedLang: string): string {
  const langInstructions: Record<string, string> = {
    // Indian Languages
    hindi: "IMPORTANT: Respond ONLY in Hindi (Devanagari script - हिंदी में जवाब दें).",
    hinglish: "IMPORTANT: Respond in Hinglish (Hindi words in Roman script mixed with English).",
    bengali: "IMPORTANT: Respond ONLY in Bengali (বাংলায় উত্তর দিন).",
    tamil: "IMPORTANT: Respond ONLY in Tamil (தமிழில் பதிலளிக்கவும்).",
    telugu: "IMPORTANT: Respond ONLY in Telugu (తెలుగులో సమాధానం ఇవ్వండి).",
    gujarati: "IMPORTANT: Respond ONLY in Gujarati (ગુજરાતીમાં જવાબ આપો).",
    kannada: "IMPORTANT: Respond ONLY in Kannada (ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ).",
    malayalam: "IMPORTANT: Respond ONLY in Malayalam (മലയാളത്തിൽ മറുപടി നൽകുക).",
    punjabi: "IMPORTANT: Respond ONLY in Punjabi (ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ).",
    odia: "IMPORTANT: Respond ONLY in Odia (ଓଡ଼ିଆରେ ଉତ୍ତର ଦିଅନ୍ତୁ).",
    // International Languages
    arabic: "IMPORTANT: Respond ONLY in Arabic (الرجاء الرد بالعربية).",
    chinese: "IMPORTANT: Respond ONLY in Chinese (请用中文回复).",
    japanese: "IMPORTANT: Respond ONLY in Japanese (日本語でお答えください).",
    korean: "IMPORTANT: Respond ONLY in Korean (한국어로 답변해 주세요).",
    russian: "IMPORTANT: Respond ONLY in Russian (Пожалуйста, отвечайте на русском).",
    thai: "IMPORTANT: Respond ONLY in Thai (กรุณาตอบเป็นภาษาไทย).",
    hebrew: "IMPORTANT: Respond ONLY in Hebrew (אנא השב בעברית).",
    greek: "IMPORTANT: Respond ONLY in Greek (Παρακαλώ απαντήστε στα ελληνικά).",
    spanish: "IMPORTANT: Respond ONLY in Spanish (Por favor, responde en español).",
    french: "IMPORTANT: Respond ONLY in French (Veuillez répondre en français).",
    german: "IMPORTANT: Respond ONLY in German (Bitte antworten Sie auf Deutsch).",
    portuguese: "IMPORTANT: Respond ONLY in Portuguese (Por favor, responda em português).",
    italian: "IMPORTANT: Respond ONLY in Italian (Per favore, rispondi in italiano).",
    dutch: "IMPORTANT: Respond ONLY in Dutch (Antwoord alstublieft in het Nederlands).",
    turkish: "IMPORTANT: Respond ONLY in Turkish (Lütfen Türkçe cevap verin).",
    indonesian: "IMPORTANT: Respond ONLY in Indonesian (Tolong jawab dalam bahasa Indonesia).",
    vietnamese: "IMPORTANT: Respond ONLY in Vietnamese (Vui lòng trả lời bằng tiếng Việt).",
    english: "Respond in English.",
  };

  const langInstruction = langInstructions[detectedLang] || langInstructions.english;

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
