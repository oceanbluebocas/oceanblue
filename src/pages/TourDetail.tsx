import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tours } from '../data/tours';
import { ArrowLeft, Clock, MapPin, CheckCircle2, User, Coffee, Wine, Package, Lock, AlertTriangle, GlassWater, Cookie, Leaf, Droplets, Ship, MessageCircle, ChevronDown, Users } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '../context/LanguageContext';

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_BOOKING_FORMSPREE_ENDPOINT ??
  'https://formspree.io/f/xvkzrwew';

const bookingSchema = z.object({
  date: z.string().min(1, { message: "Pick a date" }),
  adults: z.number().min(0),
  children5to9: z.number().min(0),
  childrenUnder5: z.number().min(0),
  fullName: z.string().min(3, { message: "Need your full name" }),
  whatsapp: z.string().min(8, { message: "WhatsApp number needed" }),
  email: z.string().email({ message: "Invalid email" }),
  pickup: z.string().min(3, { message: "Where should we pick you up?" }),
  medical: z.string().optional(),
  addonBeer: z.number().min(0),
  addonWine: z.number().min(0),
  addonChampagne: z.number().min(0),
  addonChocolates: z.number().min(0),
  addonNuts: z.number().min(0),
  addonCoconut: z.number().min(0),
  _honeypot: z.string().max(0, "bot").optional(),
}).refine(data => data.adults + data.children5to9 + data.childrenUnder5 > 0, {
  message: "Need at least one person",
  path: ["adults"],
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface PrivateInquiryData {
  name: string;
  whatsapp: string;
  email: string;
  date: string;
  groupSize: string;
  message: string;
}

const emptyPrivate: PrivateInquiryData = { name: '', whatsapp: '', email: '', date: '', groupSize: '', message: '' };

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const tour = tours.find(t => t.id === id);
  const { t, lang } = useLanguage();

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showPrivate, setShowPrivate] = useState(false);
  const [privateData, setPrivateData] = useState<PrivateInquiryData>(emptyPrivate);
  const [privateStatus, setPrivateStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const isFishing = tour?.id === 'tour-8-sport-fishing';
  const priceIsPerBoat = (tour as any)?.priceIsPerBoat === true;
  const priceOnRequest = (tour as any)?.priceOnRequest === true;
  const maxPassengers = (tour as any)?.maxPassengers ?? 99;
  const minPassengers: number | undefined = (tour as any)?.minPassengers;

  const { register, handleSubmit, control, formState: { errors }, watch } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adults: isFishing ? 1 : 2,
      children5to9: 0,
      childrenUnder5: 0,
      medical: '',
      addonBeer: 0,
      addonWine: 0,
      addonChampagne: 0,
      addonChocolates: 0,
      addonNuts: 0,
      addonCoconut: 0,
      _honeypot: '',
    }
  });

  const formValues = useWatch({ control });

  const calculations = useMemo(() => {
    if (!tour) return { basePrice: 0, addonTotal: 0, total: 0 };
    let basePrice = 0;
    if (priceIsPerBoat) {
      basePrice = tour.prices.shared;
    } else {
      const adultsCost = (formValues.adults || 0) * tour.prices.shared;
      const kidsCost = (formValues.children5to9 || 0) * (tour.prices.shared * 0.5);
      basePrice = adultsCost + kidsCost;
    }
    const addonTotal =
      ((formValues.addonBeer || 0) * 15) +
      ((formValues.addonWine || 0) * 25) +
      ((formValues.addonChampagne || 0) * 35) +
      ((formValues.addonChocolates || 0) * 10) +
      ((formValues.addonNuts || 0) * 5) +
      ((formValues.addonCoconut || 0) * 3);
    return { basePrice, addonTotal, total: basePrice + addonTotal };
  }, [formValues, tour, priceIsPerBoat]);

  if (!tour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F0F4F8]">
        <h2 className="font-heading text-3xl mb-4 text-marine">Trip Not Found</h2>
        <Link to="/tours" className="text-ocean underline font-body">{t.tour_detail.back}</Link>
      </div>
    );
  }

  const isBio = tour.id === 'tour-9-bioluminescence';
  const tourName = lang === 'es' ? tour.name_es : tour.name;
  const tourSubtitle = lang === 'es' ? tour.subtitle_es : tour.subtitle;
  const tourDescription = lang === 'es' ? tour.description_es : tour.description;
  const tourHighlights = lang === 'es' ? tour.highlights_es : tour.highlights;
  const tourNotes = lang === 'es' ? tour.notes_es : tour.notes;
  const tourCategory = lang === 'es' ? tour.category_es : tour.category;
  const includedItems = lang === 'es'
    ? ((tour as any).includedItems_es ?? t.tour_detail.included_items)
    : ((tour as any).includedItems ?? t.tour_detail.included_items);
  const bringItems = lang === 'es'
    ? ((tour as any).bringItems_es ?? t.tour_detail.bring_items)
    : ((tour as any).bringItems ?? t.tour_detail.bring_items);
  const departureName = lang === 'es'
    ? ((tour as any).departureName_es ?? t.tour_detail.departure_name)
    : ((tour as any).departureName ?? t.tour_detail.departure_name);
  const departureNote = lang === 'es'
    ? ((tour as any).departureNote_es ?? (isBio ? t.tour_detail.departure_bio_note : t.tour_detail.departure_note))
    : ((tour as any).departureNote ?? (isBio ? t.tour_detail.departure_bio_note : t.tour_detail.departure_note));

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const totalPax = (formValues.adults || 0) + (formValues.children5to9 || 0) + (formValues.childrenUnder5 || 0);
  const overMax = totalPax > maxPassengers;

  const onSubmit = async (data: BookingFormValues) => {
    if (data._honeypot) return; // honeypot triggered — bot
    if (overMax) return;
    setFormStatus('submitting');
    const paxTotal = (data.adults || 0) + (data.children5to9 || 0) + (data.childrenUnder5 || 0);

    const messageBody = `
NEW BOOKING REQUEST — ${tourName}
---------------------------------------
Date: ${data.date}
Total Passengers: ${paxTotal} (${data.adults} Adults, ${data.children5to9} Kids 5-9, ${data.childrenUnder5} Infants under 5)

Lead Name: ${data.fullName}
WhatsApp: ${data.whatsapp}
Email: ${data.email}
Pickup Point: ${data.pickup}
Medical / Allergies: ${data.medical || 'None'}

ADD-ONS:
6-Pack Beer: ${data.addonBeer}  Wine: ${data.addonWine}  Champagne: ${data.addonChampagne}
Chocolates: ${data.addonChocolates}  Nut Mix: ${data.addonNuts}  Coconuts: ${data.addonCoconut}

${priceOnRequest ? 'Tour Price: To be confirmed' : `Estimated Total: $${calculations.total}`}
${priceIsPerBoat ? '(Boat rate — covers entire group)' : ''}
    `.trim();

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Booking Request — ${tourName}`,
          _replyto: data.email,
          form_type: 'Tour booking request',
          language: lang,
          tour_id: tour.id,
          tour: tourName,
          trip_date: data.date,
          total_passengers: paxTotal,
          adults: data.adults,
          children_5_to_9: data.children5to9,
          children_under_5: data.childrenUnder5,
          name: data.fullName,
          email: data.email,
          whatsapp: data.whatsapp,
          pickup_point: data.pickup,
          medical_or_special_needs: data.medical || 'None',
          addon_beer_6_packs: data.addonBeer,
          addon_wine_bottles: data.addonWine,
          addon_champagne_bottles: data.addonChampagne,
          addon_chocolates: data.addonChocolates,
          addon_nut_mix: data.addonNuts,
          addon_coconuts: data.addonCoconut,
          estimated_total: priceOnRequest ? 'To be confirmed' : `$${calculations.total}`,
          message: messageBody,
        })
      });
      if (response.ok) {
        setFormStatus('success');
        const waMsg = encodeURIComponent(
          priceOnRequest
            ? `Hi! Just sent a booking request for ${tourName} on ${data.date}. Name: ${data.fullName}. Please confirm pricing and availability.`
            : `Hi! Just sent a booking request for ${tourName} on ${data.date}. Name: ${data.fullName}. Total: $${calculations.total}`
        );
        window.open(`https://wa.me/50760809595?text=${waMsg}`, '_blank');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const onPrivateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privateData.name.trim() || !privateData.whatsapp.trim() || !privateData.email.trim()) {
      setPrivateStatus('error');
      return;
    }
    setPrivateStatus('submitting');
    const messageBody = `
PRIVATE CHARTER INQUIRY — ${tourName}
---------------------------------------
Name: ${privateData.name}
WhatsApp: ${privateData.whatsapp}
Email: ${privateData.email}
Requested Date: ${privateData.date || 'TBD'}
Group Size: ${privateData.groupSize || 'TBD'}
Message: ${privateData.message || 'None'}
    `.trim();

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Private Charter Inquiry — ${tourName}`,
          _replyto: privateData.email,
          form_type: 'Tour private charter inquiry',
          language: lang,
          tour_id: tour.id,
          tour: tourName,
          name: privateData.name,
          email: privateData.email,
          whatsapp: privateData.whatsapp,
          requested_date: privateData.date || 'TBD',
          group_size: privateData.groupSize || 'TBD',
          message: messageBody,
        })
      });
      setPrivateStatus(response.ok ? 'success' : 'error');
    } catch {
      setPrivateStatus('error');
    }
  };

  const minNote = minPassengers != null
    ? (lang === 'es'
        ? `Mínimo ${minPassengers} pasajeros para operar.`
        : `Minimum ${minPassengers} passengers required to operate.`)
    : null;

  return (
    <div className="bg-[#F0F4F8] min-h-screen pb-24">
      {/* Hero */}
      <div className="relative h-[50vh] sm:h-[55vh] min-h-[360px]">
        <img
          src={tour.image}
          alt={`${tourName} — Bocas del Toro, Panama panga boat tour`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001844] via-[#001844]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001844]/40 to-transparent" />

        <div className="absolute top-6 left-4 right-4 z-10">
          <div className="container mx-auto">
            <Link to="/tours" className="inline-flex items-center gap-2 text-white/90 hover:text-white font-heading text-xs tracking-widest transition-colors bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20">
              <ArrowLeft size={14} /> {t.tour_detail.back.toUpperCase()}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 md:pb-10">
          <div className="container mx-auto">
            <span className="inline-block bg-teal/90 backdrop-blur-sm px-3 py-1 rounded-full font-heading text-xs text-white tracking-widest mb-3">
              {tourCategory}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl text-white mb-2 leading-tight">{tourName}</h1>
            <p className="font-script text-teal text-2xl md:text-3xl">{tourSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Left — Tour Details */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5 md:space-y-6">

          {/* Schedule + Min/Max Pax strip */}
          <div className="bg-white rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4 shadow-sm border border-marine/5">
            <div className="flex items-center gap-3">
              <Clock className="text-ocean shrink-0" size={20} />
              <div>
                <div className="text-xs text-marine/40 font-heading tracking-widest">{t.tour_detail.schedule_label.toUpperCase()}</div>
                <div className="font-body text-marine font-semibold">{tour.schedule}</div>
              </div>
            </div>
            {isFishing ? (
              <div className="flex items-center gap-3 ml-auto">
                <Users className="text-teal shrink-0" size={18} />
                <div>
                  <div className="text-xs text-marine/40 font-heading tracking-widest">{lang === 'es' ? 'CAPACIDAD' : 'CAPACITY'}</div>
                  <div className="font-body text-marine font-semibold text-sm">
                    {lang === 'es' ? 'Máx. 4 pax (excepciones hasta 6)' : 'Max 4 pax (exceptions up to 6)'}
                  </div>
                </div>
              </div>
            ) : minPassengers != null ? (
              <div className="flex items-center gap-3 ml-auto">
                <Users className="text-teal shrink-0" size={18} />
                <div>
                  <div className="text-xs text-marine/40 font-heading tracking-widest">{lang === 'es' ? 'MÍN. PASAJEROS' : 'MIN. PASSENGERS'}</div>
                  <div className="font-body text-marine font-semibold text-sm">{minPassengers} {lang === 'es' ? 'personas' : 'people'}</div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Departure Point */}
          <div className="bg-white rounded-2xl px-5 py-4 flex items-start gap-4 shadow-sm border border-marine/5">
            <MapPin className="text-teal shrink-0 mt-1" size={20} />
            <div>
              <div className="text-xs text-marine/40 font-heading tracking-widest mb-1">{t.tour_detail.departure.toUpperCase()}</div>
              <div className="font-heading text-marine text-base">{departureName}</div>
              <p className="font-body text-marine/60 text-sm mt-1 leading-relaxed">
                {departureNote}
              </p>
            </div>
          </div>

          {/* Min/Max passengers notice */}
          {minNote && (
            <div className="bg-ocean/8 border border-ocean/20 rounded-xl px-5 py-3 flex items-center gap-3">
              <Users size={16} className="text-ocean shrink-0" />
              <p className="font-body text-marine/75 text-sm">{minNote}</p>
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-marine/5">
            <h2 className="font-heading text-2xl text-marine mb-5">{t.tour_detail.game_plan}</h2>
            <p className="font-body text-marine/75 text-base md:text-lg leading-relaxed mb-8">{tourDescription}</p>

            <h3 className="font-heading text-xl text-marine mb-4">{t.tour_detail.stops}</h3>
            <ul className="space-y-3 mb-8">
              {tourHighlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-teal/10 p-1 rounded-full text-teal shrink-0">
                    <MapPin size={15} />
                  </div>
                  <span className="font-body text-marine/75 leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>

            {tourNotes && (
              <div className="bg-coral/8 border border-coral/20 p-5 rounded-xl flex items-start gap-3 mb-8">
                <AlertTriangle className="text-coral shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-heading text-marine text-sm mb-1">{t.tour_detail.heads_up}</h4>
                  <p className="font-body text-marine/75 text-sm">{tourNotes}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#F0F4F8] p-6 rounded-xl">
                <h4 className="font-heading text-marine text-lg mb-4">{t.tour_detail.whats_included}</h4>
                <ul className="space-y-2 font-body text-marine/70 text-sm">
                  {(includedItems as readonly string[]).map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-teal font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F0F4F8] p-6 rounded-xl">
                <h4 className="font-heading text-marine text-lg mb-4">{t.tour_detail.what_to_bring}</h4>
                <ul className="space-y-2 font-body text-marine/70 text-sm">
                  {(bringItems as readonly string[]).map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-ocean font-bold">✓</span> {item}
                    </li>
                  ))}
                  {isBio && (
                    <li className="flex items-center gap-2">
                      <span className="text-ocean font-bold">✓</span> {t.tour_detail.jacket}
                    </li>
                  )}
                </ul>
                <div className="mt-4 bg-coral/10 px-3 py-2.5 rounded-lg border border-coral/20 text-xs font-body text-marine flex items-start gap-2">
                  <AlertTriangle size={14} className="text-coral shrink-0 mt-0.5" />
                  <span><strong className="text-coral">{t.tour_detail.bring_cash}</strong> {t.tour_detail.bring_cash_body}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {tour.gallery && tour.gallery.length > 0 && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-marine/5">
              <h3 className="font-heading text-2xl text-marine mb-5">{t.tour_detail.gallery}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tour.gallery.map((img, i) => (
                  <div key={i} className="h-36 sm:h-44 rounded-xl overflow-hidden group">
                    <img
                      src={img}
                      alt={`${tourName} gallery photo ${i + 1} — Bocas del Toro`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — Booking Forms */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">

          {/* Shared Booking Card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,24,68,0.10)] border border-marine/8 lg:sticky lg:top-28">
            {formStatus === 'success' ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-teal/15 text-teal rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-heading text-2xl text-marine mb-3">{t.tour_detail.success_title}</h3>
                <p className="font-body text-marine/65 text-sm mb-5">
                  {t.tour_detail.success_body.replace('{email}', formValues.email || '')}
                </p>
                <button onClick={() => setFormStatus('idle')} className="text-ocean font-heading text-sm hover:underline tracking-wider">
                  {t.tour_detail.make_another.toUpperCase()}
                </button>
              </div>
            ) : (
              <div className="p-5 md:p-6">
                <div className="mb-5">
                  <h3 className="font-heading text-2xl text-marine mb-1">{t.tour_detail.book_title}</h3>
                  <p className="font-body text-marine/50 text-sm">{t.tour_detail.book_sub}</p>
                  <div className="mt-3 flex items-start gap-2 bg-teal/8 p-3 rounded-lg border border-teal/15 text-xs font-body text-teal">
                    <Lock size={12} className="shrink-0 mt-0.5" />
                    <span>{t.tour_detail.book_secure}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
                  {/* Honeypot — hidden from humans, bots fill it in */}
                  <input type="text" {...register('_honeypot')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  {/* Date */}
                  <div>
                    <label className="block font-heading text-xs text-marine/60 tracking-widest mb-1.5">{t.tour_detail.trip_date.toUpperCase()}</label>
                    <input
                      type="date"
                      min={minDate}
                      {...register('date')}
                      className="w-full bg-[#F0F4F8] rounded-xl px-4 py-3 font-body text-marine text-sm focus:ring-2 focus:ring-ocean/40 focus:outline-none"
                    />
                    {errors.date && <span className="text-coral text-xs mt-1 block">{errors.date.message}</span>}
                  </div>

                  {/* Pricing info */}
                  <div className="bg-[#F0F4F8] rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-marine/45 font-heading tracking-widest mb-0.5">
                          {priceIsPerBoat
                            ? (lang === 'es' ? 'PRECIO POR BOTE' : 'BOAT RATE')
                            : t.tour_detail.shared_tour.toUpperCase()}
                        </div>
                        <div className="font-heading text-xl text-marine">
                          {priceOnRequest ? t.tours_page.contact_for_price : `$${tour.prices.shared}`}
                          {!priceOnRequest && !priceIsPerBoat && <span className="text-sm font-body text-marine/50">{t.tours_page.per_adult}</span>}
                        </div>
                      </div>
                      {!priceOnRequest && !priceIsPerBoat && (
                        <div className="text-right text-xs font-body text-marine/50">
                          <div className="text-ocean font-semibold">{t.tour_detail.kids_off}</div>
                          <div className="text-teal font-semibold">{t.tour_detail.infants_free}</div>
                        </div>
                      )}
                    </div>
                    {priceIsPerBoat && (
                      <p className="font-body text-xs text-marine/55 mt-2 leading-relaxed">
                        {lang === 'es'
                          ? `Cubre 1–${maxPassengers} pasajeros. El bote es todo tuyo.`
                          : `Covers 1–${maxPassengers} passengers. The whole boat is yours.`}
                      </p>
                    )}
                  </div>

                  {/* Passengers */}
                  <div className="bg-[#F0F4F8] rounded-xl p-4 space-y-3">
                    <h4 className="font-heading text-xs tracking-widest text-marine/60 flex items-center gap-2">
                      <User size={13} /> {t.tour_detail.passengers.toUpperCase()}
                      {maxPassengers < 99 && (
                        <span className="ml-auto font-body text-xs text-marine/40 normal-case">
                          {lang === 'es' ? `Máx. ${maxPassengers}` : `Max ${maxPassengers}`}
                        </span>
                      )}
                    </h4>
                    {priceIsPerBoat ? (
                      /* Fishing: single total passengers input */
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-body text-sm text-marine">
                            {lang === 'es' ? 'Total pasajeros' : 'Total passengers'}
                          </div>
                          <div className="text-xs text-marine/40">
                            {lang === 'es' ? `1–${maxPassengers} personas` : `1–${maxPassengers} people`}
                          </div>
                        </div>
                        <input
                          type="number"
                          min="1"
                          max={maxPassengers}
                          {...register('adults', { valueAsNumber: true })}
                          className="w-16 bg-white rounded-lg p-2 text-center font-body text-marine text-sm border border-marine/10 focus:ring-2 focus:ring-ocean/30 focus:outline-none"
                        />
                      </div>
                    ) : (
                      <>
                        {[
                          { label: t.tour_detail.adults, sub: t.tour_detail.full_price, field: 'adults' as const },
                          { label: t.tour_detail.kids, sub: t.tour_detail.half_price, field: 'children5to9' as const },
                          { label: t.tour_detail.infants, sub: t.tour_detail.free, field: 'childrenUnder5' as const },
                        ].map(({ label, sub, field }) => (
                          <div key={field} className="flex items-center justify-between">
                            <div>
                              <div className="font-body text-sm text-marine">{label}</div>
                              <div className="text-xs text-marine/40">{sub}</div>
                            </div>
                            <input
                              type="number"
                              min="0"
                              {...register(field, { valueAsNumber: true })}
                              className="w-16 bg-white rounded-lg p-2 text-center font-body text-marine text-sm border border-marine/10 focus:ring-2 focus:ring-ocean/30 focus:outline-none"
                            />
                          </div>
                        ))}
                        {overMax && (
                          <p className="text-coral text-xs">
                            {lang === 'es' ? `Máximo ${maxPassengers} pasajeros.` : `Maximum ${maxPassengers} passengers.`}
                          </p>
                        )}
                      </>
                    )}
                    {errors.adults && <span className="text-coral text-xs">{errors.adults.message}</span>}
                  </div>

                  {/* Contact */}
                  <div className="space-y-3">
                    <label className="block font-heading text-xs tracking-widest text-marine/60 mb-1">{t.tour_detail.your_details.toUpperCase()}</label>
                    {[
                      { field: 'fullName' as const, placeholder: t.tour_detail.full_name, type: 'text', error: errors.fullName },
                      { field: 'whatsapp' as const, placeholder: t.tour_detail.whatsapp, type: 'text', error: errors.whatsapp },
                      { field: 'email' as const, placeholder: t.tour_detail.email, type: 'email', error: errors.email },
                      { field: 'pickup' as const, placeholder: t.tour_detail.pickup, type: 'text', error: errors.pickup },
                    ].map(({ field, placeholder, type, error }) => (
                      <div key={field}>
                        <input
                          type={type}
                          {...register(field)}
                          placeholder={placeholder}
                          autoComplete={field === 'email' ? 'email' : 'off'}
                          className="w-full bg-[#F0F4F8] rounded-xl px-4 py-3 font-body text-marine text-sm placeholder:text-marine/35 focus:ring-2 focus:ring-ocean/40 focus:outline-none"
                        />
                        {error && <span className="text-coral text-xs mt-1 block">{error.message}</span>}
                      </div>
                    ))}
                    <textarea
                      {...register('medical')}
                      placeholder={t.tour_detail.medical}
                      rows={2}
                      className="w-full bg-[#F0F4F8] rounded-xl px-4 py-3 font-body text-marine text-sm placeholder:text-marine/35 focus:ring-2 focus:ring-ocean/40 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Add-ons */}
                  <div className="bg-[#F0F4F8] rounded-xl p-4">
                    <h4 className="font-heading text-xs tracking-widest text-marine/60 mb-3 flex items-center gap-2">
                      <Package size={13} /> {t.tour_detail.cooler.toUpperCase()}
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        { icon: Coffee, label: t.addons.beer, price: '$15', field: 'addonBeer' as const },
                        { icon: Wine, label: t.addons.wine, price: '$25', field: 'addonWine' as const },
                        { icon: GlassWater, label: t.addons.champagne, price: '$35', field: 'addonChampagne' as const },
                        { icon: Cookie, label: t.addons.chocolates, price: '$10', field: 'addonChocolates' as const },
                        { icon: Leaf, label: t.addons.nuts, price: '$5', field: 'addonNuts' as const },
                        { icon: Droplets, label: t.addons.coconut, price: '$3', field: 'addonCoconut' as const },
                      ].map(({ icon: Icon, label, price, field }) => (
                        <div key={field} className="flex items-center justify-between">
                          <span className="flex items-center gap-2 font-body text-sm text-marine/75">
                            <Icon size={13} className="text-ocean" /> {label} <span className="text-marine/40">{price}</span>
                          </span>
                          <input
                            type="number"
                            min="0"
                            {...register(field, { valueAsNumber: true })}
                            className="w-12 bg-white rounded-lg p-1.5 text-center font-body text-sm border border-marine/10 focus:ring-2 focus:ring-ocean/30 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  {priceOnRequest ? (
                    <div className="border-t border-marine/8 pt-4">
                      <div className="bg-ocean/8 border border-ocean/15 rounded-xl p-4">
                        <div className="font-heading text-sm text-marine">{t.tour_detail.price_to_confirm}</div>
                        <p className="font-body text-xs text-marine/60 mt-1">{t.tour_detail.price_to_confirm_body}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-marine/8 pt-4 space-y-1.5">
                      <div className="flex justify-between text-sm font-body text-marine/55">
                        <span>{t.tour_detail.trip_base}</span><span>${calculations.basePrice}</span>
                      </div>
                      <div className="flex justify-between text-sm font-body text-marine/55">
                        <span>{t.tour_detail.addons}</span><span>${calculations.addonTotal}</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="font-heading text-marine tracking-wider">{t.tour_detail.total.toUpperCase()}</span>
                        <span className="font-heading text-3xl text-ocean">${calculations.total}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting' || overMax}
                    className="w-full bg-coral text-white py-4 rounded-xl font-heading tracking-widest text-sm hover:bg-marine transition-colors disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? t.tour_detail.sending.toUpperCase() : t.tour_detail.send_booking.toUpperCase()}
                  </button>

                  {formStatus === 'error' && (
                    <p className="text-center text-coral text-xs font-body">{t.tour_detail.error_msg}</p>
                  )}
                  <p className="text-center text-marine/35 text-xs font-body">{t.tour_detail.follow_up}</p>
                </form>
              </div>
            )}
          </div>

          {/* Private Charter Inquiry */}
          <div className="bg-marine rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,24,68,0.20)]">
            <button
              onClick={() => setShowPrivate(v => !v)}
              className="w-full flex items-center gap-4 p-6 text-left group"
            >
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                <Ship size={20} className="text-teal" />
              </div>
              <div className="flex-grow">
                <h4 className="font-heading text-white text-base tracking-wider">{t.tour_detail.private_title}</h4>
                <p className="font-body text-white/55 text-xs mt-0.5">{t.tour_detail.private_sub}</p>
              </div>
              <ChevronDown size={18} className={`text-white/50 transition-transform duration-300 ${showPrivate ? 'rotate-180' : ''}`} />
            </button>

            {showPrivate && (
              <div className="border-t border-white/10 px-6 pb-6">
                {privateStatus === 'success' ? (
                  <div className="py-6 text-center">
                    <CheckCircle2 size={32} className="text-teal mx-auto mb-3" />
                    <p className="font-heading text-white text-sm tracking-wider mb-1">{t.tour_detail.inquiry_sent.toUpperCase()}</p>
                    <p className="font-body text-white/55 text-xs">{t.tour_detail.inquiry_followup}</p>
                  </div>
                ) : (
                  <form onSubmit={onPrivateSubmit} className="space-y-3 pt-5">
                    <p className="font-body text-white/60 text-xs leading-relaxed pb-1">{t.tour_detail.private_body_text}</p>
                    {[
                      { key: 'name', placeholder: t.tour_detail.your_name, type: 'text', required: true },
                      { key: 'whatsapp', placeholder: t.tour_detail.whatsapp, type: 'text', required: true },
                      { key: 'email', placeholder: t.tour_detail.email, type: 'email', required: true },
                      { key: 'date', placeholder: t.tour_detail.preferred_date, type: 'date', required: false },
                      { key: 'groupSize', placeholder: t.tour_detail.group_size, type: 'text', required: false },
                    ].map(({ key, placeholder, type, required }) => (
                      <input
                        key={key}
                        type={type}
                        required={required}
                        placeholder={placeholder}
                        min={type === 'date' ? minDate : undefined}
                        value={privateData[key as keyof PrivateInquiryData]}
                        onChange={e => setPrivateData(d => ({ ...d, [key]: e.target.value }))}
                        className="w-full bg-white/10 text-white placeholder:text-white/35 rounded-xl px-4 py-3 text-sm font-body focus:ring-2 focus:ring-teal/40 focus:outline-none"
                      />
                    ))}
                    <textarea
                      placeholder={t.tour_detail.special_requests}
                      rows={3}
                      value={privateData.message}
                      onChange={e => setPrivateData(d => ({ ...d, message: e.target.value }))}
                      className="w-full bg-white/10 text-white placeholder:text-white/35 rounded-xl px-4 py-3 text-sm font-body focus:ring-2 focus:ring-teal/40 focus:outline-none resize-none"
                    />
                    <button
                      type="submit"
                      disabled={privateStatus === 'submitting'}
                      className="w-full bg-teal text-white py-3.5 rounded-xl font-heading tracking-widest text-sm hover:bg-white hover:text-marine transition-colors disabled:opacity-50"
                    >
                      {privateStatus === 'submitting' ? t.tour_detail.sending.toUpperCase() : t.tour_detail.send_inquiry.toUpperCase()}
                    </button>
                    {privateStatus === 'error' && (
                      <p className="text-center text-coral/80 text-xs font-body">{t.tour_detail.error_msg}</p>
                    )}
                  </form>
                )}
                <a
                  href="https://wa.me/50760809595"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 text-white/50 hover:text-white text-xs font-body transition-colors"
                >
                  <MessageCircle size={13} /> {t.tour_detail.whatsapp_instead}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
