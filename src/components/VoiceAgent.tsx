import { useState, useRef, useCallback, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { MicOff, X, Globe, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { VoiceWaveform } from './VoiceWaveform';
import { AIAvatar3D, AvatarEmotion } from './AIAvatar3D';
import { FloatingMiniAvatar } from './FloatingMiniAvatar';

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
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('English');
  const [emotion, setEmotion] = useState<AvatarEmotion>('neutral');
  const [isGreeting, setIsGreeting] = useState(false);
  
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isActiveRef = useRef(false);

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

  // Detect emotion from response content
  const detectEmotion = (text: string): AvatarEmotion => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('sorry') || lowerText.includes('unfortunately') || lowerText.includes("don't know") || lowerText.includes('not sure')) {
      return 'confused';
    }
    if (lowerText.includes('great') || lowerText.includes('excellent') || lowerText.includes('happy') || lowerText.includes('wonderful') || lowerText.includes('!')) {
      return 'happy';
    }
    if (lowerText.includes('let me think') || lowerText.includes('considering') || lowerText.includes('perhaps') || lowerText.includes('interesting')) {
      return 'thinking';
    }
    if (lowerText.includes('amazing') || lowerText.includes('wow') || lowerText.includes('fantastic')) {
      return 'excited';
    }
    return 'neutral';
  };

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
    
    // Enable continuous listening
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    return recognition;
  }, [toast]);

  const speakText = useCallback((text: string, language: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const langCode = languageVoiceMap[language.toLowerCase()] || 'en-US';
      utterance.lang = langCode;
      utterance.rate = 1;
      utterance.pitch = 1;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setEmotion(detectEmotion(text));
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setEmotion('neutral');
        // Resume listening after speaking (if still active)
        if (isActiveRef.current && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch {
            // Already started
          }
        }
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        if (isActiveRef.current && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch {
            // Already started
          }
        }
      };
      
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted]);

  const processWithAI = useCallback(async (userMessage: string) => {
    setIsProcessing(true);
    setEmotion('thinking');
    
    // Stop listening while processing
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped
      }
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('voice-agent', {
        body: { 
          message: userMessage,
          conversationHistory: messages.slice(-10)
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
      
      // Speak the response
      speakText(aiResponse, detectedLang);
      
    } catch (error) {
      console.error('AI processing error:', error);
      setEmotion('confused');
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
      
      // Resume listening even after error
      if (isActiveRef.current && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // Already started
        }
      }
    } finally {
      setIsProcessing(false);
    }
  }, [messages, speakText, toast]);

  const startContinuousListening = useCallback(() => {
    const recognition = initSpeechRecognition();
    if (!recognition) return;

    isActiveRef.current = true;
    recognitionRef.current = recognition;
    
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      // Get the latest result
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript;
      
      if (transcript.trim()) {
        setMessages(prev => [...prev, { role: 'user', content: transcript }]);
        processWithAI(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        // Restart recognition for these non-fatal errors
        if (isActiveRef.current) {
          setTimeout(() => {
            try {
              recognition.start();
            } catch {
              // Already started or other issue
            }
          }, 100);
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      
      // Auto-restart if still active and not speaking
      if (isActiveRef.current && !isSpeaking && !isProcessing) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch {
            // Already started
          }
        }, 100);
      }
    };

    recognition.start();
  }, [initSpeechRecognition, processWithAI, isSpeaking, isProcessing]);

  const stopAllActivity = useCallback(() => {
    isActiveRef.current = false;
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsGreeting(true);
    setEmotion('happy');
    
    // Start greeting
    setTimeout(() => {
      setIsGreeting(false);
      // Start continuous listening after greeting
      startContinuousListening();
      
      // Speak greeting
      const greeting = "Hello! I'm your AI assistant. How can I help you today?";
      setMessages([{ role: 'assistant', content: greeting, language: 'English' }]);
      speakText(greeting, 'English');
    }, 2000);
  }, [startContinuousListening, speakText]);

  const handleClose = useCallback(() => {
    stopAllActivity();
    setIsOpen(false);
    setMessages([]);
    setEmotion('neutral');
  }, [stopAllActivity]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllActivity();
    };
  }, [stopAllActivity]);

  const getAvatarState = () => {
    if (isListening && !isSpeaking && !isProcessing) return 'listening';
    if (isSpeaking) return 'speaking';
    if (isProcessing) return 'processing';
    return 'idle';
  };

  return (
    <>
      {/* Floating Mini Avatar */}
      {!isOpen && (
        <FloatingMiniAvatar 
          isActive={false} 
          onClick={handleOpen}
        />
      )}

      {/* Full Voice Agent Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-background/95 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
            {/* 3D Avatar Section - Much larger now */}
            <div className="h-80 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent relative">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 animate-pulse" />
                </div>
              }>
                <AIAvatar3D 
                  state={getAvatarState()}
                  emotion={emotion}
                  isGreeting={isGreeting}
                />
              </Suspense>
              
              {/* Close button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleClose}
                className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm hover:bg-background/80 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
              
              {/* Mute button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMute}
                className={`absolute top-4 left-4 backdrop-blur-sm rounded-full ${
                  isMuted ? 'bg-red-500/50 hover:bg-red-500/70' : 'bg-background/50 hover:bg-background/80'
                }`}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-center p-4 border-t border-border/50 bg-gradient-to-r from-primary/5 to-cyan-500/5">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isListening ? 'bg-red-500 animate-pulse' : 
                    isSpeaking ? 'bg-green-500 animate-pulse' : 
                    isProcessing ? 'bg-orange-500 animate-pulse' : 
                    'bg-primary'
                  }`} />
                  <span className="font-medium text-foreground">
                    {isListening ? 'Listening...' : 
                     isSpeaking ? 'Speaking...' : 
                     isProcessing ? 'Thinking...' : 
                     'Ready'}
                  </span>
                </div>
                
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  <span>{detectedLanguage}</span>
                </div>
              </div>
            </div>

            {/* Audio Visualization */}
            <div className="p-6 bg-muted/20">
              <div className="flex justify-center items-center h-16">
                {(isListening || isSpeaking) ? (
                  <VoiceWaveform 
                    isActive={true} 
                    color={isListening ? 'hsl(var(--destructive))' : 'hsl(142, 71%, 45%)'} 
                    barCount={15}
                  />
                ) : isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Speak naturally — I'm always listening
                  </p>
                )}
              </div>
              
              {/* Latest message preview */}
              {messages.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-background/50 border border-border/30">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {messages[messages.length - 1].content}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 text-center border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                Tap <X className="inline w-3 h-3" /> to end conversation
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
