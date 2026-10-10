import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import bocasImg from '../assets/images/bocas-beach-hero.jpeg';

export default function NotFound() {
  const { lang } = useLanguage();
  useEffect(() => { document.title = '404 — Page Not Found | Ocean Blue Bocas del Toro'; }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <img
        src={bocasImg}
        alt="Bocas del Toro beach"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.4) saturate(0.8)' }}
      />
      <div className="absolute inset-0 bg-marine/60" />
      <div className="relative text-center px-4">
        <p className="font-script text-teal text-3xl mb-2">
          {lang === 'es' ? 'Uy, esa ola no llegó a la orilla.' : 'That wave never reached shore.'}
        </p>
        <h1 className="font-heading text-8xl md:text-[10rem] text-white leading-none mb-4">404</h1>
        <p className="font-body text-white/70 text-lg mb-8 max-w-md mx-auto">
          {lang === 'es'
            ? 'La página que buscas no existe o fue movida. Pero el océano todavía te espera.'
            : "The page you're looking for doesn't exist or was moved. But the ocean is still waiting for you."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-coral text-white px-8 py-4 rounded-full font-heading text-sm tracking-widest hover:bg-white hover:text-marine transition-colors shadow-xl"
          >
            {lang === 'es' ? '← VOLVER AL INICIO' : '← BACK TO HOME'}
          </Link>
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-heading text-sm tracking-widest hover:bg-white/20 transition-colors"
          >
            {lang === 'es' ? 'VER TOURS' : 'SEE TOURS'}
          </Link>
        </div>
      </div>
    </div>
  );
}
