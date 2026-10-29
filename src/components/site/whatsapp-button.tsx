import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({ serviceName = 'carpentry services' }: { serviceName?: string }) {
  const message = encodeURIComponent(`Hello Sri Hari Wood Works, I would like to enquire about your ${serviceName}. Could you please discuss my requirements and the applicable estimate charges?`);
  return (
    <a href={`https://wa.me/919948519979?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white">
      <MessageCircle className="h-4 w-4" /> WhatsApp Us
    </a>
  );
}
