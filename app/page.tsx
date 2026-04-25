"use client"
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from './context/LanguageContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User } from 'lucide-react';
import { translations, Language } from './translations';

const LANGUAGES: { value: Language; native: string }[] = [
  { value: 'malay',   native: 'Bahasa Melayu' },
  { value: 'english', native: 'English' },
  { value: 'iban',    native: 'Iban' },
  { value: 'dusun',   native: 'Dusun' },
];

type FieldKey = 'name' | 'phone' | 'email' | 'done';

const FIELD_PROMPTS: Record<Language, Record<FieldKey, string>> = {
  english: {
    name:  "Hi! Please enter your full name.",
    phone: "Great! Now enter your phone number.",
    email: "Almost done! Enter your email address.",
    done:  "All done! Tap Complete to finish.",
  },
  malay: {
    name:  "Hai! Sila masukkan nama penuh anda.",
    phone: "Bagus! Masukkan nombor telefon anda.",
    email: "Hampir selesai! Masukkan alamat e-mel anda.",
    done:  "Selesai! Tekan Selesai untuk meneruskan.",
  },
  iban: {
    name:  "Hai! Sila makai nama penuh nuan.",
    phone: "Manah! Makai namba telipun nuan.",
    email: "Deka udah! Makai alamat e-mel nuan.",
    done:  "Udah! Tekan Udah ba.",
  },
  dusun: {
    name:  "Hai! Tuntuki ngaranan kosilou nu.",
    phone: "Ayo! Tuntuki numburu tilipun nu.",
    email: "Dii nopo! Tuntuki alamat e-mel nu.",
    done:  "Naatad! Kotomod Naatad.",
  },
};

function WaveBar({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block w-1 rounded-full bg-[#1873CC] origin-bottom"
      style={{
        height: '14px',
        animation: 'waveBounce 0.7s ease-in-out infinite alternate',
        animationDelay: delay,
      }}
    />
  );
}

// Flat field row matching the reference UI
function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F5F7FA] px-4 pt-3 pb-2 border-b border-gray-200">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      {children}
    </div>
  );
}

export default function App() {
  const { language, setLanguage, t } = useLanguage(); // Use global context
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeField, setActiveField] = useState<FieldKey>('name');
  const [promptText, setPromptText] = useState('');
  const [glowActive, setGlowActive] = useState(false);

  const nameRef  = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const speakTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (speakTimer.current) clearTimeout(speakTimer.current);
  };

  const triggerPrompt = useCallback((field: FieldKey, lang: Language) => {
    clearTimers();
    setActiveField(field);
    setPromptText(FIELD_PROMPTS[lang][field]);
    setIsSpeaking(true);
    setGlowActive(true);

    if (field === 'done') {
      speakTimer.current = setTimeout(() => setIsSpeaking(false), 2500);
      return;
    }

    speakTimer.current = setTimeout(() => {
      setIsSpeaking(false);
      if (field === 'name')  nameRef.current?.focus();
      if (field === 'phone') phoneRef.current?.focus();
      if (field === 'email') emailRef.current?.focus();
    }, 2000);
  }, []);

  useEffect(() => {
    if (step === 2) {
      setFormData({ name: '', phone: '', email: '' });
      triggerPrompt('name', language);
    } else {
      clearTimers();
      setIsSpeaking(false);
      setGlowActive(false);
      setPromptText('');
    }
    return clearTimers;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleFieldBlur = (field: FieldKey, value: string) => {
    if (!value.trim()) return;
    const next: Record<string, FieldKey> = { name: 'phone', phone: 'email', email: 'done' };
    const nextField = next[field];
    if (nextField) triggerPrompt(nextField, language);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    clearTimers();
    router.push('/homepage');
  };

  const handleBack = () => {
    clearTimers();
    setIsSpeaking(false);
    setGlowActive(false);
    setPromptText('');
    setStep(1);
  };


  // Active field glow class
  const fieldGlow = (field: FieldKey) =>
    activeField === field && !isSpeaking
      ? 'border-b-[#1873CC] shadow-[0_2px_8px_rgba(24,115,204,0.18)]'
      : 'border-b-gray-200';

  return (
    <>
      <style>{`
        @keyframes waveBounce {
          from { transform: scaleY(0.25); }
          to   { transform: scaleY(1); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>

      <div className="min-h-screen bg-[#F5F7FA] flex flex-col">

        {/* Glow border overlay */}
        {glowActive && (
          <div className="pointer-events-none fixed inset-0 z-40 border-[5px] border-[#1873CC] shadow-[inset_0_0_20px_rgba(24,115,204,0.4)] animate-pulse" />
        )}

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <>
            {/* Gradient header */}
            <div className="bg-gradient-to-r from-[#1873CC] to-[#5BB8F5] px-5 pt-10 pb-7 flex items-center gap-3">
              <h1 className="text-white text-base font-semibold flex-1 text-center">
                Touch &apos;n Go eWallet
              </h1>
            </div>

            {/* Step dots */}
            <div className="flex justify-center gap-2 py-5">
              <div className="h-2 w-16 rounded-full bg-[#1873CC]" />
              <div className="h-2 w-16 rounded-full bg-gray-200" />
            </div>

            <div className="flex-1 px-5 pb-10">
              <p className="text-gray-500 text-sm mb-5">{t.preferredLanguage}</p>

              <div className="space-y-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setLanguage(lang.value)}
                    className={`w-full flex items-center gap-4 px-4 py-4 bg-white border-b transition-colors ${
                      language === lang.value
                        ? 'border-b-gray-100'
                        : 'border-b-gray-100'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      language === lang.value ? 'border-[#1873CC]' : 'border-gray-300'
                    }`}>
                      {language === lang.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1873CC]" />
                      )}
                    </div>
                    <span className={`text-base ${
                      language === lang.value ? 'font-bold text-[#1873CC]' : 'text-gray-700'
                    }`}>
                      {lang.native}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="mt-10 w-full py-3.5 bg-[#1873CC] text-white font-semibold text-base rounded-lg active:opacity-80 transition-opacity"
              >
                {t.continue}
              </button>
            </div>
          </>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <>
            {/* Gradient header */}
            <div className="bg-gradient-to-r from-[#1873CC] to-[#5BB8F5] px-5 pt-10 pb-7 flex items-center gap-3">
              <h1 className="text-white text-base font-semibold flex-1 text-center">
                Touch &apos;n Go eWallet
              </h1>
            </div>

            {/* Step dots */}
            <div className="flex justify-center gap-2 py-5">
              <div className="h-2 w-16 rounded-full bg-[#1873CC]" />
              <div className="h-2 w-16 rounded-full bg-[#1873CC]" />
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#D6EAFF] flex items-center justify-center">
                <User className="w-10 h-10 text-[#1873CC]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="space-y-0">

                {/* Name */}
                <div className={`bg-[#F5F7FA] px-5 pt-3 pb-2 border-b-2 transition-all duration-300 ${fieldGlow('name')}`}>
                  <p className="text-xs text-gray-400 mb-1">{t.fullName}</p>
                  <input
                    ref={nameRef}
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={(e) => handleFieldBlur('name', e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full bg-transparent text-gray-800 text-base outline-none placeholder-gray-300 pb-1"
                  />
                </div>

                {/* Phone */}
                <div className={`bg-[#F5F7FA] px-5 pt-3 pb-2 border-b-2 transition-all duration-300 ${fieldGlow('phone')}`}>
                  <p className="text-xs text-gray-400 mb-1">{t.phoneNumber}</p>
                  <div className="flex items-center gap-3">
                    <div className="border-r border-gray-300 pr-3">
                      <span className="text-gray-500 text-base">+60</span>
                    </div>
                    <input
                      ref={phoneRef}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="flex-1 bg-transparent text-gray-800 text-base outline-none placeholder-gray-300 pb-1"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className={`bg-[#F5F7FA] px-5 pt-3 pb-2 border-b-2 transition-all duration-300 ${fieldGlow('email')}`}>
                  <p className="text-xs text-gray-400 mb-1">{t.emailAddress}</p>
                  <input
                    ref={emailRef}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={(e) => handleFieldBlur('email', e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full bg-transparent text-gray-800 text-base outline-none placeholder-gray-300 pb-1"
                  />
                </div>

              </div>

              {/* ── Inline AI assistant ── */}
              <div className="mx-5 mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerPrompt(activeField, language)}
                  aria-label="TnG Suara"
                  className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-white border-2 border-[#1873CC] transition-all duration-300"
                  style={isSpeaking ? {
                    boxShadow: '0 0 0 5px rgba(24,115,204,0.18), 0 4px 16px rgba(24,115,204,0.3)',
                    animation: 'glowPulse 1.2s ease-in-out infinite',
                    transform: 'scale(1.08)',
                  } : {
                    boxShadow: '0 2px 8px rgba(24,115,204,0.12)',
                  }}
                >
                  {isSpeaking ? (
                    <span className="flex items-center gap-0.5 h-6">
                      <WaveBar delay="0s" />
                      <WaveBar delay="0.1s" />
                      <WaveBar delay="0.2s" />
                      <WaveBar delay="0.15s" />
                      <WaveBar delay="0.05s" />
                    </span>
                  ) : (
                    <span className="flex items-end gap-0.5 h-6">
                      {[8, 13, 7, 13, 8].map((h, i) => (
                        <span
                          key={i}
                          className="inline-block w-1 rounded-full bg-[#1873CC]/40"
                          style={{ height: `${h}px` }}
                        />
                      ))}
                    </span>
                  )}
                </button>

                <div className="flex-1 bg-white border border-[#1873CC]/20 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <p className="text-[11px] font-semibold text-[#1873CC] mb-0.5">TnG Suara</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {promptText || FIELD_PROMPTS[language]['name']}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mx-5 mt-8 mb-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3.5 rounded-lg border-2 border-[#1873CC] text-[#1873CC] font-semibold text-base active:opacity-80 transition-opacity flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.back}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-lg bg-[#1873CC] text-white font-semibold text-base active:opacity-80 transition-opacity"
                >
                  {t.complete}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
