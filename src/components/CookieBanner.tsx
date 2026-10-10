import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'ob_cookie_consent';

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
    // Fire analytics init here if you add GA4
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-marine/97 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <Cookie size={20} className="text-teal" />
          </div>
          <div className="flex-grow min-w-0">
            <p className="font-body text-white/85 text-sm leading-relaxed">
              {lang === 'es'
                ? <>Usamos cookies para mejorar tu experiencia y analíticas anónimas. Lee nuestra <a href="/privacy-policy" className="text-teal underline">política de privacidad</a>.</>
                : <>We use cookies to improve your experience and for anonymous analytics. Read our <a href="/privacy-policy" className="text-teal underline">privacy policy</a>.</>
              }
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={decline}
              className="font-heading text-xs tracking-wider text-white/50 hover:text-white transition-colors px-3 py-2"
            >
              {lang === 'es' ? 'RECHAZAR' : 'DECLINE'}
            </button>
            <button
              onClick={accept}
              className="font-heading text-xs tracking-wider bg-teal text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-marine transition-colors"
            >
              {lang === 'es' ? 'ACEPTAR' : 'ACCEPT'}
            </button>
            <button onClick={decline} className="text-white/30 hover:text-white transition-colors ml-1">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
