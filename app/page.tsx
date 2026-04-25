"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { translations, Language } from './translations';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

export default function App() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [icNumber, setIcNumber] = useState('');
  const [language, setLanguage] = useState<Language>('malay');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const t = translations[language];

  const getBPCode = (ic: string) => {
    if (ic.length >= 2) {
      return ic.substring(0, 2);
    }
    return '';
  };

  const getDefaultLanguage = (ic: string) => {
    const bpCode = getBPCode(ic);
    if (bpCode === '12') return 'dusun';
    if (bpCode === '13') return 'iban';
    return 'malay';
  };

  const handleICChange = (value: string) => {
    setIcNumber(value);
    if (value.length >= 2) {
      setLanguage(getDefaultLanguage(value) as Language);
    }
  };

  const handleNext = () => {
    if (step === 1 && icNumber) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Onboarding complete:', { icNumber, language, ...formData });
    router.push('/homepage');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="bg-primary p-4 text-center">
        <h1 className="text-primary-foreground font-bold">{t.appName}</h1>
      </div>

      <div className="flex-1 flex items-start justify-center p-4 md:items-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-4">
              <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-border'}`}></div>
              <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-center mb-2 font-semibold">{t.welcome}</h2>
                <p className="text-center text-muted-foreground">{t.welcomeSubtext}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">{t.icNumber}</label>
                  <Input
                    type="text"
                    value={icNumber}
                    onChange={(e) => handleICChange(e.target.value)}
                    placeholder={t.icPlaceholder}
                    className="h-12 bg-input-bg border-border rounded-lg focus-visible:ring-primary"
                    maxLength={12}
                  />
                </div>

                {icNumber.length >= 2 && (
                  <div>
                    <label className="block mb-2 text-sm font-medium">{t.preferredLanguage}</label>
                    <Select
                      value={language}
                      onValueChange={(value) => setLanguage(value as Language)}
                    >
                      <SelectTrigger className="h-12 bg-input-bg border-border rounded-lg focus:ring-primary">
                        <SelectValue placeholder={t.preferredLanguage} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="malay">{t.languageMalay}</SelectItem>
                        <SelectItem value="english">{t.languageEnglish}</SelectItem>
                        <SelectItem value="iban">{t.languageIban}</SelectItem>
                        <SelectItem value="dusun">{t.languageDusun}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <Button
                onClick={handleNext}
                disabled={!icNumber}
                className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {t.continue}
              </Button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-center mb-2 font-semibold">{t.personalDetails}</h2>
                <p className="text-center text-muted-foreground">{t.personalDetailsSubtext}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">{t.fullName}</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.fullNamePlaceholder}
                    className="h-12 bg-input-bg border-border rounded-lg focus-visible:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">{t.phoneNumber}</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.phonePlaceholder}
                    className="h-12 bg-input-bg border-border rounded-lg focus-visible:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">{t.emailAddress}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.emailPlaceholder}
                    className="h-12 bg-input-bg border-border rounded-lg focus-visible:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-12 rounded-lg font-semibold"
                >
                  {t.back}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  {t.complete}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
