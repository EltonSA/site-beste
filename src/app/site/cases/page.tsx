import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import CTA from "@/components/site/CTA";
import Badge from "@/components/site/Badge";
import {
  Stethoscope,
  Scale,
  GraduationCap,
  Calculator,
  Globe,
  ShoppingBag,
  Building2,
  TrendingUp,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react";

const cases = [
  // Micro-SaaS de Atendimento
  {
    id: 1,
    type: "Micro-SaaS",
    category: "Atendimento",
    title: "AtendMed - Sistema para Clínicas",
    description: "Plataforma completa de agendamento e atendimento para clínicas médicas",
    result: "Redução de 70% no tempo de agendamento e 85% de satisfação dos pacientes",
    metrics: [
      { label: "Agendamentos/mês", value: "2.5k+" },
      { label: "Tempo médio", value: "2min" },
      { label: "Satisfação", value: "4.8/5" },
    ],
    stack: ["Next.js", "PostgreSQL", "Stripe", "WhatsApp API", "Calendly"],
    icon: Stethoscope,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Agendamento online 24/7",
      "Lembretes automáticos via WhatsApp",
      "Prontuário eletrônico integrado",
      "Pagamento online",
    ],
  },
  {
    id: 2,
    type: "Micro-SaaS",
    category: "Atendimento",
    title: "JurisAtend - Sistema para Advocacias",
    description: "Gestão de atendimento e consultas jurídicas com IA para triagem inicial",
    result: "Aumento de 60% na conversão de leads e redução de 50% no tempo de resposta",
    metrics: [
      { label: "Consultas/mês", value: "1.8k+" },
      { label: "Conversão", value: "42%" },
      { label: "Tempo resposta", value: "<5min" },
    ],
    stack: ["Next.js", "OpenAI", "PostgreSQL", "Stripe", "n8n"],
    icon: Scale,
    color: "from-orange-500 to-red-500",
    features: [
      "Chatbot com IA para triagem",
      "Agendamento de consultas",
      "Gestão de processos",
      "Cobrança automática",
    ],
  },
  {
    id: 3,
    type: "Micro-SaaS",
    category: "Atendimento",
    title: "EduConnect - Sistema para Educação",
    description: "Plataforma de atendimento e comunicação para escolas e cursos online",
    result: "Melhoria de 80% na comunicação escola-família e 65% mais matrículas",
    metrics: [
      { label: "Alunos ativos", value: "5k+" },
      { label: "Mensagens/mês", value: "12k+" },
      { label: "Taxa matrícula", value: "68%" },
    ],
    stack: ["Next.js", "Supabase", "Twilio", "Stripe", "RAG"],
    icon: GraduationCap,
    color: "from-purple-500 to-pink-500",
    features: [
      "Portal do aluno e responsável",
      "Chat em tempo real",
      "Notificações automáticas",
      "Gestão de matrículas",
    ],
  },
  {
    id: 4,
    type: "Micro-SaaS",
    category: "Atendimento",
    title: "ContaFlow - Sistema para Contabilidade",
    description: "Sistema de atendimento e gestão de clientes para escritórios contábeis",
    result: "Redução de 55% no tempo de atendimento e aumento de 40% na retenção de clientes",
    metrics: [
      { label: "Clientes ativos", value: "850+" },
      { label: "Tickets/mês", value: "3.2k" },
      { label: "Retenção", value: "94%" },
    ],
    stack: ["Next.js", "PostgreSQL", "n8n", "WhatsApp", "Stripe"],
    icon: Calculator,
    color: "from-green-500 to-emerald-500",
    features: [
      "Central de atendimento unificada",
      "Automação de processos contábeis",
      "Integração com sistemas fiscais",
      "Dashboard de métricas",
    ],
  },
  // Sites
  {
    id: 5,
    type: "Site",
    category: "Landing Page",
    title: "TechStart - Landing Page de Alta Conversão",
    description: "Landing page para startup de tecnologia com foco em conversão e performance",
    result: "Taxa de conversão de 12% e tempo de carregamento de 0.8s",
    metrics: [
      { label: "Conversão", value: "12%" },
      { label: "Tempo carregamento", value: "0.8s" },
      { label: "SEO Score", value: "98/100" },
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel Analytics"],
    icon: Globe,
    color: "from-indigo-500 to-blue-500",
    features: [
      "Design moderno e responsivo",
      "Animações suaves",
      "SEO otimizado",
      "Analytics integrado",
    ],
  },
  {
    id: 6,
    type: "Site",
    category: "E-commerce",
    title: "FashionStore - Loja Virtual Premium",
    description: "E-commerce completo para marca de moda com checkout otimizado",
    result: "Aumento de 45% nas vendas online e redução de 30% na taxa de abandono",
    metrics: [
      { label: "Vendas/mês", value: "R$ 180k" },
      { label: "Taxa conversão", value: "3.8%" },
      { label: "Abandono carrinho", value: "52%" },
    ],
    stack: ["Next.js", "Shopify", "Stripe", "PostgreSQL", "Redis"],
    icon: ShoppingBag,
    color: "from-pink-500 to-rose-500",
    features: [
      "Catálogo de produtos dinâmico",
      "Checkout otimizado",
      "Sistema de cupons",
      "Painel administrativo",
    ],
  },
  {
    id: 7,
    type: "Site",
    category: "Corporate",
    title: "CorpSite - Site Institucional Empresarial",
    description: "Site corporativo moderno com blog integrado e área de clientes",
    result: "Aumento de 200% no tráfego orgânico e 35% mais leads qualificados",
    metrics: [
      { label: "Tráfego/mês", value: "25k" },
      { label: "Leads/mês", value: "450" },
      { label: "Tempo médio", value: "4:30min" },
    ],
    stack: ["Next.js", "MDX", "PostgreSQL", "Vercel", "Google Analytics"],
    icon: Building2,
    color: "from-slate-500 to-gray-600",
    features: [
      "Blog integrado com MDX",
      "Área de clientes",
      "Formulários inteligentes",
      "Integração CRM",
    ],
  },
];

export default function CasesPage() {
  const microSaasCases = cases.filter((c) => c.type === "Micro-SaaS");
  const siteCases = cases.filter((c) => c.type === "Site");

  return (
    <>
      <Section className="pt-32 pb-20">
        <Container>
          <div className="space-y-6 mb-16">
            <Badge>Cases de Sucesso</Badge>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900">
              Resultados que{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                transformam
              </span>{" "}
              negócios
            </h1>
            <p className="text-xl leading-relaxed text-zinc-600 max-w-3xl">
              Cases reais de sistemas e sites que geraram resultados mensuráveis para nossos clientes.
            </p>
          </div>

          {/* Micro-SaaS Section */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-orange-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-zinc-900">Micro-SaaS de Atendimento</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {microSaasCases.map((c, index) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.id}
                    className="group relative overflow-hidden rounded-3xl glass border border-white/30 p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradiente de fundo */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                    {/* Header */}
                    <div className="relative z-10 flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{c.type}</span>
                          <h3 className="text-2xl font-bold text-zinc-900 mt-1">{c.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="relative z-10 text-zinc-600 mb-6">{c.description}</p>

                    {/* Resultado */}
                    <div className="relative z-10 mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-orange-50/50 border border-white/50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-zinc-900">Resultado</span>
                      </div>
                      <p className="text-sm text-zinc-700">{c.result}</p>
                    </div>

                    {/* Métricas */}
                    <div className="relative z-10 grid grid-cols-3 gap-4 mb-6">
                      {c.metrics.map((m, i) => (
                        <div key={i} className="text-center p-3 rounded-xl bg-white/50 border border-white/30">
                          <div className={`text-2xl font-extrabold bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                            {m.value}
                          </div>
                          <div className="text-xs text-zinc-600 mt-1">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="relative z-10 mb-6">
                      <div className="flex flex-wrap gap-2">
                        {c.features.map((f, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1.5 rounded-full bg-white/80 border border-white/50 text-zinc-700 font-medium"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stack */}
                    <div className="relative z-10 flex flex-wrap gap-2">
                      {c.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 font-medium border border-zinc-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sites Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-blue-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-zinc-900">Sites e Landing Pages</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {siteCases.map((c, index) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.id}
                    className="group relative overflow-hidden rounded-3xl glass border border-white/30 p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp"
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    {/* Gradiente de fundo */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                    {/* Header */}
                    <div className="relative z-10 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{c.category}</span>
                      <h3 className="text-2xl font-bold text-zinc-900 mt-2">{c.title}</h3>
                    </div>

                    <p className="relative z-10 text-zinc-600 mb-6">{c.description}</p>

                    {/* Resultado */}
                    <div className="relative z-10 mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-orange-50/50 border border-white/50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-zinc-900">Resultado</span>
                      </div>
                      <p className="text-sm text-zinc-700">{c.result}</p>
                    </div>

                    {/* Métricas */}
                    <div className="relative z-10 grid grid-cols-3 gap-3 mb-6">
                      {c.metrics.map((m, i) => (
                        <div key={i} className="text-center p-2 rounded-xl bg-white/50 border border-white/30">
                          <div className={`text-lg font-extrabold bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                            {m.value}
                          </div>
                          <div className="text-xs text-zinc-600 mt-1">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Stack */}
                    <div className="relative z-10 flex flex-wrap gap-2">
                      {c.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 font-medium border border-zinc-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
