import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/site-data';

export function WhatsAppButton({ serviceName = 'carpentry services' }: { serviceName?: string }) {
  const message = `Hello Sri Hari Wood Works, I would like to enquire about ${serviceName}. Please contact me to discuss my requirements.`;
  return (
    <a href={whatsappUrl(message)} aria-label={`Chat with Sri Hari Wood Works about ${serviceName} on WhatsApp`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white">
      <MessageCircle className="h-4 w-4" /> WhatsApp Us
    </a>
  );
}
