// app/context/LanguageContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from '../translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['english']; // Type-safe translations
  speakText: (text: string, lang?: Language) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language-specific greeting phrases
const LANGUAGE_GREETINGS: Record<Language, string> = {
  english: 'getting started',
  malay: 'selamat dating',
  iban: 'getting started',
  kadazan: 'getting started',
  dusun: 'getting started',
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('english');

  const speakWithPolly = async (text: string, lang: Language) => {
    const response = await fetch('/api/polly', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language: lang }),
    });

    if (!response.ok) {
      throw new Error('Failed to synthesize speech');
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    console.log('Playing Polly audio...');
    await audio.play();
    
    audio.onended = () => URL.revokeObjectURL(audioUrl);
  };

  const speakWithRecordedAudio = async (phrase: string, lang: Language) => {
    const response = await fetch('/api/audio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: lang, phrase }),
    });

    if (!response.ok) {
      console.error('Recorded audio not found, falling back to Polly');
      return speakWithPolly(`${lang} ${phrase}`, lang);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    console.log('Playing recorded audio from S3...');
    await audio.play();
    
    audio.onended = () => URL.revokeObjectURL(audioUrl);
  };

  const speakText = async (text: string, lang?: Language) => {
    try {
      // Use passed language or current state
      const currentLang = lang || language;
      console.log('Speaking:', { text, language: currentLang });
      
      // Map Dusun to Kadazan audio
      const audioLanguage = currentLang === 'dusun' ? 'kadazan' : currentLang;
      
      // For Iban and Kadazan (including Dusun), use recorded audio from S3
      if (audioLanguage === 'iban' || audioLanguage === 'kadazan') {
        await speakWithRecordedAudio(text, audioLanguage);
      } else {
        // Use Polly for other languages
        await speakWithPolly(text, currentLang);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  const handleSetLanguage = (lang: Language) => {
    console.log('Language changed to:', lang);
    setLanguage(lang);
    
    // Speak greeting when language changes - pass lang explicitly
    const greeting = LANGUAGE_GREETINGS[lang];
    console.log('Speaking greeting:', greeting, 'for language:', lang);
    if (greeting) {
      speakText(greeting, lang);
    }
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
    speakText,
  };

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