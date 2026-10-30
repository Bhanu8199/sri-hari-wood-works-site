import { Phone } from 'lucide-react';
import { businessProfile } from '@/lib/site-data';

export function CallButton() {
  return (
    <a href={`tel:${businessProfile.phone}`} className="inline-flex items-center gap-2 rounded-full bg-walnut px-5 py-3 text-sm font-semibold text-white">
      <Phone className="h-4 w-4" /> Call Now
    </a>
  );
}
