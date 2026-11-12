import { cn } from "@/lib/utils";

const TOOLS = [
  "WhatsApp",
  "Instagram",
  "n8n",
  "Make",
  "OpenAI",
  "Bitrix24",
  "HubSpot",
  "RD Station",
  "Google Sheets",
  "Google Agenda",
  "Stripe",
  "Supabase",
  "Slack",
  "Notion",
  "Zapier",
  "Gmail",
];

export default function IntegrationsMarquee({ title, tone = "dark" }: { title?: string; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <div>
      {title && (
        <p className={cn("text-center text-sm font-semibold", light ? "text-slate-500" : "text-white/50")}>{title}</p>
      )}
      <div className="mask-fade-x mt-6 overflow-hidden">
        <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...TOOLS, ...TOOLS].map((t, i) => (
            <li
              key={`${t}-${i}`}
              aria-hidden={i >= TOOLS.length}
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold",
                light
                  ? "bg-white text-slate-600 ring-1 ring-slate-200"
                  : "border border-white/10 bg-white/[0.03] text-white/65",
              )}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
