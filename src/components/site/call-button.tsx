import { Phone } from 'lucide-react';

export function CallButton() {
  return (
    <a href="tel:+919948519979" className="inline-flex items-center gap-2 rounded-full bg-walnut px-5 py-3 text-sm font-semibold text-white">
      <Phone className="h-4 w-4" /> Call Now
    </a>
  );
}
