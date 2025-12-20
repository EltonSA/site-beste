import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import CTA from "@/components/site/CTA";
import Badge from "@/components/site/Badge";
import {
  Zap,
  Bot,
  Globe,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Automação e Integrações",
    description: "Automatize processos manuais e conecte sistemas com workflows inteligentes",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    items: [
      "n8n / Make / Zapier",
      "Bitrix24, CRM e pipelines",
      "WhatsApp, e-mail, formulários e rotinas",
      "Integrações com bancos de dados e APIs",
      "Automação de tarefas repetitivas",
      "Sincronização de dados entre sistemas",
    ],
    benefits: [
      "Redução de 70% no tempo operacional",
      "Eliminação de erros manuais",
      "Escalabilidade automática",
    ],
  },
  {
    title: "IA para Atendimento e Operação",
    description: "Chatbots inteligentes e agentes que atendem e operam 24/7",
    icon: Bot,
    color: "from-purple-500 to-pink-500",
    items: [
      "Chatbots com base de conhecimento (RAG)",
      "Agentes para triagem e classificação",
      "Respostas com anexos (PDF, GIF, docs)",
      "Monitoramento e melhoria por métricas",
      "Integração com WhatsApp e outros canais",
      "Análise de sentimento e priorização",
    ],
    benefits: [
      "Atendimento 24/7 sem custos adicionais",
      "Resposta instantânea para clientes",
      "Redução de 60% na carga de trabalho",
    ],
  },
  {
    title: "Sites e Landing Pages",
    description: "Sites modernos, rápidos e otimizados para conversão",
    icon: Globe,
    color: "from-indigo-500 to-blue-500",
    items: [
      "Next.js + SEO + performance",
      "Design minimalista e tech premium",
      "Integração com CRM e automação de leads",
      "Páginas por oferta e teste A/B",
      "Mobile-first e responsivo",
      "Analytics e rastreamento avançado",
    ],
    benefits: [
      "Tempo de carregamento < 1s",
      "Taxa de conversão otimizada",
      "SEO otimizado para Google",
    ],
  },
  {
    title: "Micro-SaaS / MVP",
    description: "Produtos digitais completos, do zero ao mercado em semanas",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    items: [
      "Login, permissões, painel admin",
      "Assinaturas e cobrança (Stripe)",
      "Banco de dados (Postgres/Supabase)",
      "Deploy + observabilidade",
      "API REST completa",
      "Dashboard de métricas e analytics",
    ],
    benefits: [
      "MVP em 2-4 semanas",
      "Pronto para vender desde o dia 1",
      "Escalável e manutenível",
    ],
  },
];

export default function ServicosPage() {
  return (
    <>
      <Section className="pt-16 md:pt-10 pb-16 md:pb-20">
        <Container>
          <div className="space-y-6 mb-16">
            <Badge>Serviços</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900">
              O que a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Beste Web
              </span>{" "}
              entrega
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-zinc-600 max-w-3xl">
              Escolha um serviço ou montamos uma solução sob medida para o seu negócio. Foco em resultado e velocidade.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-3xl glass border border-white/30 p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradiente de fundo */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  {/* Header */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2">{service.title}</h2>
                    <p className="text-zinc-600 leading-relaxed">{service.description}</p>
                  </div>

                  {/* Itens */}
                  <div className="relative z-10 mb-6">
                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 text-green-600 mt-0.5 flex-shrink-0`} />
                          <span className="text-zinc-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefícios */}
                  <div className="relative z-10 p-5 rounded-2xl bg-zinc-50 border-2 border-zinc-200">
                    <div className="text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      Benefícios principais:
                    </div>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm font-medium text-zinc-800 flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 flex-shrink-0 text-orange-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seção de Processo */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <Badge>Como Funciona</Badge>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 mt-4 mb-4">
                Processo{" "}
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  simplificado
                </span>
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Do diagnóstico à entrega, trabalhamos de forma ágil e transparente.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-4 mt-12">
              {[
                {
                  step: "01",
                  title: "Diagnóstico",
                  description: "Analisamos seu processo e identificamos oportunidades de automação.",
                },
                {
                  step: "02",
                  title: "Proposta",
                  description: "Apresentamos um plano claro com escopo, prazos e investimento.",
                },
                {
                  step: "03",
                  title: "Implementação",
                  description: "Desenvolvemos e entregamos a solução em sprints rápidos.",
                },
                {
                  step: "04",
                  title: "Otimização",
                  description: "Acompanhamos métricas e melhoramos continuamente.",
                },
              ].map((phase, index) => (
                <div
                  key={phase.step}
                  className="group relative overflow-hidden rounded-2xl glass border border-white/30 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fadeInUp"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-3">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{phase.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 glass rounded-3xl p-10 lg:p-14 shadow-2xl border border-white/20">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-4">
                Pronto para{" "}
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  automatizar
                </span>{" "}
                seu negócio?
              </h2>
              <p className="text-lg text-zinc-600 mb-8">
                Agende um diagnóstico gratuito e descubra como podemos transformar seus processos.
              </p>
              <Link
                href="/contato"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:shadow-3xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                Agendar diagnóstico
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}

