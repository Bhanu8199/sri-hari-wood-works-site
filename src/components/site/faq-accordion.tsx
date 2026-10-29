import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/types';

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-4">
      {items.map((item) => (
        <Accordion.Item key={item.question} value={item.question} className="rounded-2xl border border-border bg-white px-5 py-3 shadow-soft">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between gap-4 text-left text-lg font-semibold text-walnut">
              {item.question}
              <ChevronDown className="h-5 w-5 shrink-0" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pt-4 text-base leading-7 text-slate-700">{item.answer}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
