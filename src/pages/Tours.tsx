import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, Ship } from 'lucide-react';

import { tours } from '../data/tours';
import { useLanguage } from '../context/LanguageContext';
import zapatillaImg from '../assets/images/zapatilla-turquoise.jpeg';

export default function Tours() {
  const { t, lang } = useLanguage();

  return (
    <div className="bg-[#F0F4F8] min-h-screen pb-24">
      {/* Header with photo background */}
      <div className="relative overflow-hidden">
        <img
          src={zapatillaImg}
          alt="Cayo Zapatilla turquoise beach"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) saturate(1.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-marine/70 via-marine/30 to-marine/20" />
        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
          <p className="font-script text-teal text-2xl md:text-3xl mb-2">{t.tours_page.script}</p>
          <h1 className="font-heading text-4xl md:text-6xl text-white mb-4">{t.tours_page.h1}</h1>
          <p className="font-body text-white/70 max-w-lg mx-auto text-sm md:text-base">{t.tours_page.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {tours.map(tour => {
            const priceOnRequest = (tour as any).priceOnRequest === true;
            return (
            <Link
              key={tour.id}
              to={`/tours/${tour.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_40px_rgba(0,24,68,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col border border-marine/5"
            >
              <div className="relative h-52 md:h-56 overflow-hidden bg-marine/10">
                <img
                  src={tour.image}
                  alt={lang === 'es' ? tour.name_es : tour.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-marine/60 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full font-heading text-xs text-marine tracking-wider shadow-sm">
                  {lang === 'es' ? tour.category_es : tour.category}
                </span>
              </div>

              <div className="p-5 md:p-6 flex-grow flex flex-col">
                <h3 className="font-heading text-lg md:text-xl text-marine mb-1 leading-tight">
                  {lang === 'es' ? tour.name_es : tour.name}
                </h3>
                <p className="font-script text-teal text-lg md:text-xl mb-4">
                  {lang === 'es' ? tour.subtitle_es : tour.subtitle}
                </p>

                <div className="space-y-2 mb-5 font-body text-sm text-marine/60 flex-grow">
                  <div className="flex items-center gap-2.5">
                    <Clock size={15} className="text-ocean shrink-0" />
                    <span>{tour.schedule}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Users size={15} className="text-ocean shrink-0 mt-0.5" />
                    <span>{t.tours_page.shared_group}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-marine/8 pt-5">
                  <div>
                    {!priceOnRequest && (
                      <div className="text-xs text-marine/40 font-heading tracking-widest mb-0.5">{t.tours_page.from.toUpperCase()}</div>
                    )}
                    {priceOnRequest ? (
                      <div className="font-heading text-sm text-ocean tracking-wide">
                        {t.tours_page.contact_for_price}
                      </div>
                    ) : (
                      <div className="font-heading text-2xl text-marine">
                        ${tour.prices.shared}
                        <span className="font-body text-sm text-marine/45 ml-1">{t.tours_page.per_adult}</span>
                      </div>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#F0F4F8] group-hover:bg-coral text-marine group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        {/* Private Charter CTA */}
        <div className="mt-12 md:mt-16 bg-marine rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-15"
            style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #00A896 0%, transparent 60%)' }}
          />
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8 p-8 md:p-14">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
              <Ship size={28} className="text-teal" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="font-heading text-2xl md:text-3xl text-white mb-2">{t.tours_page.private_h2}</h2>
              <p className="font-body text-white/60 max-w-lg text-sm leading-relaxed">{t.tours_page.private_body}</p>
            </div>
            <div className="shrink-0">
              <Link
                to="/charter"
                className="inline-flex items-center gap-2 bg-teal text-white px-7 py-3.5 rounded-full font-heading text-sm tracking-widest hover:bg-white hover:text-marine transition-colors whitespace-nowrap"
              >
                {t.tours_page.explore_tours.toUpperCase()} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
