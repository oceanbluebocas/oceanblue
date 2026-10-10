import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TermsConditions() {
  useEffect(() => { document.title = 'Terms & Conditions — Ocean Blue Bocas del Toro'; }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-marine py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl text-white mb-2">Terms & Conditions</h1>
          <p className="font-body text-white/55 text-sm">Last updated: September 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="font-body text-marine/80 space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">1. Agreement</h2>
            <p>By submitting a booking request through the Ocean Blue Bocas del Toro website (oceanbluebocas.com) or directly via WhatsApp or email, you agree to these Terms & Conditions. Please read them carefully before booking.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">2. Bookings & Confirmation</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>All booking requests submitted online are <strong>not confirmed</strong> until you receive written confirmation from Ocean Blue via email or WhatsApp.</li>
              <li>Confirmation is subject to availability and weather conditions.</li>
              <li>All tours require a <strong>minimum of 4 passengers</strong> to operate, unless otherwise stated.</li>
              <li>The sport fishing charter is priced per boat (covers 1–4 passengers) and is booked as a single unit.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">3. Payment</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Payment is collected in <strong>cash (USD) or card at the dock</strong> on the day of the tour.</li>
              <li>No advance online payment is required to reserve your spot.</li>
              <li>Prices are listed in US Dollars (USD) and include all standard inclusions (water, 1 beer, snorkel gear, safety equipment, local captain and guide).</li>
              <li>National Park entry fees (where applicable, e.g., Cayo Zapatilla) are <strong>not included</strong> and are paid separately in cash at the ranger station.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">4. Cancellations & Refunds</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Weather cancellations:</strong> If Ocean Blue cancels due to unsafe weather or sea conditions, you will receive a full rescheduling or refund of any deposit paid.</li>
              <li><strong>Customer cancellations:</strong> If you cancel 24+ hours before the tour, you will not be charged. If you cancel within 24 hours or are a no-show, a cancellation fee may apply.</li>
              <li>Tour times may be adjusted due to weather or tidal conditions. Ocean Blue reserves the right to modify itineraries for safety.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">5. Health & Safety</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>All passengers must be able to swim or wear a life jacket throughout the tour.</li>
              <li>Life jackets and USCG-approved safety equipment are provided on all boats.</li>
              <li>Passengers with serious heart conditions, pregnancy, severe motion sickness, or other medical conditions should consult a doctor before joining offshore or long-range tours (Escudo de Veraguas).</li>
              <li>Ocean Blue captains reserve the right to refuse boarding or return early if a passenger's safety is at risk.</li>
              <li>Alcohol is limited to 1 complimentary beer per person on standard tours. Excessive intoxication may result in refusal of service.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">6. Liability</h2>
            <p>Ocean Blue Bocas del Toro operates with full safety precautions; however, all water-based activities involve inherent risks. By booking, you acknowledge these risks and agree that Ocean Blue is not liable for:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>Injuries resulting from personal negligence</li>
              <li>Lost or damaged personal belongings</li>
              <li>Wildlife encounters (all wildlife is wild and unpredictable)</li>
              <li>Force majeure events (weather, natural disasters)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">7. Environmental Responsibility</h2>
            <p>Ocean Blue operates under a strict "leave no trace" policy. Guests are expected to respect wildlife, coral reefs, and marine ecosystems. Do not touch, feed, or harass wildlife. Biodegradable sunscreen is strongly encouraged near coral reefs.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">8. Photography & Media</h2>
            <p>Photos and videos taken on tours may be shared by Ocean Blue on social media or marketing materials. If you do not wish to appear in any photos, please inform your captain at the beginning of the tour.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">9. Governing Law</h2>
            <p>These terms are governed by the laws of the Republic of Panama. Any disputes shall be resolved in the courts of Bocas del Toro Province, Panama.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">10. Contact</h2>
            <p>For questions about these terms:<br />
            <a href="mailto:oceanbluebocas@gmail.com" className="text-ocean hover:underline">oceanbluebocas@gmail.com</a><br />
            WhatsApp: <a href="https://wa.me/50760809595" className="text-ocean hover:underline">+507 6080-9595</a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-marine/10">
          <Link to="/" className="font-heading text-xs tracking-widest text-ocean hover:text-marine transition-colors">← BACK TO HOME</Link>
        </div>
      </div>
    </div>
  );
}
