"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  Bot,
  Workflow,
  Cog,
  Globe,
  Rocket,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import LogoMark from "./LogoMark";
import { buttonClasses, WhatsAppIcon } from "@/components/ui/Button";
import { SITE, WHATSAPP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/* ------------------------------------------------------------------ opções */

const GOALS: { id: string; title: string; text: string; icon: LucideIcon }[] = [
  { id: "Automação de WhatsApp", title: "Automação de WhatsApp", text: "Atendimento, menus, agenda e follow-up", icon: MessageCircle },
  { id: "Agente de IA", title: "Agente de IA", text: "Assistente que entende e responde como gente", icon: Bot },
  { id: "Integrações e CRM", title: "Integrações e CRM", text: "Conectar sistemas e acabar com retrabalho", icon: Workflow },
  { id: "Processos internos", title: "Processos internos", text: "Relatórios, cobranças e rotinas no automático", icon: Cog },
  { id: "Site ou landing page", title: "Site ou landing page", text: "Página rápida, integrada às automações", icon: Globe },
  { id: "Sistema / Micro-SaaS", title: "Sistema / Micro-SaaS", text: "Plataforma própria com login e painel", icon: Rocket },
  { id: "Ainda não sei", title: "Ainda não sei", text: "Quero orientação sobre o que automatizar", icon: HelpCircle },
];

const SEGMENTS = ["Saúde", "Jurídico", "Contabilidade", "E-commerce", "Imobiliária", "Educação", "Serviços", "Indústria", "Outro"];
const TEAM_SIZES = ["Só eu", "2 a 10", "11 a 50", "Mais de 50"];
const VOLUMES = ["Até 100", "100 a 500", "500 a 2.000", "Mais de 2.000"];
const TOOLS = ["WhatsApp", "Instagram", "Planilhas", "CRM", "ERP", "E-mail", "Nenhuma ainda"];
const TIMELINES = ["O quanto antes", "Em até 30 dias", "Em 1 a 3 meses", "Só pesquisando"];

const STEPS = [
  { key: "objetivo", label: "Objetivo", hint: "O que automatizar" },
  { key: "empresa", label: "Sua empresa", hint: "Segmento e porte" },
  { key: "cenario", label: "Cenário atual", hint: "Como funciona hoje" },
  { key: "contato", label: "Contato", hint: "Para onde enviar" },
] as const;

/* ------------------------------------------------------------------ helpers */

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function track(event: string, data: Record<string, unknown> = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...data });
  } catch {
    /* sem GTM, sem problema */
  }
}

/* ------------------------------------------------------------------ UI básicos */

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
        selected
          ? "bg-navy-900 text-white shadow-[0_6px_16px_-8px_rgb(8_19_58/0.7)]"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-300 hover:text-navy-900",
      )}
    >
      {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      {children}
    </button>
  );
}

function FieldGroup({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-navy-900">
        {label} {optional && <span className="font-normal text-slate-400">(opcional)</span>}
      </legend>
      {children}
    </fieldset>
  );
}

const input =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[0.95rem] text-navy-900 placeholder:text-slate-400 transition-colors focus:border-royal-500 focus:outline-none focus:ring-4 focus:ring-royal-500/10";

/* ------------------------------------------------------------------ componente */

export default function ContactWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [goals, setGoals] = useState<string[]>([]);
  const [segment, setSegment] = useState("");
  const [team, setTeam] = useState("");
  const [volume, setVolume] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);

  useEffect(() => {
    if (!interacted.current) return;
    headingRef.current?.focus({ preventScroll: true });
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const toggle = (list: string[], set: (v: string[]) => void, value: string, exclusive?: string) => {
    if (list.includes(value)) return set(list.filter((v) => v !== value));
    if (exclusive && value === exclusive) return set([value]);
    set([...list.filter((v) => v !== exclusive), value]);
  };

  function validate(s: number): string | null {
    if (s === 0 && goals.length === 0) return "Selecione pelo menos uma opção para continuar.";
    if (s === 1 && !segment) return "Selecione o segmento da sua empresa.";
    if (s === 1 && !team) return "Selecione o tamanho da sua equipe.";
    if (s === 2 && description.trim().length < 10) return "Conte em poucas palavras como funciona hoje (mínimo 10 caracteres).";
    if (s === 3) {
      if (name.trim().length < 2) return "Informe seu nome.";
      if (!isEmail(email)) return "Informe um e-mail válido.";
      if (phone.replace(/\D/g, "").length < 10) return "Informe um WhatsApp válido com DDD.";
    }
    return null;
  }

  function goTo(next: number) {
    interacted.current = true;
    setError(null);
    setStep(next);
  }

  function handleNext() {
    const err = validate(step);
    if (err) return setError(err);
    track("contact_step", { step_number: step + 1, step_name: STEPS[step].key });
    if (step < STEPS.length - 1) goTo(step + 1);
    else void submit();
  }

  async function submit() {
    setSubmitting(true);
    setError(null);

    const summary = [
      `Objetivo: ${goals.join(", ")}`,
      `Segmento: ${segment}`,
      `Equipe: ${team}`,
      volume ? `Atendimentos/mês: ${volume}` : "",
      tools.length > 0 ? `Ferramentas atuais: ${tools.join(", ")}` : "",
      timeline ? `Prazo: ${timeline}` : "",
      company.trim() ? `Empresa: ${company.trim()}` : "",
    ].filter(Boolean);
    const message = `${summary.join("\n")}\n\nComo funciona hoje:\n${description.trim()}`;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: company.trim() ? `${name.trim()} (${company.trim()})` : name.trim(),
          email: email.trim(),
          phone,
          service: goals.join(", "),
          message,
        }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        track("generate_lead", { service: goals.join(", "), segment });
        router.push("/contato?ok=1");
        router.refresh();
      } else {
        setError(result.message || "Não foi possível enviar. Tente novamente.");
      }
    } catch {
      setError("Não foi possível enviar. Verifique sua conexão e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100;
  const last = step === STEPS.length - 1;

  return (
    <div
      ref={cardRef}
      className="scroll-mt-24 grid overflow-clip rounded-[2rem] bg-white shadow-[0_40px_90px_-40px_rgb(8_19_58/0.45)] ring-1 ring-slate-200 lg:grid-cols-[320px_1fr]"
    >
      {/* ---------------- lateral (desktop) */}
      <aside className="relative hidden overflow-hidden bg-navy-950 p-8 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-royal-600/50 blur-[90px]" aria-hidden="true" />
        <div className="relative flex flex-1 flex-col">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <LogoMark className="h-4 w-auto" />
            </span>
            <div>
              <div className="text-sm font-semibold">Diagnóstico gratuito</div>
              <div className="flex items-center gap-1 text-xs text-white/55">
                <Clock className="h-3 w-3" /> Cerca de 2 minutos
              </div>
            </div>
          </div>

          <ol className="mt-10 space-y-1">
            {STEPS.map((s, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    disabled={i > step}
                    onClick={() => goTo(i)}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors",
                      current && "bg-white/[0.07]",
                      done && "hover:bg-white/5",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                        done && "bg-brand-blue text-navy-950",
                        current && "bg-white text-navy-950",
                        !done && !current && "border border-white/20 text-white/40",
                      )}
                    >
                      {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                    </span>
                    <span>
                      <span className={cn("block text-sm font-semibold", !done && !current && "text-white/45")}>{s.label}</span>
                      <span className="block text-xs text-white/45">{s.hint}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm font-semibold">Prefere conversar agora?</div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-2 flex items-center gap-2 break-all text-sm text-white/75 hover:text-white">
              <Mail className="h-4 w-4 shrink-0" />
              {SITE.email}
            </a>
          </div>
        </div>
      </aside>

      {/* ---------------- conteúdo */}
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
        className="flex min-h-[560px] flex-col"
      >
        <div className="h-1 bg-slate-100">
          <div className="h-full bg-gradient-brand transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 p-6 sm:p-10">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            <span>
              Passo {step + 1} de {STEPS.length}
            </span>
            <span className="lg:hidden">{STEPS[step].label}</span>
          </div>

          <div key={step} className="animate-fade-up [animation-duration:0.45s]">
            {step === 0 && (
              <>
                <StepTitle refEl={headingRef} title="O que você quer automatizar?" text="Pode escolher mais de uma opção." />
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {GOALS.map((g) => {
                    const Icon = g.icon;
                    const selected = goals.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggle(goals, setGoals, g.id, "Ainda não sei")}
                        className={cn(
                          "relative flex items-start gap-4 rounded-2xl p-4 text-left transition-all",
                          selected
                            ? "bg-royal-50 ring-2 ring-royal-600"
                            : "bg-white ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-sm",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                            selected ? "bg-royal-600 text-white" : "bg-slate-100 text-slate-600",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 pr-6">
                          <span className="block font-semibold text-navy-900">{g.title}</span>
                          <span className="mt-0.5 block text-sm leading-snug text-slate-500">{g.text}</span>
                        </span>
                        <span
                          className={cn(
                            "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
                            selected ? "border-royal-600 bg-royal-600 text-white" : "border-slate-300 bg-white",
                          )}
                        >
                          {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <StepTitle refEl={headingRef} title="Conte um pouco sobre sua empresa" text="Assim adaptamos a recomendação à realidade do seu negócio." />
                <div className="mt-8 space-y-8">
                  <FieldGroup label="Segmento">
                    <div className="flex flex-wrap gap-2">
                      {SEGMENTS.map((s) => (
                        <Chip key={s} selected={segment === s} onClick={() => setSegment(s)}>
                          {s}
                        </Chip>
                      ))}
                    </div>
                  </FieldGroup>
                  <FieldGroup label="Tamanho da equipe">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {TEAM_SIZES.map((s) => (
                        <Chip key={s} selected={team === s} onClick={() => setTeam(s)}>
                          {s}
                        </Chip>
                      ))}
                    </div>
                  </FieldGroup>
                  <FieldGroup label="Atendimentos ou conversas por mês" optional>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {VOLUMES.map((s) => (
                        <Chip key={s} selected={volume === s} onClick={() => setVolume(volume === s ? "" : s)}>
                          {s}
                        </Chip>
                      ))}
                    </div>
                  </FieldGroup>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <StepTitle refEl={headingRef} title="Como funciona hoje?" text="Descreva o processo que você quer melhorar. Quanto mais contexto, melhor o diagnóstico." />
                <div className="mt-8 space-y-8">
                  <div>
                    <label htmlFor="wz-desc" className="mb-3 block text-sm font-semibold text-navy-900">
                      Processo atual
                    </label>
                    <textarea
                      id="wz-desc"
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Ex.: Recebemos cerca de 80 mensagens por dia no WhatsApp e duas pessoas respondem manualmente. Muitos orçamentos ficam sem retorno…"
                      className={cn(input, "resize-none")}
                    />
                    <div className="mt-1.5 text-right text-xs text-slate-400">{description.trim().length} caracteres</div>
                  </div>
                  <FieldGroup label="Ferramentas que você já usa" optional>
                    <div className="flex flex-wrap gap-2">
                      {TOOLS.map((t) => (
                        <Chip key={t} selected={tools.includes(t)} onClick={() => toggle(tools, setTools, t, "Nenhuma ainda")}>
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </FieldGroup>
                  <FieldGroup label="Quando você gostaria de começar?" optional>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {TIMELINES.map((t) => (
                        <Chip key={t} selected={timeline === t} onClick={() => setTimeline(timeline === t ? "" : t)}>
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </FieldGroup>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <StepTitle refEl={headingRef} title="Para onde enviamos seu diagnóstico?" text="Um especialista vai analisar suas respostas e falar com você." />
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="wz-name" className="mb-1.5 block text-sm font-semibold text-navy-900">
                      Seu nome
                    </label>
                    <input id="wz-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Como podemos te chamar?" className={input} />
                  </div>
                  <div>
                    <label htmlFor="wz-company" className="mb-1.5 block text-sm font-semibold text-navy-900">
                      Empresa <span className="font-normal text-slate-400">(opcional)</span>
                    </label>
                    <input id="wz-company" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nome da empresa" className={input} />
                  </div>
                  <div>
                    <label htmlFor="wz-email" className="mb-1.5 block text-sm font-semibold text-navy-900">
                      E-mail
                    </label>
                    <input id="wz-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@empresa.com" className={input} />
                  </div>
                  <div>
                    <label htmlFor="wz-phone" className="mb-1.5 block text-sm font-semibold text-navy-900">
                      WhatsApp
                    </label>
                    <input
                      id="wz-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder="(41) 99999-9999"
                      className={input}
                    />
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/70">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Resumo</div>
                  <dl className="mt-3 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-[auto_1fr]">
                    {[
                      ["Objetivo", goals.join(", "), 0],
                      ["Empresa", [segment, team && `equipe ${team.toLowerCase()}`, volume && `${volume} atend./mês`].filter(Boolean).join(" · "), 1],
                      ["Prazo", timeline || "Não informado", 2],
                    ].map(([k, v, target]) => (
                      <div key={k as string} className="contents">
                        <dt className="font-medium text-slate-500">{k}</dt>
                        <dd className="flex items-start justify-between gap-3 text-navy-900">
                          <span>{v}</span>
                          <button type="button" onClick={() => goTo(target as number)} className="shrink-0 text-xs font-semibold text-royal-600 hover:underline">
                            Editar
                          </button>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </>
            )}
          </div>

          {error && (
            <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-between gap-3 border-t border-slate-200/80 bg-white/90 px-6 py-4 backdrop-blur-md sm:px-10">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className={buttonClasses("outline", "md")}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          ) : (
            <span className="hidden items-center gap-1.5 text-xs text-slate-500 sm:inline-flex">
              <Lock className="h-3.5 w-3.5" />
              Seus dados ficam só com a gente
            </span>
          )}
          <button type="submit" disabled={submitting} className={buttonClasses("dark", "lg", "ml-auto")}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando…
              </>
            ) : last ? (
              <>
                Enviar e receber diagnóstico
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function StepTitle({
  title,
  text,
  refEl,
}: {
  title: string;
  text: string;
  refEl: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="mt-3">
      <h2 ref={refEl} tabIndex={-1} className="text-2xl font-extrabold leading-tight text-navy-900 outline-none sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-slate-600">{text}</p>
    </div>
  );
}
