import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Privacy information about enquiry submissions and how customer information is used.'
};

export default function PrivacyPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Privacy policy</p>
        <h1 className="mt-3 text-4xl font-semibold text-walnut">Privacy notice</h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
          <p>Through the enquiry form, we may collect your name, phone number, email address, project location, project description, and preferred contact method. This information is used to respond to enquiries, discuss project requirements, and arrange further communication regarding carpentry and woodworking services.</p>
          <p>We do not claim legal compliance without legal review. Information submitted through the website is retained for business communication and service follow-up subject to the business retention policy.</p>
          <p>Customers may contact the business to request corrections or deletion of their submitted enquiry data. Contact details can be used for follow-up calls, WhatsApp messages, or email depending on the chosen communication method.</p>
        </div>
      </div>
    </div>
  );
}
