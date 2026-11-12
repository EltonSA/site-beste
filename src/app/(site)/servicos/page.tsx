import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import SectionHeading from "@/components/site/SectionHeading";
import PageHero from "@/components/site/PageHero";
import CTA from "@/components/site/CTA";
import FAQ from "@/components/site/FAQ";
import { ButtonLink } from "@/components/ui/Button";
import { SERVICES, EXTRA_SERVICES, PROCESS, FAQ as FAQ_ITEMS } from "@/content/services";

export const metadata: Metadata = {
  title: "Soluções de automação",
  description:
    "Automação de WhatsApp, agentes de IA, integrações com CRM e automação de processos internos. Conheça as soluções da Beste Web.",
};

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="Soluções"
        title={
          <>
            Automação de ponta a ponta para <span className="hl">vender e atender mais</span>
          </>
        }
        description="Do primeiro contato no WhatsApp ao relatório no fim do mês: automatizamos cada etapa da sua operação, integrada às ferramentas que você já usa."
      >
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition-colors hover:text-navy-900 hover:ring-slate-300"
              >
                <Icon className="h-4 w-4 text-royal-600" />
                {s.title}
              </a>
            );
          })}
        </div>
      </PageHero>

      <Section className="bg-white pt-4 sm:pt-6 lg:pt-8">
        <Container>
          <div className="space-y-6">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.id}
                  id={s.id}
                  className="grid scroll-mt-28 gap-10 rounded-[2rem] bg-slate-50 p-7 ring-1 ring-slate-200/70 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:p-12"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-600 text-white shadow-[0_8px_20px_-8px_rgb(45_75_166/0.7)]">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-sm font-bold text-slate-400">0{i + 1}</span>
                    </div>
                    <h2 className="mt-6 text-2xl font-extrabold text-navy-900 sm:text-3xl">{s.title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">{s.description}</p>

                    <div className="mt-8 rounded-2xl bg-navy-950 p-6 text-white">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                        <TrendingUp className="h-4 w-4 text-brand-blue" />
                        O que você ganha
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {s.benefits.map((b) => (
                          <li key={b} className="flex items-center gap-2.5 text-sm font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">O que entregamos</div>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-royal-500" />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 lg:mt-auto lg:pt-8">
                      <ButtonLink href="/contato" variant="dark">
                        Quero essa automação
                        <ArrowRight className="h-4 w-4" />
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Também fazemos</div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {EXTRA_SERVICES.map((e) => {
                const Icon = e.icon;
                return (
                  <div key={e.id} id={e.id} className="flex scroll-mt-28 items-start gap-5 rounded-3xl p-7 ring-1 ring-slate-200">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-royal-50 text-royal-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-navy-900">{e.title}</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{e.short}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeading
            eyebrow="Como funciona"
            title="Processo simples e transparente"
            description="Você aprova cada fluxo antes de ir ao ar e acompanha os resultados depois."
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <li key={p.step} className="rounded-3xl bg-white p-7 ring-1 ring-slate-200">
                <span className="font-display text-3xl font-extrabold text-gradient-brand-light">{p.step}</span>
                <h3 className="mt-4 text-lg font-bold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <SectionHeading align="left" eyebrow="Perguntas frequentes" title="Antes de começar" />
            <FAQ items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
