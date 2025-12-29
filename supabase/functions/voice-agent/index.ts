import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fetch dynamic knowledge from database
async function getKnowledgeBase(): Promise<string> {
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

function buildSystemPrompt(knowledge: string): string {
  return `You are the AI assistant for AIVocal.online, an AI Voice Calling Agency. You are multilingual and can respond in any language the user speaks.

IMPORTANT INSTRUCTIONS:
1. DETECT the language of the user's message and RESPOND IN THE SAME LANGUAGE
2. Be helpful, friendly, and professional
3. Use the knowledge base below to answer questions about AIVocal.online
4. If asked about pricing, mention that they should contact us via WhatsApp at +91 7792848355 for a custom quote
5. Keep responses concise but informative (2-4 sentences typically)
6. If the user greets you, greet them back warmly and ask how you can help

SITE KNOWLEDGE:
${knowledge}

LANGUAGE DETECTION:
- If user speaks English, respond in English
- If user speaks Hindi (हिंदी), respond in Hindi
- If user speaks Spanish (Español), respond in Spanish
- If user speaks any other language, respond in that language
- Always be natural and fluent in the detected language`;
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

    // Fetch dynamic knowledge from database
    const knowledge = await getKnowledgeBase();
    const systemPrompt = buildSystemPrompt(knowledge);

    // Build messages array with conversation history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        tools: [
          {
            type: 'function',
            function: {
              name: 'detect_language',
              description: 'Detect the language of the response',
              parameters: {
                type: 'object',
                properties: {
                  language: { 
                    type: 'string',
                    description: 'The detected language name in English (e.g., English, Hindi, Spanish, French, German, Chinese, Japanese, Korean, Arabic, Portuguese, Russian, Italian)'
                  },
                  response: {
                    type: 'string',
                    description: 'The actual response to the user in their language'
                  }
                },
                required: ['language', 'response']
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'detect_language' } }
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
    
    let aiResponse = '';
    let detectedLanguage = 'English';
    
    // Parse tool call response
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      try {
        const args = JSON.parse(toolCall.function.arguments);
        aiResponse = args.response || '';
        detectedLanguage = args.language || 'English';
      } catch (e) {
        console.error('Failed to parse tool call:', e);
        aiResponse = data.choices?.[0]?.message?.content || 'I apologize, but I could not process your request.';
      }
    } else {
      aiResponse = data.choices?.[0]?.message?.content || 'I apologize, but I could not process your request.';
    }

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
