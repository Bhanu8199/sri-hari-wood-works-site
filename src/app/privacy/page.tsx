import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Privacy information about contacting Sri Hari Wood Works and how customer information is used.'
};

export default function PrivacyPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Privacy policy</p>
        <h1 className="mt-3 text-4xl font-semibold text-walnut">Privacy notice</h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
          <p>This site does not currently have a web-based enquiry form. Its phone, WhatsApp, and email links let you contact the business directly. Information you choose to share through those services may be used to respond to you and discuss your woodworking requirements.</p>
          <p>Enquiry records submitted through an earlier version of this website may remain stored for business communication and service follow-up.</p>
          <p>To request correction or deletion of information you have shared with the business, contact it using the phone, WhatsApp, or email details on the Contact page.</p>
        </div>
      </div>
    </div>
  );
}
