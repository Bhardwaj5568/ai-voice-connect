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

// Confidence threshold for speech recognition
const CONFIDENCE_THRESHOLD = 0.6;

// Split text at natural sentence boundaries for smoother TTS
const splitIntoChunks = (text: string): string[] => {
  // Split by sentence-ending punctuation while keeping the punctuation
  const sentences = text.match(/[^.!?]*[.!?]+\s*/g) || [text];
  const chunks: string[] = [];
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed) {
      chunks.push(trimmed);
    }
  }
  
  // If no sentences found, return the whole text
  return chunks.length > 0 ? chunks : [text.trim()];
};

// Add natural pauses between sentences for prosody
const addProsodyPauses = (text: string): string => {
  // Add slight pause markers that TTS can interpret
  return text
    .replace(/([.!?])\s+/g, '$1  ') // Double space after sentence endings
    .replace(/,\s*/g, ', ') // Ensure comma pauses
    .replace(/;\s*/g, '; '); // Ensure semicolon pauses
};

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
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const isActiveRef = useRef(false);
  const speechQueueRef = useRef<string[]>([]);
  const isSpeakingRef = useRef(false);
  const currentLanguageRef = useRef<string>('en-US');
  const lastProcessedRef = useRef<string>('');

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

  // Get best available voice for language
  const getBestVoice = useCallback((langCode: string): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a voice that matches the language
    const langPrefix = langCode.split('-')[0];
    
    // Prefer online/natural voices
    let voice = voices.find(v => v.lang.startsWith(langPrefix) && v.name.toLowerCase().includes('natural'));
    if (!voice) voice = voices.find(v => v.lang.startsWith(langPrefix) && v.name.toLowerCase().includes('online'));
    if (!voice) voice = voices.find(v => v.lang.startsWith(langPrefix) && !v.localService);
    if (!voice) voice = voices.find(v => v.lang.startsWith(langPrefix));
    if (!voice) voice = voices.find(v => v.lang === 'en-US');
    
    return voice || null;
  }, []);

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
    
    recognition.continuous = true;
    recognition.interimResults = true; // Enable real-time feedback
    recognition.lang = currentLanguageRef.current;
    
    return recognition;
  }, [toast]);

  // Update recognition language dynamically
  const updateRecognitionLanguage = useCallback((language: string) => {
    const langCode = languageVoiceMap[language.toLowerCase()] || 'en-US';
    currentLanguageRef.current = langCode;
    
    if (recognitionRef.current) {
      recognitionRef.current.lang = langCode;
    }
  }, []);

  // Process speech queue - speak chunks one by one
  const processSpeechQueue = useCallback(() => {
    if (isSpeakingRef.current || speechQueueRef.current.length === 0 || isMuted) {
      if (speechQueueRef.current.length === 0) {
        setIsSpeaking(false);
        setEmotion('neutral');
        // Resume listening after all speech is done
        if (isActiveRef.current && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch {
            // Already started
          }
        }
      }
      return;
    }

    isSpeakingRef.current = true;
    setIsSpeaking(true);
    
    const rawText = speechQueueRef.current.shift()!;
    const text = addProsodyPauses(rawText); // Add natural pauses
    const langCode = languageVoiceMap[detectedLanguage.toLowerCase()] || 'en-US';
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    
    // Adjust rate based on language for natural feel
    const isAsianLanguage = ['zh-CN', 'ja-JP', 'ko-KR'].includes(langCode);
    utterance.rate = isAsianLanguage ? 0.95 : 1.05; // Slightly slower for tonal languages
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to get best voice
    const voice = getBestVoice(langCode);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setEmotion(detectEmotion(text));
    };
    
    utterance.onend = () => {
      isSpeakingRef.current = false;
      // Small delay between sentences for natural pacing
      setTimeout(() => processSpeechQueue(), 150);
    };
    
    utterance.onerror = () => {
      isSpeakingRef.current = false;
      processSpeechQueue(); // Continue with next chunk even on error
    };

    window.speechSynthesis.speak(utterance);
  }, [isMuted, detectedLanguage, getBestVoice]);

  const speakText = useCallback((text: string, language: string) => {
    if (!('speechSynthesis' in window) || isMuted) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    isSpeakingRef.current = false;
    
    // Split into chunks for smoother delivery
    const chunks = splitIntoChunks(text);
    speechQueueRef.current = chunks;
    
    setDetectedLanguage(language);
    processSpeechQueue();
  }, [isMuted, processSpeechQueue]);

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
          conversationHistory: messages.slice(-4) // Reduced for speed
        }
      });

      if (error) throw error;

      const aiResponse = data.response;
      const detectedLang = data.language || 'English';
      
      setDetectedLanguage(detectedLang);
      updateRecognitionLanguage(detectedLang); // Update recognition language dynamically
      
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
      let finalTranscript = '';
      let interimText = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        
        if (result.isFinal) {
          // Only accept transcripts above confidence threshold
          if (confidence >= CONFIDENCE_THRESHOLD || confidence === 0) { // confidence 0 means not provided
            finalTranscript += transcript;
          }
        } else {
          interimText += transcript;
        }
      }
      
      // Show interim results for real-time feedback
      setInterimTranscript(interimText);
      
      // Process final transcript if we have one and it's different from last
      if (finalTranscript.trim() && finalTranscript.trim() !== lastProcessedRef.current) {
        lastProcessedRef.current = finalTranscript.trim();
        setInterimTranscript(''); // Clear interim
        setMessages(prev => [...prev, { role: 'user', content: finalTranscript.trim() }]);
        processWithAI(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        if (isActiveRef.current && !isSpeakingRef.current) {
          setTimeout(() => {
            try {
              recognition.start();
            } catch {
              // Already started
            }
          }, 100);
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      
      if (isActiveRef.current && !isSpeakingRef.current && !isProcessing) {
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
  }, [initSpeechRecognition, processWithAI, isProcessing]);

  const stopAllActivity = useCallback(() => {
    isActiveRef.current = false;
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      speechQueueRef.current = [];
    }
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsGreeting(true);
    setEmotion('happy');
    
    // Load voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    
    // Start greeting
    setTimeout(() => {
      setIsGreeting(false);
      startContinuousListening();
      
      const greeting = "Hello! How can I help you today?";
      setMessages([{ role: 'assistant', content: greeting, language: 'English' }]);
      speakText(greeting, 'English');
    }, 1500); // Reduced greeting delay
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
      isSpeakingRef.current = false;
      speechQueueRef.current = [];
    }
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllActivity();
    };
  }, [stopAllActivity]);

  // Preload voices on mount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

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
            {/* 3D Avatar Section */}
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

            {/* Status Bar - Visual indicator only */}
            <div className="flex items-center justify-center p-4 border-t border-border/50 bg-gradient-to-r from-primary/5 to-cyan-500/5">
              <div className={`w-4 h-4 rounded-full ${
                isListening ? 'bg-red-500 animate-pulse' : 
                isSpeaking ? 'bg-green-500 animate-pulse' : 
                isProcessing ? 'bg-orange-500 animate-pulse' : 
                'bg-primary'
              }`} />
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
                ) : null}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
