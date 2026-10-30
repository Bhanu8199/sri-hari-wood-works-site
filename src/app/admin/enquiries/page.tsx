import { getDatabase } from '@/lib/database';

type Enquiry = {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  project_location: string | null;
  project_description: string | null;
  preferred_contact_method: string | null;
  status: string;
  notification_status: string;
  created_at: string;
  service_title: string | null;
};

export default async function AdminEnquiriesPage() {
  const database = getDatabase();
  let enquiries: Enquiry[] = [];
  let message = '';

  if (!database) {
    message = 'Configure DATABASE_URL to view saved enquiries.';
  } else {
    try {
      const { rows } = await database.query<Enquiry>(
        `SELECT e.id, e.customer_name, e.phone, e.email, e.project_location,
          e.project_description, e.preferred_contact_method, e.status,
          e.notification_status, e.created_at, s.title AS service_title
        FROM enquiries e
        LEFT JOIN services s ON s.id = e.service_id
        ORDER BY e.created_at DESC`
      );
      enquiries = rows;
    } catch (error) {
      console.error('Neon enquiry list lookup failed:', error);
      message = 'Saved enquiries could not be loaded.';
    }
  }

  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Enquiries</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Manage customer requests</h1>
      </div>
      {message ? (
        <p role="status" className="rounded-2xl border border-border bg-white p-5 text-slate-700">{message}</p>
      ) : enquiries.length ? (
        <div className="overflow-x-auto rounded-3xl border border-border bg-white shadow-soft">
          <table className="min-w-full text-left">
            <thead className="bg-stone">
              <tr>
                {['Customer', 'Service', 'Location', 'Project description', 'Contact', 'Status', 'Email notice', 'Date'].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-sm font-semibold text-walnut">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="border-t border-border">
                  <td className="px-4 py-4 text-slate-700">
                    <p className="font-medium text-walnut">{enquiry.customer_name}</p>
                    <a href={`tel:${enquiry.phone}`} className="text-sm underline">{enquiry.phone}</a>
                    {enquiry.email ? <a href={`mailto:${enquiry.email}`} className="block text-sm underline">{enquiry.email}</a> : null}
                  </td>
                  <td className="px-4 py-4 text-slate-700">{enquiry.service_title || 'Not specified'}</td>
                  <td className="px-4 py-4 text-slate-700">{enquiry.project_location || 'Not specified'}</td>
                  <td className="max-w-sm px-4 py-4 text-slate-700">{enquiry.project_description || 'Not specified'}</td>
                  <td className="px-4 py-4 text-slate-700">{enquiry.preferred_contact_method || 'Not specified'}</td>
                  <td className="px-4 py-4 text-slate-700">{enquiry.status}</td>
                  <td className="px-4 py-4 text-slate-700">{enquiry.notification_status.replaceAll('_', ' ')}</td>
                  <td className="px-4 py-4 text-slate-700">
                    {new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date(enquiry.created_at))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-2xl border border-border bg-white p-5 text-slate-700">No customer enquiries have been received yet.</p>
      )}
    </div>
  );
}
