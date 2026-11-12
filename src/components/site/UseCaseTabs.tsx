"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";
import PhoneChat from "./PhoneChat";
import { USE_CASES } from "@/content/automations";
import { cn } from "@/lib/utils";

export default function UseCaseTabs() {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);
  const active = USE_CASES.find((u) => u.id === activeId) ?? USE_CASES[0];
  const Icon = active.icon;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Exemplos de automação"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {USE_CASES.map((u) => {
          const TabIcon = u.icon;
          const selected = u.id === activeId;
          return (
            <button
              key={u.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`uc-panel-${u.id}`}
              id={`uc-tab-${u.id}`}
              onClick={() => setActiveId(u.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                selected
                  ? "bg-navy-900 text-white shadow-[0_8px_20px_-8px_rgb(8_19_58/0.6)]"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-navy-900 hover:ring-slate-300",
              )}
            >
              <TabIcon className="h-4 w-4" />
              {u.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`uc-panel-${active.id}`}
        aria-labelledby={`uc-tab-${active.id}`}
        className="mt-10 grid items-center gap-12 overflow-hidden rounded-[2rem] bg-white p-6 ring-1 ring-slate-200 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-14"
      >
        <div key={active.id} className="animate-fade-up">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-50 text-royal-600">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="mt-6 text-2xl font-bold leading-tight text-navy-900 sm:text-3xl lg:text-4xl text-balance">
            {active.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{active.description}</p>
          <ul className="mt-7 space-y-3">
            {active.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 font-medium text-navy-900">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow/30 text-navy-900">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-x-6 top-10 bottom-6 rounded-[2.5rem] bg-gradient-to-br from-royal-50 via-white to-orange-50" aria-hidden="true" />
          <PhoneChat key={active.id} script={active.script} title="Beste Web" subtitle={`${active.chatTitle} · online`} />
          <div
            key={`r-${active.id}`}
            className="absolute bottom-28 left-0 hidden animate-fade-up items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-15px_rgb(8_19_58/0.35)] ring-1 ring-slate-200 [animation-delay:600ms] sm:flex lg:-left-6"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Zap className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-navy-900">{active.result}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
