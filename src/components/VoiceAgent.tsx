import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Loader2, X, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  language?: string;
}

export const VoiceAgent = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('English');
  
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Language mapping for speech synthesis
  const languageVoiceMap: Record<string, string> = {
    'english': 'en-US',
    'hindi': 'hi-IN',
    'spanish': 'es-ES',
    'french': 'fr-FR',
    'german': 'de-DE',
    'chinese': 'zh-CN',
    'japanese': 'ja-JP',
    'korean': 'ko-KR',
    'arabic': 'ar-SA',
    'portuguese': 'pt-BR',
    'russian': 'ru-RU',
    'italian': 'it-IT',
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return null;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Will auto-detect language
    
    return recognition;
  }, [toast]);

  const speakText = useCallback((text: string, language: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const langCode = languageVoiceMap[language.toLowerCase()] || 'en-US';
      utterance.lang = langCode;
      utterance.rate = 1;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const processWithAI = useCallback(async (userMessage: string) => {
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('voice-agent', {
        body: { 
          message: userMessage,
          conversationHistory: messages.slice(-10) // Last 10 messages for context
        }
      });

      if (error) throw error;

      const aiResponse = data.response;
      const detectedLang = data.language || 'English';
      
      setDetectedLanguage(detectedLang);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse,
        language: detectedLang
      }]);
      
      // Speak the response in detected language
      speakText(aiResponse, detectedLang);
      
    } catch (error) {
      console.error('AI processing error:', error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [messages, speakText, toast]);

  const startListening = useCallback(() => {
    const recognition = initSpeechRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;
    
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessages(prev => [...prev, { role: 'user', content: transcript }]);
      processWithAI(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error !== 'no-speech') {
        toast({
          title: "Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive",
        });
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [initSpeechRecognition, processWithAI, toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return (
    <>
      {/* Floating Voice Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 shadow-lg shadow-primary/25 animate-pulse-glow"
        size="icon"
      >
        <Mic className="w-7 h-7" />
      </Button>

      {/* Voice Agent Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-cyan-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AIVocal Assistant</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe className="w-3 h-3" />
                    <span>Speaking: {detectedLanguage}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mic className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm">Press the microphone and speak in any language.</p>
                  <p className="text-xs mt-2">Supports English, Hindi, Spanish & more</p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    {msg.language && msg.role === 'assistant' && (
                      <span className="text-xs opacity-70 mt-1 block">{msg.language}</span>
                    )}
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Controls */}
            <div className="p-4 border-t border-border/50 bg-muted/30">
              <div className="flex items-center justify-center gap-4">
                {isSpeaking && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={stopSpeaking}
                    className="w-12 h-12 rounded-full"
                  >
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </Button>
                )}
                
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                  className={`w-16 h-16 rounded-full transition-all ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                      : 'bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90'
                  }`}
                  size="icon"
                >
                  {isListening ? (
                    <MicOff className="w-7 h-7" />
                  ) : (
                    <Mic className="w-7 h-7" />
                  )}
                </Button>
              </div>
              
              <p className="text-center text-xs text-muted-foreground mt-3">
                {isListening 
                  ? 'Listening... Speak now' 
                  : isProcessing 
                    ? 'Processing...' 
                    : 'Tap to speak'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

