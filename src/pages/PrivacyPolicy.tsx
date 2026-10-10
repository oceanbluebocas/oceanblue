import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { lang } = useLanguage();
  useEffect(() => { document.title = 'Privacy Policy — Ocean Blue Bocas del Toro'; }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-marine py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl text-white mb-2">Privacy Policy</h1>
          <p className="font-body text-white/55 text-sm">Last updated: September 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="font-body text-marine/80 space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">1. Who We Are</h2>
            <p>Ocean Blue Bocas del Toro ("we", "our", "us") is a local boat tour operator based at the main dock, Isla Colón, Bocas del Toro, Panama. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website at <strong>oceanbluebocas.com</strong> or contact us to book a tour.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect information you voluntarily provide when you submit a booking request, private charter inquiry, or contact form:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Full name and email address</li>
              <li>WhatsApp / phone number</li>
              <li>Requested tour date and group size</li>
              <li>Hotel or pickup location</li>
              <li>Any medical conditions or special needs you choose to disclose</li>
              <li>Special requests or messages</li>
            </ul>
            <p className="mt-3">We also collect standard website analytics data (pages visited, browser type, approximate location) if you have consented to analytics cookies.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>To confirm and coordinate your tour booking</li>
              <li>To contact you via WhatsApp or email about your reservation</li>
              <li>To send a booking confirmation email</li>
              <li>To improve our website and services (analytics only with consent)</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">4. Form Processing (Formspree)</h2>
            <p>Our booking, charter inquiry, and contact forms are processed by <strong>Formspree</strong> (formspree.io), a third-party form submission service. When you submit a form, your data is transmitted securely to Formspree, which forwards it to our email. Please review their privacy policy at <a href="https://formspree.io/legal/privacy-policy/" className="text-ocean hover:underline" target="_blank" rel="noopener noreferrer">formspree.io/legal/privacy-policy</a>.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">5. Cookies</h2>
            <p className="mb-2">Our website uses the following types of cookies:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Essential cookies:</strong> Required for the website to function (language preference, cookie consent status). These cannot be disabled.</li>
              <li><strong>Analytics cookies:</strong> Used to understand how visitors use our site (e.g., Google Analytics). These are only set if you click "Accept" on the cookie banner.</li>
            </ul>
            <p className="mt-3">You can change your cookie preferences at any time by clicking the "Cookie Settings" link in the footer.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">6. Data Retention</h2>
            <p>Booking inquiry data is retained in our email inbox for a maximum of 24 months for operational records, then deleted. Analytics data is retained per Google Analytics default settings (26 months).</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">7. Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, contact us at <a href="mailto:oceanbluebocas@gmail.com" className="text-ocean hover:underline">oceanbluebocas@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">8. Security</h2>
            <p>All form submissions are transmitted over HTTPS (TLS encryption). We do not store credit card or payment details on our website — payments are collected in cash or by card at the dock on the day of the tour.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our website after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl text-marine mb-3">10. Contact</h2>
            <p>For any privacy-related questions, contact us at:<br />
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
