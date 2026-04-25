"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { translations, Language } from './translations';

const LANGUAGES: { value: Language; native: string }[] = [
  { value: 'malay',   native: 'Bahasa Melayu' },
  { value: 'english', native: 'English' },
  { value: 'iban',    native: 'Iban' },
  { value: 'dusun',   native: 'Dusun' },
];

export default function App() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<Language>('malay');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/homepage');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Blue header */}
      <div className="bg-[#0066CC] px-6 pt-14 pb-10 flex flex-col items-center">
        <h1 className="text-white text-3xl font-bold tracking-tight">Touch &apos;n Go</h1>
        <p className="text-white/70 text-sm mt-1">eWallet</p>
      </div>

      {/* Step indicators */}
      <div className="flex justify-center gap-2 pt-6 pb-2">
        <div className={`h-2 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-[#0066CC]' : 'bg-gray-200'}`} />
        <div className={`h-2 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-[#0066CC]' : 'bg-gray-200'}`} />
      </div>

      <div className="flex-1 flex flex-col px-6 pt-6 pb-10">

        {/* ── STEP 1: Language ── */}
        {step === 1 && (
          <div className="flex flex-col flex-1">
            <h2 className="text-gray-900 text-xl font-bold mb-1">{t.welcome}</h2>
            <p className="text-gray-500 text-sm mb-8">{t.preferredLanguage}</p>

            <div className="space-y-3 flex-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl border-2 transition-colors ${
                    language === lang.value
                      ? 'border-[#0066CC] bg-[#E8F0FB]'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    language === lang.value ? 'border-[#0066CC]' : 'border-gray-300'
                  }`}>
                    {language === lang.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0066CC]" />
                    )}
                  </div>
                  <span className={`text-base font-semibold ${
                    language === lang.value ? 'text-[#0066CC]' : 'text-gray-700'
                  }`}>
                    {lang.native}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-10 w-full py-4 bg-[#0066CC] text-white font-bold text-base rounded-2xl active:opacity-80 transition-opacity"
            >
              {t.continue}
            </button>
          </div>
        )}

        {/* ── STEP 2: Personal Details ── */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            <div className="mb-8">
              <h2 className="text-gray-900 text-xl font-bold mb-1">{t.personalDetails}</h2>
              <p className="text-gray-500 text-sm">{t.personalDetailsSubtext}</p>
            </div>

            <div className="space-y-5 flex-1">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.fullNamePlaceholder}
                  required
                  className="w-full h-13 px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.phoneNumber}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.phonePlaceholder}
                  required
                  className="w-full h-13 px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.emailAddress}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.emailPlaceholder}
                  required
                  className="w-full h-13 px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 transition"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-10">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-2xl border-2 border-[#0066CC] text-[#0066CC] font-bold text-base active:opacity-80 transition-opacity flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.back}
              </button>
              <button
                type="submit"
                className="flex-1 py-4 rounded-2xl bg-[#0066CC] text-white font-bold text-base active:opacity-80 transition-opacity"
              >
                {t.complete}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
