export default function AdminEnquiriesPage() {
  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Enquiries</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Manage customer requests</h1>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
        <table className="min-w-full text-left">
          <thead className="bg-stone">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-walnut">Customer</th>
              <th className="px-4 py-3 text-sm font-semibold text-walnut">Service</th>
              <th className="px-4 py-3 text-sm font-semibold text-walnut">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-walnut">Date</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Rohit Kumar', 'Wardrobe', 'New', '2026-10-20'],
              ['S. Lakshmi', 'Kitchen woodwork', 'In progress', '2026-10-18'],
              ['Pavan', 'Doors and windows', 'Completed', '2026-10-10']
            ].map(([name, service, status, date]) => (
              <tr key={name} className="border-t border-border">
                <td className="px-4 py-4 text-slate-700">{name}</td>
                <td className="px-4 py-4 text-slate-700">{service}</td>
                <td className="px-4 py-4"><span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-walnut">{status}</span></td>
                <td className="px-4 py-4 text-slate-700">{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
