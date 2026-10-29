export default function AdminDashboardPage() {
  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Total enquiries', '48'],
          ['New', '12'],
          ['In progress', '9'],
          ['Completed', '17']
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-border bg-white p-5 shadow-soft">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-walnut">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-semibold text-walnut">Recent submissions</h2>
          <div className="mt-4 space-y-3">
            {['Rohit K. — Wardrobe enquiry', 'Narayana P. — Door work', 'Sowmya T. — Kitchen renovation'].map((item) => (
              <div key={item} className="rounded-2xl bg-stone p-3 text-slate-700">{item}</div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-semibold text-walnut">Recent gallery updates</h2>
          <div className="mt-4 space-y-3">
            {['Updated wardrobe gallery', 'Posted new kitchen project', 'Archived old service photography'].map((item) => (
              <div key={item} className="rounded-2xl bg-stone p-3 text-slate-700">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
