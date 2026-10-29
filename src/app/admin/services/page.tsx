export default function AdminServicesPage() {
  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Services</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Published offerings</h1>
      </div>

      <div className="space-y-4">
        {[
          ['Custom furniture', 'Live'],
          ['Doors and window woodwork', 'Live'],
          ['Wardrobes and storage', 'Draft'],
          ['Kitchen and interior woodwork', 'Live']
        ].map(([title, status]) => (
          <div key={title} className="flex items-center justify-between rounded-2xl border border-border bg-white p-4 shadow-soft">
            <div>
              <h2 className="text-lg font-semibold text-walnut">{title}</h2>
            </div>
            <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-walnut">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
