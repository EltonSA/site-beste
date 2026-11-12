import { TrendingUp } from "lucide-react";
import type { Case } from "@/content/cases";
import { cn } from "@/lib/utils";

export default function CaseCard({ item, compact = false }: { item: Case; compact?: boolean }) {
  const Icon = item.icon;
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgb(8_19_58/0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgb(8_19_58/0.25)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {item.type} · {item.category}
          </div>
          <h3 className="mt-0.5 text-lg font-bold leading-snug text-navy-900">{item.title}</h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>

      <div className="mt-5 flex gap-2.5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        <span>{item.result}</span>
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200">
        {item.metrics.map((m) => (
          <div key={m.label} className="px-2 py-3 text-center">
            <div className="font-display text-lg font-bold text-navy-900 sm:text-xl">{m.value}</div>
            <div className="mt-0.5 text-[11px] leading-tight text-slate-500">{m.label}</div>
          </div>
        ))}
      </div>

      {!compact && (
        <ul className="mt-5 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          {item.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-royal-500" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className={cn("mt-auto flex flex-wrap gap-1.5 pt-5")}>
        {item.stack.map((s) => (
          <span key={s} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}
