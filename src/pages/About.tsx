import { useLanguage } from '../context/LanguageContext';
import bocasHeroImg from '../assets/images/about-bocas-aerial-hero.png';

const bocasHeritageImg =
  'https://images.unsplash.com/photo-1593881135370-702114a3448d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1200';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[55vh] min-h-[420px]">
        <img
          src={bocasHeroImg}
          alt="Aerial view of a palm-lined Bocas del Toro beach and turquoise Caribbean water"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.75) saturate(1.15)' }}
        />
        <div className="absolute inset-0 bg-marine/35" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-white mb-3 drop-shadow-lg">{t.about.h1}</h1>
            <p className="font-script text-teal text-3xl md:text-4xl drop-shadow-md">{t.about.script}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">

          <h2 className="font-heading text-3xl text-marine mb-6">{t.about.welcome_h2}</h2>
          <p className="font-body text-marine/80 text-base leading-relaxed mb-12 md:mb-16">{t.about.welcome_body}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-12 md:mb-16">
            <img
              src={bocasHeritageImg}
              alt="Local boat passing waterfront homes in Bocas del Toro"
              className="rounded-3xl shadow-lg w-full h-72 md:h-80 object-cover order-2 md:order-1"
              style={{ filter: 'brightness(1.05) saturate(1.1)' }}
            />
            <div className="flex flex-col justify-center order-1 md:order-2">
              <h3 className="font-heading text-2xl text-ocean mb-4">{t.about.heritage_h3}</h3>
              <p className="font-body text-marine/80 leading-relaxed mb-4 text-sm md:text-base">{t.about.heritage_p1}</p>
              <p className="font-body text-marine/80 leading-relaxed text-sm md:text-base">{t.about.heritage_p2}</p>
            </div>
          </div>

          <h2 className="font-heading text-3xl text-marine mb-6">{t.about.islands_h2}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12 md:mb-16">
            <div className="bg-[#F0F4F8] p-6 rounded-3xl border border-marine/5">
              <h3 className="font-heading text-xl text-ocean mb-2">{t.about.colon_h3}</h3>
              <p className="font-body text-marine/80 text-sm leading-relaxed">{t.about.colon_body}</p>
            </div>
            <div className="bg-[#F0F4F8] p-6 rounded-3xl border border-marine/5">
              <h3 className="font-heading text-xl text-teal mb-2">{t.about.carenero_h3}</h3>
              <p className="font-body text-marine/80 text-sm leading-relaxed">{t.about.carenero_body}</p>
            </div>
            <div className="bg-[#F0F4F8] p-6 rounded-3xl border border-marine/5">
              <h3 className="font-heading text-xl text-coral mb-2">{t.about.bastimentos_h3}</h3>
              <p className="font-body text-marine/80 text-sm leading-relaxed">{t.about.bastimentos_body}</p>
            </div>
          </div>

          <h2 className="font-heading text-3xl text-marine mb-6">{t.about.seasons_h2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 md:mb-16">
            <div className="bg-[#F0F4F8] p-7 rounded-3xl border border-marine/5">
              <h3 className="font-heading text-xl text-teal mb-2">{t.about.dry_h3}</h3>
              <p className="font-body text-marine/80 text-sm">
                <strong>{t.about.dry_dates}</strong><br />{t.about.dry_body}
              </p>
            </div>
            <div className="bg-[#F0F4F8] p-7 rounded-3xl border border-marine/5">
              <h3 className="font-heading text-xl text-coral mb-2">{t.about.surf_h3}</h3>
              <p className="font-body text-marine/80 text-sm">
                <strong>{t.about.surf_dates}</strong><br />{t.about.surf_body}
              </p>
            </div>
          </div>

          <h2 className="font-heading text-3xl text-marine mb-5">{t.about.who_h2}</h2>
          <p className="font-body text-marine/80 leading-relaxed mb-5 text-sm md:text-base">{t.about.who_p1}</p>
          <p className="font-body text-marine/80 leading-relaxed text-sm md:text-base">{t.about.who_p2}</p>
        </div>
      </div>
    </div>
  );
}
