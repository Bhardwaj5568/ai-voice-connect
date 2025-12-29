import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// AIVocal.online site knowledge base
const SITE_KNOWLEDGE = `
# AIVocal.online - AI Voice Calling Agency

## About Us
AIVocal.online is an AI Voice Calling Agency based in Jaipur, Rajasthan, India. We specialize in providing AI-powered voice agents for businesses.

## Founder
- Name: Neeraj Sharma
- Title: Founder & CEO
- Location: Jaipur, Rajasthan, India
- Background: Passionate entrepreneur dedicated to transforming business communication through AI voice technology. Committed to delivering enterprise-grade AI solutions that are accessible to businesses of all sizes.

## Contact
- WhatsApp: +91 7792848355
- Website: aivocal.online

## Core Services

### 1. Inbound Call Handling
- AI agents answer customer calls 24/7
- Handle inquiries, complaints, and support requests
- Route complex issues to human agents when needed

### 2. Outbound Calling
- Automated lead qualification calls
- Appointment reminders and confirmations
- Follow-up calls and customer surveys

### 3. Appointment Scheduling
- AI books appointments directly into your calendar
- Sends confirmation and reminder messages
- Handles rescheduling and cancellations

### 4. Lead Qualification
- Scores and qualifies leads automatically
- Asks qualifying questions based on your criteria
- Prioritizes hot leads for immediate follow-up

## Target Industries
1. Healthcare & Medical Clinics - Patient appointment scheduling, reminders, and follow-ups
2. Real Estate Agencies - Property inquiries, viewings, and lead qualification
3. E-commerce & Retail - Order status, returns, and customer support
4. Financial Services - Account inquiries, loan applications, and support
5. Hospitality & Hotels - Reservations, concierge services, and guest support
6. Education & EdTech - Enrollment inquiries, course information, and student support
7. Legal Services - Client intake, appointment scheduling, and case updates
8. Automotive & Car Dealerships - Test drive bookings, service appointments, and inquiries

## Key Benefits
- 24/7 Availability: Never miss a call, even outside business hours
- 50% Cost Reduction: Reduce operational costs compared to traditional call centers
- 3x More Conversions: Higher engagement and follow-up rates
- Human-like Conversations: Natural, context-aware AI that feels authentic
- Easy Integration: Works with your existing CRM, calendar, and phone systems
- Global Reach: Support customers in multiple languages and time zones

## Why Choose an Agency Over Building Custom?
- Focus on Results, Not Tools: We handle the technology while you focus on your business
- Quick Deployment: Get started in days, not months
- Proven Systems: Benefit from tested and optimized AI voice solutions
- Ongoing Support: Continuous improvement and technical support included

## Common Problems We Solve
1. Missed Calls = Lost Revenue: Never miss a potential customer again
2. High Staffing Costs: Reduce the need for large call center teams
3. Inconsistent Service: Provide consistent, high-quality responses every time
4. Limited Hours: Be available to customers 24/7/365
`;

const SYSTEM_PROMPT = `You are the AI assistant for AIVocal.online, an AI Voice Calling Agency. You are multilingual and can respond in any language the user speaks.

IMPORTANT INSTRUCTIONS:
1. DETECT the language of the user's message and RESPOND IN THE SAME LANGUAGE
2. Be helpful, friendly, and professional
3. Use the knowledge base below to answer questions about AIVocal.online
4. If asked about pricing, mention that they should contact us via WhatsApp at +91 7792848355 for a custom quote
5. Keep responses concise but informative (2-4 sentences typically)
6. If the user greets you, greet them back warmly and ask how you can help

SITE KNOWLEDGE:
${SITE_KNOWLEDGE}

LANGUAGE DETECTION:
- If user speaks English, respond in English
- If user speaks Hindi (हिंदी), respond in Hindi
- If user speaks Spanish (Español), respond in Spanish
- If user speaks any other language, respond in that language
- Always be natural and fluent in the detected language`;

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

    // Build messages array with conversation history
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
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
