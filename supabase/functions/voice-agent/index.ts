import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory cache for knowledge base
let knowledgeCache: { data: string; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

// Fetch dynamic knowledge from database with caching
async function getKnowledgeBase(): Promise<string> {
  // Check cache first
  if (knowledgeCache && (Date.now() - knowledgeCache.timestamp) < CACHE_TTL_MS) {
    console.log('Using cached knowledge base');
    return knowledgeCache.data;
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials not configured');
    return getFallbackKnowledge();
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase
      .from('ai_knowledge')
      .select('section_title, content')
      .eq('is_active', true)
      .order('priority', { ascending: false });

    if (error) {
      console.error('Error fetching knowledge:', error);
      return getFallbackKnowledge();
    }

    if (!data || data.length === 0) {
      console.log('No knowledge found in database, using fallback');
      return getFallbackKnowledge();
    }

    // Build knowledge string from database records
    let knowledge = '# AIVocal.online - AI Voice Calling Agency\n\n';
    for (const item of data) {
      knowledge += `## ${item.section_title}\n${item.content}\n\n`;
    }
    
    // Cache the result
    knowledgeCache = { data: knowledge, timestamp: Date.now() };
    console.log(`Loaded ${data.length} knowledge sections from database`);
    return knowledge;
  } catch (e) {
    console.error('Exception fetching knowledge:', e);
    return getFallbackKnowledge();
  }
}

// Fallback knowledge in case database is unavailable
function getFallbackKnowledge(): string {
  return `
# AIVocal.online - AI Voice Calling Agency

## About Us
AIVocal.online is an AI Voice Calling Agency based in Jaipur, Rajasthan, India. We specialize in providing AI-powered voice agents for businesses.

## Founder
- Name: Neeraj Sharma
- Title: Founder & CEO
- Location: Jaipur, Rajasthan, India

## Contact
- WhatsApp: +91 7792848355
- Website: aivocal.online

## Core Services
1. Inbound Call Handling - AI agents answer customer calls 24/7
2. Outbound Calling - Automated lead qualification and follow-up calls
3. Appointment Scheduling - AI books appointments directly into your calendar
4. Lead Qualification - Scores and qualifies leads automatically

## Key Benefits
- 24/7 Availability: Never miss a call
- 50% Cost Reduction: Reduce operational costs
- 3x More Conversions: Higher engagement rates
- Human-like Conversations: Natural, context-aware AI
`;
}

// Detect language from user message
function detectLanguage(text: string): string {
  // Hindi detection (Devanagari script or common Hindi romanized patterns)
  if (/[\u0900-\u097F]/.test(text)) return 'Hindi';
  if (/\b(kya|hai|mein|aur|ke|ki|ko|se|ka|yeh|tum|aap|hum|kaise|kab|kahan|kyun|kuch|bahut|achha|theek|nahi|haan|bhai|behen|ji)\b/i.test(text)) return 'Hindi';
  
  // Spanish detection
  if (/\b(hola|como|estas|que|donde|cuando|por|para|gracias|buenos|buenas|dias|noches|tardes)\b/i.test(text)) return 'Spanish';
  
  // French detection
  if (/\b(bonjour|comment|allez|vous|merci|bien|tres|oui|non|je|tu|nous|avec)\b/i.test(text)) return 'French';
  
  // German detection
  if (/\b(guten|tag|morgen|danke|bitte|wie|geht|ich|du|sie|wir|sind|haben)\b/i.test(text)) return 'German';
  
  // Arabic detection
  if (/[\u0600-\u06FF]/.test(text)) return 'Arabic';
  
  // Chinese detection
  if (/[\u4E00-\u9FFF]/.test(text)) return 'Chinese';
  
  // Japanese detection
  if (/[\u3040-\u30FF]/.test(text)) return 'Japanese';
  
  // Korean detection
  if (/[\uAC00-\uD7AF]/.test(text)) return 'Korean';
  
  return 'English';
}

function buildSystemPrompt(knowledge: string, detectedLang: string): string {
  return `You are the AI assistant for AIVocal.online, an AI Voice Calling Agency. You MUST respond in ${detectedLang}.

CRITICAL RULES:
1. Keep responses SHORT - 1-2 sentences maximum for voice
2. Be conversational and natural
3. Respond in ${detectedLang} language only
4. If asked about pricing, direct to WhatsApp: +91 7792848355
5. Be helpful and friendly

KNOWLEDGE:
${knowledge}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Detect language from user message
    const detectedLanguage = detectLanguage(message);
    console.log('Detected language:', detectedLanguage);

    // Fetch dynamic knowledge from database (with caching)
    const knowledge = await getKnowledgeBase();
    const systemPrompt = buildSystemPrompt(knowledge, detectedLanguage);

    // Build messages array - limit history for speed
    const recentHistory = conversationHistory.slice(-4);
    const messages = [
      { role: 'system', content: systemPrompt },
      ...recentHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Use direct chat completion without tool calling for speed
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite', // Faster model for voice
        messages,
        max_tokens: 150, // Shorter responses for voice
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'I apologize, but I could not process your request.';

    console.log('Response language:', detectedLanguage);
    console.log('Response:', aiResponse.substring(0, 100) + '...');

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        language: detectedLanguage
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Voice agent error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        response: 'I apologize, but I encountered an error. Please try again.',
        language: 'English'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
