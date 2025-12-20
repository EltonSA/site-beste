import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import CTA from "@/components/site/CTA";
import Badge from "@/components/site/Badge";
import { Rocket, Zap, Settings } from "lucide-react";

const phases = [
  {
    title: "MVP (2–4 semanas)",
    description: "Entrega do núcleo do produto com onboarding e métricas.",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Versão 1 (escala)",
    description: "Permissões, plano/usuários, automações e melhorias.",
    icon: Zap,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Operação",
    description: "Logs, monitoramento, suporte e evolução contínua.",
    icon: Settings,
    color: "from-purple-500 to-pink-500",
  },
];

export default function MicroSaasPage() {
  return (
    <>
      <Section className="pt-32 pb-20">
        <Container>
          <div className="space-y-6 mb-16">
            <Badge>Micro-SaaS</Badge>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900">
              MVP{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                rápido
              </span>
              , sólido e pronto pra vender
            </h1>
            <p className="text-xl leading-relaxed text-zinc-600 max-w-3xl">
              Do protótipo ao produto: autenticação, assinatura, painel, integrações e deploy.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.title}
                  className="group relative overflow-hidden rounded-3xl glass border border-white/30 p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">{phase.title}</h2>
                  <p className="text-zinc-600 leading-relaxed">{phase.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
      <CTA />
    </>
  );
}
