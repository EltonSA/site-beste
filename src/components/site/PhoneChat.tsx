"use client";

import { useEffect, useRef, useState } from "react";
import { Send, CheckCheck } from "lucide-react";
import LogoMark from "./LogoMark";
import type { ChatLine } from "@/content/automations";
import { cn } from "@/lib/utils";

/**
 * Celular com uma conversa automatizada que se "digita" sozinha.
 * Para reiniciar a animação ao trocar de roteiro, troque a `key` do componente.
 */
export default function PhoneChat({
  script,
  title = "Beste Web",
  subtitle = "online",
  loop = true,
  className,
}: {
  script: ChatLine[];
  title?: string;
  subtitle?: string;
  loop?: boolean;
  className?: string;
}) {
  const [step, setStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (step < script.length) {
      const next = script[step];
      const delay = step === 0 ? 700 : next.from === "bot" ? 1400 : 1100;
      t = setTimeout(() => setStep((s) => s + 1), delay);
    } else if (loop) {
      t = setTimeout(() => setStep(0), 5000);
    }
    return () => clearTimeout(t);
  }, [step, script, loop]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [step]);

  const typing = step < script.length && script[step].from === "bot" && step > 0;
  const visible = script.slice(0, step);

  return (
    <div
      className={cn(
        "relative w-[290px] shrink-0 rounded-[2.75rem] bg-navy-950 p-2.5 shadow-[0_40px_80px_-30px_rgb(8_19_58/0.55)] ring-1 ring-black/5 sm:w-[310px]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[2.2rem] bg-white">
        {/* status bar + notch */}
        <div className="relative flex items-center justify-between bg-navy-900 px-6 pb-1 pt-2.5 text-[11px] font-semibold text-white">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-navy-950" aria-hidden="true" />
          <span className="flex items-center gap-1" aria-hidden="true">
            <span className="h-2 w-3 rounded-sm border border-white/70" />
          </span>
        </div>

        {/* header da conversa */}
        <div className="flex items-center gap-3 bg-navy-900 px-4 pb-3 pt-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <LogoMark className="h-3.5 w-auto" />
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">{title}</div>
            <div className="truncate text-[11px] text-white/60">{subtitle}</div>
          </div>
        </div>

        {/* mensagens */}
        <div
          ref={scrollRef}
          className="no-scrollbar h-[400px] space-y-2 overflow-y-auto bg-chat-wallpaper px-3 py-4 sm:h-[430px]"
          aria-live="polite"
        >
          {visible.map((line, i) => {
            const nextLine = script[i + 1];
            const chosen = line.options && nextLine?.from === "user" && i + 1 < step ? nextLine.text : null;
            return (
              <div key={i} className={cn("flex animate-fade-up flex-col [animation-duration:0.35s]", line.from === "user" ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-snug text-slate-800 shadow-[0_1px_0.5px_rgb(0_0_0/0.13)]",
                    line.from === "user" ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white",
                  )}
                >
                  {line.text}
                  <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 align-bottom text-[10px] text-slate-400">
                    9:41
                    {line.from === "user" && <CheckCheck className="h-3 w-3 text-sky-500" />}
                  </span>
                </div>
                {line.options && (
                  <div className="mt-1 grid w-[85%] gap-1">
                    {line.options.map((o) => (
                      <span
                        key={o}
                        className={cn(
                          "rounded-lg py-1.5 text-center text-[13px] font-medium shadow-[0_1px_0.5px_rgb(0_0_0/0.13)] transition-colors",
                          chosen === o ? "bg-royal-50 text-royal-700" : "bg-white text-royal-600",
                        )}
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {typing && (
            <div className="flex">
              <div className="flex gap-1 rounded-xl rounded-tl-sm bg-white px-3 py-3 shadow-[0_1px_0.5px_rgb(0_0_0/0.13)]">
                {[0, 0.15, 0.3].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${d}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* barra de digitação */}
        <div className="flex items-center gap-2 bg-[#f0f2f5] px-3 py-2.5">
          <div className="flex-1 rounded-full bg-white px-4 py-2 text-[13px] text-slate-400">Mensagem</div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-600 text-white">
            <Send className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
