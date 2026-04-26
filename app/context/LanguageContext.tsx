"use client"
import React, { createContext, useContext, useState, ReactNode, useRef, useCallback, useMemo, useEffect } from 'react';
import { translations, Language } from '../translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['english'];
  speakText: (text: string, lang?: Language) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_GREETINGS: Record<Language, string> = {
  english: 'getting started',
  malay: 'selamat datang',
  iban: 'getting started',
  dusun: 'getting started',
  kadazan: 'getting started',
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('english');
  
  // Ref to track the currently playing audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  // Helper to stop and cleanup current audio
  const stopAndCleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAndCleanup();
  }, [stopAndCleanup]);

  const speakText = useCallback(async (text: string, lang?: Language) => {
    try {
      stopAndCleanup(); // Stop whatever is currently playing

      const currentLang = lang || language;
      const audioLanguage = currentLang === 'dusun' ? 'kadazan' : currentLang;
      
      const isRecorded = audioLanguage === 'iban' || audioLanguage === 'kadazan';
      const endpoint = isRecorded ? '/api/audio' : '/api/polly';
      const payload = isRecorded 
        ? { language: audioLanguage, phrase: text } 
        : { text, language: currentLang };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Speech synthesis failed');

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(url);
      audioRef.current = audio;
      audioUrlRef.current = url;

      audio.onended = () => {
        if (audioUrlRef.current === url) {
          URL.revokeObjectURL(url);
          audioUrlRef.current = null;
        }
      };

      await audio.play();
    } catch (error) {
      console.error('Speech error:', error);
    }
  }, [language, stopAndCleanup]);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    const greeting = LANGUAGE_GREETINGS[lang];
    if (greeting) {
      speakText(greeting, lang);
    }
  }, [speakText]);

  // Memoize the context value to prevent unnecessary consumer re-renders
  const value = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
    speakText,
  }), [language, handleSetLanguage, speakText]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}