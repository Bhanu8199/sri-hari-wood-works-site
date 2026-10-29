export default function AdminProjectsPage() {
  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Projects</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Project gallery management</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {['Wardrobe renovation', 'Kitchen woodwork', 'Door installation'].map((item) => (
          <div key={item} className="rounded-3xl border border-border bg-white p-4 shadow-soft">
            <div className="h-48 rounded-2xl bg-gradient-to-br from-cream to-stone" />
            <h2 className="mt-4 text-xl font-semibold text-walnut">{item}</h2>
            <p className="mt-2 text-sm text-slate-700">Owner-approved gallery item ready for upload.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
