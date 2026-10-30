export default function AdminProjectsPage() {
  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Projects</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Project gallery management</h1>
      </div>
      <div className="rounded-3xl border border-dashed border-border bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-walnut">No owner-approved project photos are available</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-700">
          This project does not currently have photo-upload management. Provide genuine business photographs and an image-storage service to enable project uploads.
        </p>
      </div>
    </div>
  );
}
