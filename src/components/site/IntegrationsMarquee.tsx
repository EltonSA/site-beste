import { TOOL_LOGOS } from "@/content/tool-logos";
import { cn } from "@/lib/utils";

export default function IntegrationsMarquee({ title, tone = "dark" }: { title?: string; tone?: "dark" | "light" }) {
  const light = tone === "light";
  const items = [...TOOL_LOGOS, ...TOOL_LOGOS];

  return (
    <div>
      {title && (
        <p className={cn("text-center text-sm font-semibold", light ? "text-slate-500" : "text-white/50")}>{title}</p>
      )}
      <div className="mask-fade-x mt-6 overflow-hidden">
        <ul className="flex w-max animate-marquee gap-3 py-1 hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= TOOL_LOGOS.length}
              className={cn(
                "flex items-center gap-2.5 whitespace-nowrap rounded-full py-2.5 pl-3.5 pr-5 text-sm font-semibold",
                light
                  ? "bg-white text-slate-700 shadow-[0_1px_2px_rgb(8_19_58/0.06)] ring-1 ring-slate-200"
                  : "border border-white/10 bg-white/[0.04] text-white/75",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0"
                fill={light ? t.color : "currentColor"}
                aria-hidden="true"
              >
                <path d={t.path} />
              </svg>
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
