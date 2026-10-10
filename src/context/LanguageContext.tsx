import { createContext, useContext, useState, type ReactNode } from 'react';
import { en } from '../i18n/en';
import { es } from '../i18n/es';

export type Lang = 'en' | 'es';
export type Translations = typeof en;

const translations: Record<Lang, Translations> = { en, es };

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: en,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const t = translations[lang];
  const toggleLang = () => setLang(l => (l === 'en' ? 'es' : 'en'));
  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
