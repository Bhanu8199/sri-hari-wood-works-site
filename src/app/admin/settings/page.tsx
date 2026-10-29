export default function AdminSettingsPage() {
  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Settings</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Business profile & preferences</h1>
      </div>

      <div className="space-y-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
        <div>
          <label className="mb-2 block text-sm font-medium text-walnut">Business name</label>
          <input defaultValue="SRI HARI WOOD WORKS" className="w-full rounded-xl border border-border bg-cream px-3 py-2.5" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-walnut">Phone</label>
          <input defaultValue="+91 99485 19979" className="w-full rounded-xl border border-border bg-cream px-3 py-2.5" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-walnut">Address</label>
          <textarea defaultValue="Somavarappadu, Andhra Pradesh 534450" className="w-full rounded-xl border border-border bg-cream px-3 py-2.5" rows={4} />
        </div>
      </div>
    </div>
  );
}
