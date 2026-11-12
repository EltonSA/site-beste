import type { Metadata } from "next";
import { Mail, MapPin, Clock, Check, Search, MessageSquare, FileText } from "lucide-react";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import ContactWizard from "@/components/site/ContactWizard";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";
import { SITE, WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Responda 4 passos rápidos e receba um diagnóstico gratuito de automação para WhatsApp, IA e processos da sua empresa.",
};

const NEXT_STEPS = [
  { icon: Search, title: "Análise", text: "Um especialista analisa suas respostas e o seu cenário atual." },
  { icon: MessageSquare, title: "Conversa rápida", text: "Entramos em contato pelo WhatsApp para alinhar os detalhes." },
  { icon: FileText, title: "Diagnóstico", text: "Você recebe os fluxos recomendados, com escopo, prazo e investimento." },
];

const INFO = [
  { icon: WhatsAppIcon, label: "WhatsApp", value: SITE.phoneDisplay, href: WHATSAPP_URL, external: true },
  { icon: Mail, label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Clock, label: "Atendimento", value: "Seg. a sex. 9h–18h · Sáb. 9h–13h" },
  { icon: MapPin, label: "Localização", value: "Curitiba, PR · atendemos todo o Brasil" },
];

function Success() {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_90px_-40px_rgb(8_19_58/0.45)] ring-1 ring-slate-200">
      <div className="h-1 bg-gradient-brand" />
      <div className="p-8 text-center sm:p-12">
        <span className="mx-auto flex h-16 w-16 animate-fade-up items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_12px_30px_-10px_rgb(16_185_129/0.7)]">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>
        <h2 className="mt-6 text-3xl font-extrabold text-navy-900">Recebemos suas respostas!</h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-600">
          Obrigado pelo interesse na Beste Web. Veja o que acontece a partir de agora:
        </p>

        <ol className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          {NEXT_STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/70">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Passo {i + 1}</span>
                </div>
                <div className="mt-4 font-semibold text-navy-900">{s.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={WHATSAPP_URL} external variant="whatsapp" size="lg">
            <WhatsAppIcon />
            Adiantar pelo WhatsApp
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            Voltar para o início
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default async function ContatoPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const params = await searchParams;
  const sent = params?.ok === "1";

  return (
    <>
      <Section className="bg-gradient-to-b from-royal-50 via-slate-50 to-slate-50 pt-24 sm:pt-28 lg:pt-32">
        <Container>
          <div className="mb-6 max-w-3xl sm:mb-8">
            <h1 className="text-2xl font-extrabold leading-tight text-navy-900 sm:text-4xl text-balance">
              {sent ? (
                <>
                  Seu diagnóstico <span className="hl">está a caminho</span>
                </>
              ) : (
                <>
                  Vamos desenhar a <span className="hl">sua automação</span>
                </>
              )}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-base">
              {sent
                ? "Nossa equipe já recebeu suas informações."
                : "Responda 4 passos rápidos — leva cerca de 2 minutos. Com isso, preparamos um diagnóstico com os fluxos que mais vão gerar resultado para o seu negócio."}
            </p>
          </div>

          <div className="relative">{sent ? <Success /> : <ContactWizard />}</div>

          {!sent && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {INFO.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-royal-600 ring-1 ring-slate-200">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{item.label}</span>
                      <span className="block truncate text-sm font-semibold text-navy-900">{item.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-white"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </Section>
    </>
  );
}
