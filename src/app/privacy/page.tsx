import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Learn how Sri Hari Wood Works handles contact details, project enquiries, cookies, and external services used by this website.'
};

export default function PrivacyPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Privacy policy</p>
        <h1 className="mt-3 text-4xl font-semibold text-walnut">Privacy policy</h1>
        <p className="mt-3 text-sm text-slate-600">Last updated: November 2, 2026</p>
        <div className="mt-6 space-y-8 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-walnut">Information you share with us</h2>
            <p className="mt-2">You can contact Sri Hari Wood Works by phone, WhatsApp, or email. When contacting us, you may choose to share details such as your name, phone number, email address, project location, and woodworking requirements. Please only share information needed to discuss your project.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-walnut">How information is used and retained</h2>
            <p className="mt-2">Information you share when contacting the business is used to respond to you, discuss project requirements, prepare estimates, and arrange follow-up. The business retains that information only as long as reasonably needed for these purposes and applicable business or legal requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-walnut">Service providers and external links</h2>
            <p className="mt-2">Phone, email, and WhatsApp links open or use the relevant service on your device. WhatsApp is operated by Meta. Links to the Google Business Profile and directions open Google services. The website loads its display font from Google Fonts. Those providers may process technical or account information under their own privacy policies when you use their services; the business does not control their practices.</p>
            <p className="mt-2">Information is not sold through this website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-walnut">Cookies and website activity</h2>
            <p className="mt-2">The public website does not currently use analytics or advertising tracking cookies. A strictly necessary, eight-hour session cookie is used for authorized business administration access; it is not used to track public visitors.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-walnut">Your choices and requests</h2>
            <p className="mt-2">You can choose what information to share and can contact the business to ask about access, correction, or deletion of information you have provided. To make a request or ask a privacy question, use the phone, WhatsApp, or email details on our <a className="font-semibold text-olive underline underline-offset-2" href="/contact">Contact page</a>. We may need to verify your identity before acting on a request.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-walnut">Changes to this notice</h2>
            <p className="mt-2">This notice may be updated when website features or information practices change. The latest revision date appears at the top of this page.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
