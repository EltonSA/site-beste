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

/* ------------------------------------------------------------------ perguntas */

type Option = { value: string; text?: string; icon?: LucideIcon };
type ChoiceKey = "goal" | "segment" | "team" | "volume" | "timeline";

type Question =
  | { key: ChoiceKey; stage: number; title: string; text: string; type: "choice"; options: Option[]; cards?: boolean }
  | { key: "description"; stage: number; title: string; text: string; type: "text" }
  | { key: "contact"; stage: number; title: string; text: string; type: "contact" };

const QUESTIONS: Question[] = [
  {
    key: "goal",
    stage: 0,
    type: "choice",
    cards: true,
    title: "O que você quer automatizar?",
    text: "Escolha a opção principal. Os detalhes a gente vê no diagnóstico.",
    options: [
      { value: "Automação de WhatsApp", text: "Atendimento, menus, agenda e follow-up", icon: MessageCircle },
      { value: "Agente de IA", text: "Assistente que entende e responde como gente", icon: Bot },
      { value: "Integrações e CRM", text: "Conectar sistemas e acabar com retrabalho", icon: Workflow },
      { value: "Processos internos", text: "Relatórios, cobranças e rotinas no automático", icon: Cog },
      { value: "Site ou landing page", text: "Página rápida, integrada às automações", icon: Globe },
      { value: "Sistema / Micro-SaaS", text: "Plataforma própria com login e painel", icon: Rocket },
      { value: "Ainda não sei", text: "Quero orientação sobre o que automatizar", icon: HelpCircle },
    ],
  },
  {
    key: "segment",
    stage: 1,
    type: "choice",
    title: "Qual é o segmento da sua empresa?",
    text: "Assim adaptamos a recomendação à realidade do seu negócio.",
    options: ["Saúde", "Jurídico", "Contabilidade", "E-commerce", "Imobiliária", "Educação", "Serviços", "Indústria", "Outro"].map((value) => ({ value })),
  },
  {
    key: "team",
    stage: 1,
    type: "choice",
    title: "Qual o tamanho da sua equipe?",
    text: "Contando todas as pessoas da empresa.",
    options: ["Só eu", "2 a 10 pessoas", "11 a 50 pessoas", "Mais de 50 pessoas"].map((value) => ({ value })),
  },
  {
    key: "volume",
    stage: 1,
    type: "choice",
    title: "Quantos atendimentos ou conversas vocês têm por mês?",
    text: "Uma estimativa já ajuda.",
    options: ["Até 100", "100 a 500", "500 a 2.000", "Mais de 2.000", "Não sei informar"].map((value) => ({ value })),
  },
  {
    key: "timeline",
    stage: 2,
    type: "choice",
    title: "Quando você gostaria de começar?",
    text: "Isso nos ajuda a planejar o melhor caminho para você.",
    options: ["O quanto antes", "Em até 30 dias", "Em 1 a 3 meses", "Só pesquisando por enquanto"].map((value) => ({ value })),
  },
  {
    key: "description",
    stage: 2,
    type: "text",
    title: "Como funciona hoje?",
    text: "Conte em poucas palavras o processo que você quer melhorar. Quanto mais contexto, melhor o diagnóstico.",
  },
  {
    key: "contact",
    stage: 3,
    type: "contact",
    title: "Para onde enviamos seu diagnóstico?",
    text: "Um especialista vai analisar suas respostas e falar com você.",
  },
];

const STAGES = [
  { label: "Objetivo", hint: "O que automatizar" },
  { label: "Sua empresa", hint: "Segmento e porte" },
  { label: "Cenário atual", hint: "Prazo e processo" },
  { label: "Contato", hint: "Para onde enviar" },
];

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

const input =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[0.95rem] text-navy-900 placeholder:text-slate-400 transition-colors focus:border-royal-500 focus:outline-none focus:ring-4 focus:ring-royal-500/10";

/* ------------------------------------------------------------------ componente */

export default function ContactWizard() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  const [answers, setAnswers] = useState<Record<ChoiceKey, string>>({
    goal: "",
    segment: "",
    team: "",
    volume: "",
    timeline: "",
  });
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);

  const q = QUESTIONS[index];
  const stage = q.stage;
  const last = index === QUESTIONS.length - 1;

  useEffect(() => {
    if (!interacted.current) return;
    headingRef.current?.focus({ preventScroll: true });
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [index]);

  function goTo(next: number) {
    interacted.current = true;
    setError(null);
    setIndex(next);
  }

  function advanceFrom(i: number) {
    track("contact_step", { step_number: i + 1, step_name: QUESTIONS[i].key });
    goTo(i + 1);
  }

  /** escolha única: marca a opção e avança sozinho */
  function choose(key: ChoiceKey, value: string) {
    if (advancing) return;
    setAnswers((a) => ({ ...a, [key]: value }));
    setAdvancing(true);
    const from = index;
    setTimeout(() => {
      setAdvancing(false);
      advanceFrom(from);
    }, 280);
  }

  function validateContact(): string | null {
    if (name.trim().length < 2) return "Informe seu nome.";
    if (!isEmail(email)) return "Informe um e-mail válido.";
    if (phone.replace(/\D/g, "").length < 10) return "Informe um WhatsApp válido com DDD.";
    return null;
  }

  function handleNext() {
    if (q.type === "choice") {
      if (!answers[q.key]) return setError("Escolha uma opção para continuar.");
      return advanceFrom(index);
    }
    if (q.type === "text") return advanceFrom(index);
    const err = validateContact();
    if (err) return setError(err);
    track("contact_step", { step_number: index + 1, step_name: q.key });
    void submit();
  }

  async function submit() {
    setSubmitting(true);
    setError(null);

    const summary = [
      `Objetivo: ${answers.goal}`,
      `Segmento: ${answers.segment}`,
      `Equipe: ${answers.team}`,
      `Atendimentos/mês: ${answers.volume}`,
      `Prazo: ${answers.timeline}`,
      company.trim() ? `Empresa: ${company.trim()}` : "",
    ].filter(Boolean);
    const message = `${summary.join("\n")}\n\nComo funciona hoje:\n${description.trim() || "Não informado"}`;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: company.trim() ? `${name.trim()} (${company.trim()})` : name.trim(),
          email: email.trim(),
          phone,
          service: answers.goal,
          message,
        }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        track("generate_lead", { service: answers.goal, segment: answers.segment });
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

  const progress = ((index + 1) / QUESTIONS.length) * 100;
  const firstOfStage = (s: number) => QUESTIONS.findIndex((x) => x.stage === s);
  const idx = (key: Question["key"]) => QUESTIONS.findIndex((x) => x.key === key);
  const showNextButton = q.type !== "choice" || Boolean(answers[q.key]);

  return (
    <div
      ref={cardRef}
      className="scroll-mt-20 grid overflow-clip rounded-[2rem] bg-white shadow-[0_40px_90px_-40px_rgb(8_19_58/0.45)] ring-1 ring-slate-200 lg:grid-cols-[300px_1fr]"
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
            {STAGES.map((s, i) => {
              const done = i < stage;
              const current = i === stage;
              return (
                <li key={s.label}>
                  <button
                    type="button"
                    disabled={i > stage}
                    onClick={() => goTo(firstOfStage(i))}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors",
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
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 text-sm text-white/75 hover:text-white">
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-2 flex items-center gap-2 whitespace-nowrap text-[13px] text-white/75 hover:text-white">
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
        className="flex min-h-[520px] flex-col"
      >
        <div className="h-1 bg-slate-100">
          <div className="h-full bg-gradient-brand transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 p-6 sm:p-10">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            <span>
              Passo {stage + 1} de {STAGES.length}
            </span>
            <span>{STAGES[stage].label}</span>
          </div>

          <div key={index} className="animate-fade-up [animation-duration:0.4s]">
            <div className="mt-3">
              <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold leading-tight text-navy-900 outline-none sm:text-3xl">
                {q.title}
              </h2>
              <p className="mt-2 text-slate-600">{q.text}</p>
            </div>

            {/* ---- escolha única (avança sozinho) */}
            {q.type === "choice" && (
              <div className={cn("mt-8 grid gap-3", q.cards ? "sm:grid-cols-2" : "sm:grid-cols-2")} role="radiogroup" aria-label={q.title}>
                {q.options.map((o) => {
                  const selected = answers[q.key] === o.value;
                  const Icon = o.icon;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => choose(q.key, o.value)}
                      className={cn(
                        "group flex items-center gap-4 rounded-2xl p-4 text-left transition-all",
                        selected
                          ? "bg-royal-50 ring-2 ring-royal-600"
                          : "bg-white ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300",
                      )}
                    >
                      {Icon && (
                        <span
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                            selected ? "bg-royal-600 text-white" : "bg-slate-100 text-slate-600",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-navy-900">{o.value}</span>
                        {o.text && <span className="mt-0.5 block text-sm leading-snug text-slate-500">{o.text}</span>}
                      </span>
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                          selected ? "border-royal-600 bg-royal-600 text-white" : "border-slate-300 group-hover:border-slate-400",
                        )}
                      >
                        {selected && <Check className="h-3 w-3" strokeWidth={3.5} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ---- texto livre */}
            {q.type === "text" && (
              <div className="mt-8">
                <textarea
                  id="wz-desc"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex.: Recebemos cerca de 80 mensagens por dia no WhatsApp e duas pessoas respondem manualmente. Muitos orçamentos ficam sem retorno…"
                  aria-label={q.title}
                  className={cn(input, "resize-none")}
                />
                <p className="mt-2 text-xs text-slate-400">Opcional, mas ajuda muito no diagnóstico.</p>
              </div>
            )}

            {/* ---- contato */}
            {q.type === "contact" && (
              <>
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
                    {(
                      [
                        ["Objetivo", answers.goal, idx("goal")],
                        ["Empresa", [answers.segment, answers.team, answers.volume !== "Não sei informar" && answers.volume && `${answers.volume} atend./mês`].filter(Boolean).join(" · "), idx("segment")],
                        ["Prazo", answers.timeline, idx("timeline")],
                      ] as [string, string, number][]
                    ).map(([k, v, target]) => (
                      <div key={k} className="contents">
                        <dt className="font-medium text-slate-500">{k}</dt>
                        <dd className="flex items-start justify-between gap-3 text-navy-900">
                          <span>{v}</span>
                          <button type="button" onClick={() => goTo(target)} className="shrink-0 text-xs font-semibold text-royal-600 hover:underline">
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

        <div className="sticky bottom-0 z-10 flex min-h-[72px] items-center justify-between gap-3 border-t border-slate-200/80 bg-white/90 px-6 py-4 backdrop-blur-md sm:px-10">
          {index > 0 ? (
            <button type="button" onClick={() => goTo(index - 1)} className={buttonClasses("outline", "md")}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <Lock className="h-3.5 w-3.5" />
              Seus dados ficam só com a gente
            </span>
          )}

          {showNextButton && (
            <button type="submit" disabled={submitting || advancing} className={buttonClasses("dark", "lg", "ml-auto")}>
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
              ) : q.type === "text" && !description.trim() ? (
                <>
                  Pular
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
