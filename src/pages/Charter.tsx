import { useState } from 'react';
import { Ship, CheckCircle2, MessageCircle, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { tours } from '../data/tours';
import { useLanguage } from '../context/LanguageContext';

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_BOOKING_FORMSPREE_ENDPOINT ??
  'https://formspree.io/f/xvkzrwew';

interface FormData {
  tourId: string;
  name: string;
  whatsapp: string;
  email: string;
  date: string;
  groupSize: string;
  message: string;
}

const empty: FormData = {
  tourId: '',
  name: '',
  whatsapp: '',
  email: '',
  date: '',
  groupSize: '',
  message: '',
};

export default function Charter() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<FormData>(empty);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showTours, setShowTours] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const selectedTour = tours.find(t => t.id === form.tourId);
  const selectedLabel = selectedTour
    ? (lang === 'es' ? selectedTour.name_es : selectedTour.name)
    : form.tourId === 'other'
    ? (lang === 'es' ? 'Otro / Personalizado' : 'Other / Custom')
    : (lang === 'es' ? 'Selecciona un tour' : 'Select a tour');

  const allOptions = [
    ...tours.map(t => ({ id: t.id, label: lang === 'es' ? t.name_es : t.name, sub: t.schedule })),
    { id: 'other', label: lang === 'es' ? 'Otro / Personalizado' : 'Other / Custom', sub: lang === 'es' ? 'Cuéntanos tu idea' : 'Tell us your idea' },
  ];

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tourId || !form.name.trim() || !form.email.trim()) {
      setStatus('error');
      return;
    }
    setStatus('submitting');

    const tourLabel = selectedTour
      ? (lang === 'es' ? selectedTour.name_es : selectedTour.name)
      : 'Other / Custom';

    const body = `
PRIVATE CHARTER INQUIRY
===================================
Tour: ${tourLabel}
Name: ${form.name}
WhatsApp: ${form.whatsapp || 'Not provided'}
Email: ${form.email}
Preferred Date: ${form.date || 'TBD'}
Group Size: ${form.groupSize || 'TBD'}
Message / Requests: ${form.message || 'None'}
    `.trim();

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Private Charter Inquiry — ${tourLabel}`,
          _replyto: form.email,
          form_type: 'Private charter inquiry',
          language: lang,
          tour_id: form.tourId,
          tour: tourLabel,
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp || 'Not provided',
          preferred_date: form.date || 'TBD',
          group_size: form.groupSize || 'TBD',
          message: body,
        }),
      });
      if (res.ok) {
        setStatus('success');
        const waMsg = encodeURIComponent(`Hi! I just submitted a private charter inquiry for ${tourLabel}. Name: ${form.name}.`);
        window.open(`https://wa.me/50760809595?text=${waMsg}`, '_blank');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#F0F4F8] min-h-screen pb-24">
      {/* Header */}
      <div className="relative bg-marine overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, #00A896 0%, transparent 55%), radial-gradient(circle at 10% 80%, #0060B6 0%, transparent 50%)' }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Ship size={32} className="text-teal" />
          </div>
          <p className="font-script text-teal text-2xl md:text-3xl mb-2">
            {lang === 'es' ? 'El bote es tuyo' : 'The boat is yours'}
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-white mb-4">
            {lang === 'es' ? 'Charter Privado' : 'Private Charter'}
          </h1>
          <p className="font-body text-white/60 max-w-xl mx-auto text-sm md:text-base">
            {lang === 'es'
              ? 'Elige cualquier tour o cuéntanos tu idea. Te respondemos en menos de 24 horas con disponibilidad y precio.'
              : 'Pick any tour or describe your own idea. We\'ll get back to you within 24 hours with availability and a price.'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 max-w-2xl">
        {status === 'success' ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 md:p-14 text-center border border-marine/5">
            <div className="w-20 h-20 bg-teal/15 text-teal rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="font-heading text-3xl text-marine mb-3">
              {lang === 'es' ? '¡Consulta Enviada!' : 'Inquiry Sent!'}
            </h2>
            <p className="font-body text-marine/60 mb-6 leading-relaxed">
              {lang === 'es'
                ? `Recibimos tu consulta, ${form.name}. Te escribimos en menos de 24 horas para confirmar disponibilidad y precio.`
                : `Got it, ${form.name}. We'll reach out within 24 hours to confirm availability and pricing.`}
            </p>
            <button
              onClick={() => { setForm(empty); setStatus('idle'); }}
              className="text-ocean font-heading text-sm tracking-wider hover:underline"
            >
              {lang === 'es' ? 'ENVIAR OTRA CONSULTA' : 'SEND ANOTHER INQUIRY'}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-lg border border-marine/5 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-marine/8">
              <h2 className="font-heading text-2xl text-marine mb-1">
                {lang === 'es' ? 'Tu Consulta' : 'Your Inquiry'}
              </h2>
              <p className="font-body text-marine/50 text-sm">
                {lang === 'es' ? 'Sin compromiso — solo cuéntanos qué tienes en mente.' : 'No commitment — just tell us what you have in mind.'}
              </p>
              <div className="mt-3 flex items-start gap-2 bg-teal/8 p-3 rounded-lg border border-teal/15 text-xs font-body text-teal">
                <Lock size={12} className="shrink-0 mt-0.5" />
                <span>
                  {lang === 'es'
                    ? 'Tu información está cifrada en tránsito. No almacenamos datos de tarjeta.'
                    : 'Your info is encrypted in transit. No card details stored.'}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-5">

              {/* Tour selector */}
              <div>
                <label className="block font-heading text-xs text-marine/60 tracking-widest mb-2">
                  {lang === 'es' ? 'TOUR DE INTERÉS' : 'TOUR OF INTEREST'}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTours(v => !v)}
                    className={`w-full bg-[#F0F4F8] rounded-xl px-4 py-3 text-sm font-body text-left flex items-center justify-between focus:ring-2 focus:ring-ocean/40 focus:outline-none transition-colors ${form.tourId ? 'text-marine' : 'text-marine/40'}`}
                  >
                    <span>{selectedLabel}</span>
                    {showTours ? <ChevronUp size={16} className="text-marine/40" /> : <ChevronDown size={16} className="text-marine/40" />}
                  </button>

                  {showTours && (
                    <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-marine/10 overflow-hidden max-h-72 overflow-y-auto">
                      {allOptions.map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => { setForm(f => ({ ...f, tourId: opt.id })); setShowTours(false); }}
                          className={`w-full px-4 py-3 text-left hover:bg-[#F0F4F8] transition-colors border-b border-marine/5 last:border-0 ${form.tourId === opt.id ? 'bg-teal/8' : ''}`}
                        >
                          <div className={`font-heading text-sm ${form.tourId === opt.id ? 'text-teal' : 'text-marine'}`}>{opt.label}</div>
                          <div className="font-body text-xs text-marine/40 mt-0.5">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {!form.tourId && status === 'error' && (
                  <span className="text-coral text-xs mt-1 block">
                    {lang === 'es' ? 'Por favor elige un tour' : 'Please select a tour'}
                  </span>
                )}
              </div>

              {/* Contact fields */}
              <div className="space-y-3">
                <label className="block font-heading text-xs tracking-widest text-marine/60 mb-1">
                  {lang === 'es' ? 'TUS DATOS' : 'YOUR DETAILS'}
                </label>
                {[
                  { key: 'name' as const, placeholder: lang === 'es' ? 'Nombre completo *' : 'Full name *', type: 'text', required: true },
                  { key: 'whatsapp' as const, placeholder: lang === 'es' ? 'WhatsApp (con código de país)' : 'WhatsApp (with country code)', type: 'text', required: false },
                  { key: 'email' as const, placeholder: lang === 'es' ? 'Correo electrónico *' : 'Email address *', type: 'email', required: true },
                ].map(({ key, placeholder, type, required }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    value={form[key]}
                    onChange={set(key)}
                    className="w-full bg-[#F0F4F8] rounded-xl px-4 py-3 font-body text-marine text-sm placeholder:text-marine/35 focus:ring-2 focus:ring-ocean/40 focus:outline-none"
                  />
                ))}
              </div>

              {/* Trip details */}
              <div className="space-y-3">
                <label className="block font-heading text-xs tracking-widest text-marine/60 mb-1">
                  {lang === 'es' ? 'DETALLES DEL VIAJE' : 'TRIP DETAILS'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-body text-xs text-marine/45 mb-1">
                      {lang === 'es' ? 'Fecha preferida' : 'Preferred date'}
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      value={form.date}
                      onChange={set('date')}
                      className="w-full bg-[#F0F4F8] rounded-xl px-4 py-3 font-body text-marine text-sm focus:ring-2 focus:ring-ocean/40 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs text-marine/45 mb-1">
                      {lang === 'es' ? '¿Cuántas personas?' : 'How many people?'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'es' ? 'p.ej. 6' : 'e.g. 6'}
                      value={form.groupSize}
                      onChange={set('groupSize')}
                      className="w-full bg-[#F0F4F8] rounded-xl px-4 py-3 font-body text-marine text-sm placeholder:text-marine/35 focus:ring-2 focus:ring-ocean/40 focus:outline-none"
                    />
                  </div>
                </div>
                <textarea
                  placeholder={lang === 'es'
                    ? 'Solicitudes especiales, preguntas, itinerario personalizado...'
                    : 'Special requests, questions, custom itinerary ideas...'}
                  rows={4}
                  value={form.message}
                  onChange={set('message')}
                  className="w-full bg-[#F0F4F8] rounded-xl px-4 py-3 font-body text-marine text-sm placeholder:text-marine/35 focus:ring-2 focus:ring-ocean/40 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-marine text-white py-4 rounded-xl font-heading tracking-widest text-sm hover:bg-coral transition-colors disabled:opacity-50"
              >
                {status === 'submitting'
                  ? (lang === 'es' ? 'ENVIANDO...' : 'SENDING...')
                  : (lang === 'es' ? 'ENVIAR CONSULTA' : 'SEND INQUIRY')}
              </button>

              {status === 'error' && (
                <p className="text-center text-coral text-xs font-body">
                  {lang === 'es'
                    ? 'Algo salió mal. Intenta de nuevo o escríbenos por WhatsApp.'
                    : 'Something went wrong. Try again or message us on WhatsApp.'}
                </p>
              )}

              <a
                href="https://wa.me/50760809595"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-marine/40 hover:text-ocean text-xs font-body transition-colors"
              >
                <MessageCircle size={13} />
                {lang === 'es' ? 'O escríbenos directamente por WhatsApp' : 'Or message us directly on WhatsApp'}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
