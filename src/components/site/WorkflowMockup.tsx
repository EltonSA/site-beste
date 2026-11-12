import { Sparkles, Database, CalendarCheck, Send, Check, type LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Node = {
  key: string;
  title: string;
  subtitle: string;
  icon: LucideIcon | "whatsapp";
  tint: string;
  /** posição no canvas 1000×440 */
  x: number;
  y: number;
  highlight?: boolean;
};

const W = 180;
const H = 84;

const NODES: Node[] = [
  { key: "in", title: "WhatsApp", subtitle: "Nova mensagem", icon: "whatsapp", tint: "bg-[#25D366]/15 text-[#25D366]", x: 30, y: 178 },
  { key: "ai", title: "Agente de IA", subtitle: "Entende e qualifica", icon: Sparkles, tint: "bg-brand-violet/20 text-[#a5a8ff]", x: 280, y: 178, highlight: true },
  { key: "crm", title: "CRM", subtitle: "Lead criado", icon: Database, tint: "bg-brand-blue/15 text-brand-blue", x: 540, y: 78 },
  { key: "cal", title: "Agenda", subtitle: "Reunião marcada", icon: CalendarCheck, tint: "bg-brand-yellow/15 text-brand-yellow", x: 540, y: 278 },
  { key: "out", title: "Resposta", subtitle: "Cliente atendido", icon: Send, tint: "bg-brand-orange/15 text-brand-orange", x: 790, y: 178 },
];

const EDGES = [
  "M210 220 L280 220",
  "M460 220 C500 220 500 120 540 120",
  "M460 220 C500 220 500 320 540 320",
  "M720 120 C755 120 755 220 790 220",
  "M720 320 C755 320 755 220 790 220",
];

function NodeIcon({ icon, className }: { icon: Node["icon"]; className?: string }) {
  if (icon === "whatsapp") return <WhatsAppIcon className={className} />;
  const Icon = icon;
  return <Icon className={className} />;
}

function NodeCard({ node, className, style }: { node: Node; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-navy-900/95 px-3 py-3 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.6)]",
        node.highlight ? "border-brand-violet/60 ring-4 ring-brand-violet/10" : "border-white/10",
        className,
      )}
    >
      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", node.tint)}>
        <NodeIcon icon={node.icon} className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold text-white">{node.title}</span>
        <span className="block truncate text-[11px] text-white/50">{node.subtitle}</span>
      </span>
    </div>
  );
}

/** Ilustração de um fluxo de automação, no estilo de um editor de workflows. */
export default function WorkflowMockup() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900/70 shadow-[0_40px_120px_-30px_rgb(45_75_166/0.7)] backdrop-blur">
        {/* barra da janela */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <span className="text-xs font-medium text-white/60">Fluxo · Atendimento automático</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Ativo
          </span>
        </div>

        {/* canvas desktop */}
        <div
          className="relative hidden lg:block"
          style={{ backgroundImage: "radial-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        >
          <div className="relative mx-auto aspect-[1000/440] w-full max-w-[1100px]">
            <svg viewBox="0 0 1000 440" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="wf-edge" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#3fa9f5" />
                  <stop offset="0.5" stopColor="#8b8ff5" />
                  <stop offset="1" stopColor="#ff7a30" />
                </linearGradient>
              </defs>
              {EDGES.map((d) => (
                <g key={d}>
                  <path d={d} stroke="rgb(255 255 255 / 0.08)" strokeWidth="6" strokeLinecap="round" />
                  <path d={d} stroke="url(#wf-edge)" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" className="animate-dash" />
                </g>
              ))}
            </svg>
            {NODES.map((n) => (
              <NodeCard
                key={n.key}
                node={n}
                className="absolute"
                style={{
                  left: `${n.x / 10}%`,
                  top: `${(n.y / 440) * 100}%`,
                  width: `${W / 10}%`,
                  height: `${(H / 440) * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* versão empilhada (mobile/tablet) */}
        <ol className="relative space-y-3 p-4 sm:p-6 lg:hidden">
          <span className="absolute bottom-10 left-[2.875rem] top-10 w-px bg-gradient-to-b from-brand-blue via-brand-violet to-brand-orange opacity-60 sm:left-[3.375rem]" aria-hidden="true" />
          {NODES.map((n) => (
            <li key={n.key} className="relative">
              <NodeCard node={n} />
            </li>
          ))}
        </ol>
      </div>

      {/* cartão flutuante */}
      <div className="absolute -bottom-6 right-4 hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex lg:right-10">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
        <span>
          <span className="block text-sm font-semibold text-navy-900">Lead qualificado</span>
          <span className="block text-xs text-slate-500">Enviado ao CRM e ao time comercial</span>
        </span>
      </div>
    </div>
  );
}
