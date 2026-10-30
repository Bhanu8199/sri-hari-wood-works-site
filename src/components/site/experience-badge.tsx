import type { ReactNode } from 'react';

export function ExperienceBadge({ value, label, detail, icon }: { value: string; label: string; detail: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cream text-olive" aria-hidden="true">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight text-walnut">{value}</p>
        <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
        <p className="mt-0.5 text-xs leading-5 text-slate-600">{detail}</p>
      </div>
    </div>
  );
}
