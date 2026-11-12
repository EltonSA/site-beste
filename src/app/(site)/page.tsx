import Link from "next/link";
import { ArrowRight, Check, Flame, Database, CalendarCheck } from "lucide-react";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import SectionHeading from "@/components/site/SectionHeading";
import Badge from "@/components/site/Badge";
import CTA from "@/components/site/CTA";
import FAQ from "@/components/site/FAQ";
import CaseCard from "@/components/site/CaseCard";
import PhoneChat from "@/components/site/PhoneChat";
import UseCaseTabs from "@/components/site/UseCaseTabs";
import WorkflowMockup from "@/components/site/WorkflowMockup";
import IntegrationsMarquee from "@/components/site/IntegrationsMarquee";
import TeamSection from "@/components/site/TeamSection";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";
import { SERVICES, EXTRA_SERVICES, PROCESS, FAQ as FAQ_ITEMS } from "@/content/services";
import { TEMPLATES, type ChatLine } from "@/content/automations";
import { CASES } from "@/content/cases";
import { WHATSAPP_URL } from "@/lib/site";

const HERO_SCRIPT: ChatLine[] = [
  { from: "user", text: "Oi! Vi o anúncio de vocês 👀" },
  {
    from: "bot",
    text: "Olá! 👋 Que bom ter você aqui. Como posso ajudar?",
    options: ["Conhecer os planos", "Agendar uma visita", "Falar com alguém"],
  },
  { from: "user", text: "Agendar uma visita" },
  { from: "bot", text: "Ótimo! Tenho estes horários amanhã:", options: ["10:00", "14:30"] },
  { from: "user", text: "14:30" },
  { from: "bot", text: "Prontinho! Visita marcada para amanhã às 14:30 ✅ Te envio um lembrete antes." },
];

const STATS = [
  { value: "+100", label: "fluxos e integrações entregues" },
  { value: "24/7", label: "atendimento sem pausa" },
  { value: "1–2 sem.", label: "para colocar no ar" },
];

function FloatingChip({
  icon: Icon,
  title,
  text,
  tint,
  className,
}: {
  icon: typeof Flame;
  title: string;
  text: string;
  tint: string;
  className: string;
}) {
  return (
    <div
      className={`absolute hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-15px_rgb(8_19_58/0.35)] ring-1 ring-slate-200 sm:flex ${className}`}
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tint}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-bold text-navy-900">{title}</span>
        <span className="block text-xs text-slate-500">{text}</span>
      </span>
    </div>
  );
}

export default function HomePage() {
  const featuredCases = CASES.filter((c) => [2, 4, 1].includes(c.id));

  return (
    <>
      {/* ============================== HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-royal-50 via-white to-white pt-28 sm:pt-36">
        <div className="absolute inset-0 bg-dots-light mask-fade-b" aria-hidden="true" />
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-brand-blue/20 blur-[120px]" aria-hidden="true" />
        <div className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-brand-orange/15 blur-[120px]" aria-hidden="true" />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
            <div className="animate-fade-up text-center lg:text-left">
              <Badge>Automação para WhatsApp, IA e CRM</Badge>
              <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] text-navy-900 sm:text-6xl lg:text-[4.25rem] text-balance">
                Seu WhatsApp <span className="hl">vendendo e atendendo</span> no automático.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl lg:mx-0">
                Criamos automações e agentes de IA que respondem clientes, qualificam leads, agendam horários e
                alimentam seu CRM — 24 horas por dia, sem aumentar a equipe.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink href="/contato" variant="dark" size="lg">
                  Quero automatizar meu negócio
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="#exemplos" variant="outline" size="lg">
                  Ver exemplos
                </ButtonLink>
              </div>
              <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600 lg:justify-start">
                {["Diagnóstico gratuito", "No ar em 1–2 semanas", "API oficial do WhatsApp"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto flex w-full max-w-[520px] justify-center pb-6 animate-fade-up [animation-delay:150ms]">
              <div className="absolute inset-x-8 bottom-0 top-16 rounded-[3rem] bg-gradient-to-br from-brand-blue/25 via-brand-violet/15 to-brand-orange/25" aria-hidden="true" />
              <PhoneChat script={HERO_SCRIPT} subtitle="online agora" />
              <FloatingChip icon={Flame} title="Lead quente" text="Etiqueta aplicada" tint="bg-orange-100 text-orange-600" className="-left-2 top-32" />
              <FloatingChip icon={Database} title="CRM atualizado" text="Novo negócio criado" tint="bg-sky-100 text-sky-700" className="right-0 top-[45%]" />
              <FloatingChip icon={CalendarCheck} title="Visita agendada" text="Amanhã, 14:30" tint="bg-emerald-100 text-emerald-700" className="-bottom-5 left-0" />
            </div>
          </div>

          <div className="pb-14 pt-16 sm:pt-20">
            <IntegrationsMarquee tone="light" title="Automatizamos nos canais e ferramentas que você já usa" />
          </div>
        </Container>
      </section>

      {/* ============================== CASOS DE USO */}
      <Section id="exemplos" className="scroll-mt-16 bg-slate-50">
        <Container>
          <SectionHeading
            eyebrow="O que dá pra automatizar"
            title={
              <>
                Uma automação para cada etapa da <span className="hl">jornada do cliente</span>
              </>
            }
            description="Do primeiro “oi” ao pós-venda. Escolha um exemplo e veja como funciona na prática."
          />
          <div className="mt-12">
            <UseCaseTabs />
          </div>
        </Container>
      </Section>

      {/* ============================== POR DENTRO */}
      <Section className="bg-white">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-5 py-14 sm:px-10 sm:py-20 lg:px-16">
            <div className="absolute inset-0 bg-grid-dark mask-fade-b" aria-hidden="true" />
            <div className="absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-royal-600/45 blur-[120px]" aria-hidden="true" />
            <div className="relative">
              <SectionHeading
                tone="dark"
                eyebrow="Por dentro da automação"
                title={
                  <>
                    Por trás de cada conversa, um fluxo <span className="text-gradient-brand">conectado aos seus sistemas</span>
                  </>
                }
                description="A mensagem chega, a IA entende, o CRM é atualizado, a agenda é reservada e seu time é avisado. Tudo em segundos."
              />
              <div className="mx-auto mt-14 max-w-5xl">
                <WorkflowMockup />
              </div>
              <div className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-4 text-center">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-extrabold text-white sm:text-5xl">{s.value}</div>
                    <div className="mt-2 text-xs text-white/55 sm:text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================== MODELOS POR SEGMENTO */}
      <Section className="bg-white pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Modelos prontos"
              title="Automações que já funcionam no seu segmento"
              description="Partimos de fluxos testados e adaptamos ao jeito que sua empresa trabalha."
            />
            <ButtonLink href="/contato" variant="outline" className="shrink-0">
              Não achou o seu? Fale com a gente
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.title}
                  href="/contato"
                  className="group flex flex-col rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgb(8_19_58/0.3)] hover:ring-slate-300"
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${t.tint}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.segment}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold leading-snug text-navy-900">{t.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{t.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-7">
                    <div className="flex gap-1.5">
                      {t.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-white transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ============================== SOLUÇÕES */}
      <Section className="bg-slate-50">
        <Container>
          <SectionHeading
            eyebrow="Soluções"
            title="Tudo o que sua operação precisa para rodar sozinha"
            description="Do atendimento ao back-office, cuidamos da automação de ponta a ponta."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.id}
                  href={`/servicos#${s.id}`}
                  className="group flex flex-col rounded-3xl bg-white p-7 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgb(8_19_58/0.3)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-600 text-white shadow-[0_8px_20px_-8px_rgb(45_75_166/0.7)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.short}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-royal-600">
                    Saiba mais
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 rounded-3xl border border-dashed border-slate-300 p-6 sm:p-7 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-8">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Também fazemos</div>
            {EXTRA_SERVICES.map((e) => {
              const Icon = e.icon;
              return (
                <Link key={e.id} href={`/servicos#${e.id}`} className="group flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-royal-600 ring-1 ring-slate-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="flex items-center gap-1 font-semibold text-navy-900 group-hover:text-royal-600">
                      {e.title}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="block text-sm text-slate-600">{e.short}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ============================== PROCESSO */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Como funciona"
            title="Da conversa inicial à automação rodando"
            description="Você aprova cada fluxo antes de ir ao ar e acompanha os resultados depois."
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.step} className="relative rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200/70">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl font-display text-base font-extrabold ${
                    ["bg-sky-100 text-sky-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-700", "bg-orange-100 text-orange-700"][i]
                  }`}
                >
                  {p.step}
                </span>
                <h3 className="mt-6 text-lg font-bold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============================== CASES */}
      <Section className="bg-slate-50">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Cases"
              title="Automação que vira resultado"
              description="Projetos em que atendimento, agenda e CRM passaram a rodar no automático."
            />
            <ButtonLink href="/cases" variant="outline" className="shrink-0">
              Ver todos os cases
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredCases.map((c) => (
              <CaseCard key={c.id} item={c} compact />
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================== TIME */}
      <TeamSection />

      {/* ============================== FAQ */}
      <Section className="bg-slate-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Perguntas frequentes"
                title="Tire suas dúvidas sobre automação"
                description="Não encontrou o que procurava? Fale direto com a gente."
              />
              <div className="mt-8">
                <ButtonLink href={WHATSAPP_URL} external variant="outline">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  Perguntar no WhatsApp
                </ButtonLink>
              </div>
            </div>
            <FAQ items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
