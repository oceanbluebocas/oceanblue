import { Link } from 'react-router-dom';
import { ArrowRight, Waves, Fish, Map, Sun, Ship } from 'lucide-react';
import { tours } from '../data/tours';
import { useLanguage } from '../context/LanguageContext';

import heroImg from '../assets/images/bocas-beach-hero.jpeg';
import slothImg from '../assets/images/bocas-sloth.jpeg';
import dolphinUnderwaterImg from '../assets/images/dolphin-underwater.jpeg';
import zapatillaImg from '../assets/images/zapatilla-turquoise.jpeg';
import islaPajarosImg from '../assets/images/isla-pajaros-beach.jpeg';
import escudoCoveImg from '../assets/images/escudo-cove.jpeg';
import oceanBluePangaImg from '../assets/images/ocean-blue-panga.jpeg';
import aimarImg from '../assets/images/captains/aimar.jpeg';
import jonathanImg from '../assets/images/captains/jonathan.jpeg';
import kalyImg from '../assets/images/captains/kaly.jpeg';
import zabidImg from '../assets/images/captains/zabid.jpeg';
import dannyImg from '../assets/images/captains/danny.jpeg';
import romelImg from '../assets/images/captains/romel.jpeg';

export default function Home() {
  const { t, lang } = useLanguage();
  const featuredTours = tours.slice(0, 3);

  const pillars = [
    { icon: Waves, color: 'ocean', bg: 'bg-ocean/8', title: t.home.pillar1_title, body: t.home.pillar1_body },
    { icon: Sun, color: 'teal', bg: 'bg-teal/8', title: t.home.pillar2_title, body: t.home.pillar2_body },
    { icon: Map, color: 'coral', bg: 'bg-coral/8', title: t.home.pillar3_title, body: t.home.pillar3_body },
  ];

  const wildlife = [
    { label: 'Dolphin Bay', desc: t.home.wildlife_dolphin },
    { label: 'Sloth Island', desc: t.home.wildlife_sloth },
    { label: 'Isla Pájaros', desc: t.home.wildlife_birds },
    { label: 'Starfish Beach', desc: t.home.wildlife_starfish },
  ];

  const hotspots = [
    { to: '/tours/tour-1-cayo-zapatilla', img: zapatillaImg, name: 'Cayo Zapatilla', desc: t.home.spots.zapatilla_desc, tall: false },
    { to: '/tours/tour-2-isla-pajaros', img: islaPajarosImg, name: 'Isla Pájaros', desc: t.home.spots.pajaros_desc, tall: true },
    { to: '/tours/tour-4-dolphin-bay', img: dolphinUnderwaterImg, name: 'Dolphin Bay', desc: t.home.spots.dolphin_desc, tall: true },
    { to: '/tours/tour-5-escudo-veraguas', img: escudoCoveImg, name: 'Escudo de Veraguas', desc: t.home.spots.escudo_desc, tall: false },
  ];

  const crew = [
    { name: 'Aimar', img: aimarImg },
    { name: 'Jonathan', img: jonathanImg },
    { name: 'Kaly', img: kalyImg },
    { name: 'Zabid', img: zabidImg },
    { name: 'Danny', img: dannyImg },
    { name: 'Romel', img: romelImg },
  ];

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Bocas Del Toro white sand beach with turquoise Caribbean water"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001844] via-[#001844]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001844]/50 to-transparent" />

        <div className="relative w-full pb-16 md:pb-28">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
                <div className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
                <span className="font-heading text-xs text-white/90 tracking-widest">{t.home.hero_badge.toUpperCase()}</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-4">
                {t.home.hero_h1}<br />
                <span className="font-script text-teal" style={{ fontSize: '1.2em', lineHeight: '1', letterSpacing: 'normal', textTransform: 'none' }}>
                  {t.home.hero_script}
                </span>
              </h1>

              <p className="font-body text-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                {t.home.hero_body}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/tours"
                  className="inline-flex items-center justify-center gap-2 bg-coral text-white px-8 py-4 rounded-full font-heading text-sm tracking-widest hover:bg-white hover:text-marine transition-colors shadow-2xl"
                >
                  {t.home.hero_cta.toUpperCase()} <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/50760809595"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full font-heading text-sm tracking-widest hover:bg-white/20 transition-colors"
                >
                  {t.home.hero_wa.toUpperCase()}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-white/20" />
          <span className="font-heading text-xs tracking-widest" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 md:py-20 bg-[#F0F4F8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-teal text-2xl mb-1">{t.home.why_script}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-marine">{t.home.why_h2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map(({ icon: Icon, color, bg, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-marine/5 hover:shadow-[0_4px_24px_rgba(0,24,68,0.08)] transition-shadow">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5 text-${color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-heading text-lg text-marine mb-3">{title}</h3>
                <p className="font-body text-marine/65 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-6 md:mt-8 h-72 md:h-[28rem] overflow-hidden rounded-2xl shadow-sm">
            <img
              src={oceanBluePangaImg}
              alt="Ocean Blue panga boat carrying guests through clear Caribbean water"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-marine/90 via-marine/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <p className="font-script text-teal text-2xl mb-1">{t.home.boat_script}</p>
              <h3 className="font-heading text-2xl md:text-4xl text-white max-w-2xl">
                {t.home.boat_h3}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife */}
      <section className="bg-marine overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <p className="font-script text-teal text-2xl mb-2">{t.home.wildlife_script}</p>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-5">{t.home.wildlife_h2}</h2>
              <div className="w-14 h-0.5 bg-teal mb-7" />
              <p className="font-body text-white/70 text-base leading-relaxed mb-8">{t.home.wildlife_body}</p>
              <ul className="space-y-3 mb-8">
                {wildlife.map(({ label, desc }) => (
                  <li key={label} className="flex items-start gap-3 font-body text-white/80 text-sm">
                    <Fish className="text-teal shrink-0 mt-0.5" size={16} />
                    <span><strong className="text-white">{label}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
              <Link to="/tours" className="inline-flex items-center gap-2 text-coral hover:text-white font-heading text-xs tracking-widest transition-colors">
                {t.home.wildlife_cta.toUpperCase()} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={slothImg}
                alt="Three-toed sloth in Bocas del Toro mangroves"
                className="rounded-2xl w-full h-56 md:h-64 object-cover object-center md:transform md:translate-y-8"
                style={{ filter: 'brightness(1.05) contrast(1.05)' }}
              />
              <img
                src={dolphinUnderwaterImg}
                alt="Wild bottlenose dolphin swimming through clear Bocas del Toro water"
                className="rounded-2xl w-full h-56 md:h-64 object-cover object-center"
                style={{ filter: 'brightness(1.1) contrast(1.05) saturate(1.1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hotspots */}
      <section className="py-16 md:py-20 bg-[#F0F4F8]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <p className="font-script text-teal text-2xl mb-1">{t.home.hotspots_script}</p>
              <h2 className="font-heading text-3xl md:text-4xl text-marine">{t.home.hotspots_h2}</h2>
            </div>
            <Link to="/tours" className="hidden md:flex items-center gap-2 font-heading text-xs tracking-widest text-ocean hover:text-marine transition-colors">
              {t.home.view_all.toUpperCase()} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {hotspots.map(({ to, img, name, desc, tall }) => (
              <Link
                key={to}
                to={to}
                className={`group relative rounded-2xl overflow-hidden bg-marine/10 shadow-sm hover:shadow-xl transition-shadow ${tall ? 'h-60 md:h-96' : 'h-60 md:h-72'}`}
              >
                <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-marine/85 via-marine/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-sm md:text-base text-white leading-tight">{name}</h3>
                  <p className="font-body text-xs text-white/70 mt-1 hidden sm:block">{desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link to="/tours" className="inline-flex items-center gap-2 font-heading text-xs tracking-widest text-ocean hover:text-marine transition-colors">
              {t.home.view_all.toUpperCase()} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 md:py-20 bg-white border-t border-marine/5">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <div>
              <p className="font-script text-teal text-2xl mb-1">{t.home.featured_script}</p>
              <h2 className="font-heading text-3xl md:text-4xl text-marine">{t.home.featured_h2}</h2>
            </div>
            <Link to="/tours" className="hidden md:flex items-center gap-2 font-heading text-xs tracking-widest text-ocean hover:text-marine transition-colors">
              {t.home.view_all.toUpperCase()} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {featuredTours.map(tour => (
              <Link
                key={tour.id}
                to={`/tours/${tour.id}`}
                className="group bg-[#F0F4F8] rounded-2xl overflow-hidden hover:shadow-[0_8px_40px_rgba(0,24,68,0.10)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 md:h-52 overflow-hidden bg-marine/10">
                  <img src={tour.image} alt={tour.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-heading text-xs text-marine tracking-wider">
                    {lang === 'es' ? tour.category_es : tour.category}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-heading text-lg md:text-xl text-marine mb-1 line-clamp-1">
                    {lang === 'es' ? tour.name_es : tour.name}
                  </h3>
                  <p className="font-script text-teal text-lg md:text-xl mb-3">
                    {lang === 'es' ? tour.subtitle_es : tour.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-marine/40 font-heading tracking-widest mb-0.5">{t.home.featured_from.toUpperCase()}</div>
                      <div className="font-heading text-xl text-marine">${tour.prices.shared}<span className="text-sm font-body text-marine/40 ml-1">{t.home.featured_adult}</span></div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white group-hover:bg-coral text-marine group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link to="/tours" className="inline-flex items-center gap-2 font-heading text-xs tracking-widest text-ocean hover:text-marine transition-colors">
              {t.home.view_all.toUpperCase()} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the Crew */}
      <section className="py-16 md:py-20 bg-[#F0F4F8] border-t border-marine/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-teal text-2xl mb-1">{t.home.crew_script}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-marine">{t.home.crew_h2}</h2>
            <p className="font-body text-marine/55 max-w-xl mx-auto mt-4 text-sm leading-relaxed">{t.home.crew_body}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {crew.map(c => (
              <div key={c.name} className="overflow-hidden rounded-2xl bg-white text-center shadow-sm border border-marine/5 group">
                <div className="w-full overflow-hidden bg-marine/5">
                  <img
                    src={c.img}
                    alt={`${t.home.captain} ${c.name}`}
                    className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="px-3 py-4 md:py-5">
                  <div className="font-heading text-marine text-sm md:text-base">{c.name}</div>
                  <div className="font-script text-teal text-lg">{t.home.captain}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Charter CTA */}
      <section className="bg-marine py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-ocean via-marine to-[#001030] p-8 md:p-14">
            <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #00A896 0%, transparent 70%)' }}
            />
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Ship size={28} className="text-teal" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h2 className="font-heading text-2xl md:text-3xl text-white mb-3">{t.home.private_h2}</h2>
                <p className="font-body text-white/60 max-w-xl text-sm leading-relaxed">{t.home.private_body}</p>
              </div>
              <div className="shrink-0">
                <Link
                  to="/charter"
                  className="inline-flex items-center gap-2 bg-coral text-white px-7 py-4 rounded-full font-heading text-xs tracking-widest hover:bg-white hover:text-marine transition-colors whitespace-nowrap shadow-xl"
                >
                  {t.home.browse_trips.toUpperCase()} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
