import { Plus } from "lucide-react";

export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item) => (
        <details key={item.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
            <span className="font-display text-base font-semibold text-navy-900 sm:text-lg">{item.q}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform duration-200 group-open:rotate-45">
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="mt-3 max-w-2xl pr-12 leading-relaxed text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
