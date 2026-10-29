import { MessageCircleMore } from 'lucide-react';

export function ExperienceBadge({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white px-4 py-5 text-center shadow-soft">
      <p className="text-sm font-semibold text-walnut">{label}</p>
    </div>
  );
}
