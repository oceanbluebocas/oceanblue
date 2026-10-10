import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Smartphone, Mail, ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CookieBanner from './CookieBanner';
import logoImg from '../imports/Screenshot_2026-08-27_165535.png';

const CONTACT_FORMSPREE_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORMSPREE_ENDPOINT ??
  'https://formspree.io/f/mbgdyznw';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, t, toggleLang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('submitting');
    try {
      const res = await fetch(CONTACT_FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Contact Form — Ocean Blue Bocas',
          _replyto: contactForm.email,
          form_type: 'Get in touch',
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        }),
      });
      setContactStatus(res.ok ? 'success' : 'error');
    } catch {
      setContactStatus('error');
    }
  };

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.trips, path: '/tours' },
    { name: t.nav.about, path: '/about' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-marine/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,24,68,0.25)]' : 'bg-marine'}`}>
        <div className="container mx-auto px-4 h-18 sm:h-20 flex items-center justify-between gap-4">

          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20 bg-white flex items-center justify-center overflow-hidden group-hover:border-teal transition-colors shadow-lg">
              <img src={logoImg} alt="Ocean Blue Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-xs sm:text-sm tracking-[0.2em] text-white">OCEAN BLUE</span>
              <span className="font-script text-teal text-base sm:text-lg -mt-0.5">Bocas Del Toro</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-heading text-xs tracking-widest transition-colors relative py-1 whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-teal after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal after:rounded-full'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={toggleLang}
              className="font-heading text-xs tracking-widest text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-3 py-1.5 rounded-full"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>

            <Link
              to="/tours"
              className="bg-coral text-white px-4 py-2.5 rounded-full font-heading text-xs tracking-widest hover:bg-white hover:text-marine transition-colors shadow-lg whitespace-nowrap"
            >
              {t.nav.book}
            </Link>
          </nav>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="font-heading text-xs text-white/60 hover:text-white border border-white/20 px-2.5 py-1.5 rounded-full transition-colors"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              className="text-white hover:text-teal transition-colors p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-marine/98 backdrop-blur-md border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-heading text-sm tracking-wider px-3 py-3 rounded-xl transition-colors ${
                      location.pathname === link.path ? 'text-teal bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-3 space-y-2">
                  <a
                    href="https://wa.me/50760809595"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 font-body text-sm px-3 py-2"
                  >
                    <Smartphone size={14} className="text-teal" /> +507 6080-9595
                  </a>
                  <a
                    href="https://wa.me/50761900847"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 font-body text-sm px-3 py-2"
                  >
                    <Smartphone size={14} className="text-teal" /> +507 6190-0847
                  </a>
                  <Link
                    to="/tours"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-coral text-white px-6 py-3.5 rounded-xl font-heading text-sm tracking-widest text-center hover:bg-white hover:text-marine transition-colors"
                  >
                    {t.nav.book}
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-marine text-white pt-14 pb-8">
        <div className="container mx-auto px-4">

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="font-script text-teal text-2xl mb-1">
                  {lang === 'en' ? 'Get in touch' : 'Contáctanos'}
                </p>
                <h2 className="font-heading text-2xl md:text-3xl text-white mb-3">
                  {lang === 'en' ? 'Say Hello' : 'Dinos Hola'}
                </h2>
                <p className="font-body text-white/55 text-sm leading-relaxed max-w-sm">
                  {lang === 'en'
                    ? 'Questions, custom requests, or just want to know more? Drop us a line and we\'ll get back to you fast.'
                    : '¿Preguntas, solicitudes especiales o quieres saber más? Escríbenos y te respondemos rápido.'}
                </p>
                <div className="mt-5 space-y-2 font-body text-sm text-white/55">
                  <a href="https://wa.me/50760809595" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Smartphone size={14} className="text-teal" /> +507 6080-9595
                  </a>
                  <a href="https://wa.me/50761900847" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Smartphone size={14} className="text-teal" /> +507 6190-0847
                  </a>
                  <a href="mailto:oceanbluebocas@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors break-all">
                    <Mail size={14} className="text-teal" /> oceanbluebocas@gmail.com
                  </a>
                </div>
              </div>

              <div>
                {contactStatus === 'success' ? (
                  <div className="py-8 text-center">
                    <CheckCircle2 size={36} className="text-teal mx-auto mb-3" />
                    <p className="font-heading text-white text-lg mb-1">
                      {lang === 'en' ? 'Message Received!' : '¡Mensaje Recibido!'}
                    </p>
                    <p className="font-body text-white/50 text-sm">
                      {lang === 'en' ? "We'll be in touch soon." : 'Te escribimos pronto.'}
                    </p>
                    <button
                      onClick={() => { setContactForm({ name: '', email: '', message: '' }); setContactStatus('idle'); }}
                      className="mt-4 text-teal font-heading text-xs tracking-wider hover:text-white transition-colors"
                    >
                      {lang === 'en' ? 'SEND ANOTHER' : 'ENVIAR OTRO'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitContact} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder={lang === 'en' ? 'Your name' : 'Tu nombre'}
                      value={contactForm.name}
                      onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm font-body focus:ring-2 focus:ring-teal/40 focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder={lang === 'en' ? 'Email address' : 'Correo electrónico'}
                      value={contactForm.email}
                      onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm font-body focus:ring-2 focus:ring-teal/40 focus:outline-none"
                    />
                    <textarea
                      required
                      rows={3}
                      placeholder={lang === 'en' ? 'Your message...' : 'Tu mensaje...'}
                      value={contactForm.message}
                      onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full bg-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm font-body focus:ring-2 focus:ring-teal/40 focus:outline-none resize-none"
                    />
                    <button
                      type="submit"
                      disabled={contactStatus === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 bg-teal text-white py-3.5 rounded-xl font-heading text-sm tracking-widest hover:bg-white hover:text-marine transition-colors disabled:opacity-50"
                    >
                      <Send size={14} />
                      {contactStatus === 'submitting'
                        ? (lang === 'en' ? 'SENDING...' : 'ENVIANDO...')
                        : (lang === 'en' ? 'SEND MESSAGE' : 'ENVIAR MENSAJE')}
                    </button>
                    {contactStatus === 'error' && (
                      <p className="text-coral/80 text-xs font-body text-center">
                        {lang === 'en' ? 'Something went wrong. Try WhatsApp instead.' : 'Algo salió mal. Escríbenos por WhatsApp.'}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-10">

            <div className="sm:col-span-2 md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white flex items-center justify-center overflow-hidden">
                  <img src={logoImg} alt="Ocean Blue Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-heading text-xs tracking-[0.2em] text-white">OCEAN BLUE</div>
                  <div className="font-script text-teal text-base -mt-0.5">Bocas Del Toro</div>
                </div>
              </div>
              <p className="font-body text-white/55 text-sm leading-relaxed max-w-sm">{t.footer.tagline}</p>
              <Link to="/tours" className="inline-flex items-center gap-2 mt-5 text-teal font-heading text-xs tracking-widest hover:text-white transition-colors">
                {t.nav.trips} <ArrowRight size={13} />
              </Link>
            </div>

            <div className="md:col-span-4 md:col-start-7">
              <h3 className="font-heading text-xs tracking-widest text-white/40 mb-4">{t.footer.find_us}</h3>
              <ul className="space-y-3 font-body text-sm text-white/65">
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="text-teal shrink-0 mt-0.5" />
                  <span>Main Dock, Isla Colón<br />Bocas Town, Panama</span>
                </li>
                <li className="flex items-center gap-3">
                  <Smartphone size={15} className="text-teal shrink-0" />
                  <a href="https://wa.me/50760809595" className="hover:text-white transition-colors">+507 6080-9595</a>
                </li>
                <li className="flex items-center gap-3">
                  <Smartphone size={15} className="text-teal shrink-0" />
                  <a href="https://wa.me/50761900847" className="hover:text-white transition-colors">+507 6190-0847</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} className="text-teal shrink-0" />
                  <a href="mailto:oceanbluebocas@gmail.com" className="hover:text-white transition-colors break-all">oceanbluebocas@gmail.com</a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 md:col-start-11">
              <h3 className="font-heading text-xs tracking-widest text-white/40 mb-4">{t.footer.quick_links}</h3>
              <ul className="space-y-2.5 font-body text-sm text-white/65">
                <li><Link to="/" className="hover:text-white transition-colors">{t.nav.home}</Link></li>
                <li><Link to="/tours" className="hover:text-white transition-colors">{t.nav.trips}</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t.nav.about}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs font-body">
            <span>© {new Date().getFullYear()} {t.footer.rights}</span>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white/60 transition-colors">Terms & Conditions</Link>
              <span>{t.footer.good_vibes}</span>
            </div>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}
