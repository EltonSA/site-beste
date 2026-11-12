import {
  Stethoscope,
  Scale,
  GraduationCap,
  Calculator,
  Globe,
  ShoppingBag,
  Building2,
  type LucideIcon,
} from "lucide-react";

export type Case = {
  id: number;
  type: "Micro-SaaS" | "Site";
  category: string;
  title: string;
  description: string;
  result: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  icon: LucideIcon;
  features: string[];
};

export const CASES: Case[] = [
  {
    id: 1,
    type: "Micro-SaaS",
    category: "Saúde",
    title: "AtendMed — Sistema para Clínicas",
    description: "Plataforma completa de agendamento e atendimento para clínicas médicas.",
    result: "Redução de 70% no tempo de agendamento e 85% de satisfação dos pacientes.",
    metrics: [
      { label: "Agendamentos/mês", value: "2.5k+" },
      { label: "Tempo médio", value: "2min" },
      { label: "Satisfação", value: "4.8/5" },
    ],
    stack: ["Next.js", "PostgreSQL", "Stripe", "WhatsApp API", "Calendly"],
    icon: Stethoscope,
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
    category: "Jurídico",
    title: "JurisAtend — Sistema para Advocacias",
    description: "Gestão de atendimento e consultas jurídicas com IA para triagem inicial.",
    result: "Aumento de 60% na conversão de leads e redução de 50% no tempo de resposta.",
    metrics: [
      { label: "Consultas/mês", value: "1.8k+" },
      { label: "Conversão", value: "42%" },
      { label: "Tempo resposta", value: "<5min" },
    ],
    stack: ["Next.js", "OpenAI", "PostgreSQL", "Stripe", "n8n"],
    icon: Scale,
    features: ["Chatbot com IA para triagem", "Agendamento de consultas", "Gestão de processos", "Cobrança automática"],
  },
  {
    id: 3,
    type: "Micro-SaaS",
    category: "Educação",
    title: "EduConnect — Sistema para Educação",
    description: "Plataforma de atendimento e comunicação para escolas e cursos online.",
    result: "Melhoria de 80% na comunicação escola-família e 65% mais matrículas.",
    metrics: [
      { label: "Alunos ativos", value: "5k+" },
      { label: "Mensagens/mês", value: "12k+" },
      { label: "Taxa matrícula", value: "68%" },
    ],
    stack: ["Next.js", "Supabase", "Twilio", "Stripe", "RAG"],
    icon: GraduationCap,
    features: ["Portal do aluno e responsável", "Chat em tempo real", "Notificações automáticas", "Gestão de matrículas"],
  },
  {
    id: 4,
    type: "Micro-SaaS",
    category: "Contabilidade",
    title: "ContaFlow — Sistema para Contabilidade",
    description: "Sistema de atendimento e gestão de clientes para escritórios contábeis.",
    result: "Redução de 55% no tempo de atendimento e aumento de 40% na retenção de clientes.",
    metrics: [
      { label: "Clientes ativos", value: "850+" },
      { label: "Tickets/mês", value: "3.2k" },
      { label: "Retenção", value: "94%" },
    ],
    stack: ["Next.js", "PostgreSQL", "n8n", "WhatsApp", "Stripe"],
    icon: Calculator,
    features: [
      "Central de atendimento unificada",
      "Automação de processos contábeis",
      "Integração com sistemas fiscais",
      "Dashboard de métricas",
    ],
  },
  {
    id: 5,
    type: "Site",
    category: "Landing Page",
    title: "TechStart — Landing Page de Alta Conversão",
    description: "Landing page para startup de tecnologia com foco em conversão e performance.",
    result: "Taxa de conversão de 12% e tempo de carregamento de 0.8s.",
    metrics: [
      { label: "Conversão", value: "12%" },
      { label: "Carregamento", value: "0.8s" },
      { label: "SEO Score", value: "98/100" },
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel Analytics"],
    icon: Globe,
    features: ["Design moderno e responsivo", "Animações suaves", "SEO otimizado", "Analytics integrado"],
  },
  {
    id: 6,
    type: "Site",
    category: "E-commerce",
    title: "FashionStore — Loja Virtual Premium",
    description: "E-commerce completo para marca de moda com checkout otimizado.",
    result: "Aumento de 45% nas vendas online e redução de 30% na taxa de abandono.",
    metrics: [
      { label: "Vendas/mês", value: "R$ 180k" },
      { label: "Conversão", value: "3.8%" },
      { label: "Abandono", value: "52%" },
    ],
    stack: ["Next.js", "Shopify", "Stripe", "PostgreSQL", "Redis"],
    icon: ShoppingBag,
    features: ["Catálogo de produtos dinâmico", "Checkout otimizado", "Sistema de cupons", "Painel administrativo"],
  },
  {
    id: 7,
    type: "Site",
    category: "Institucional",
    title: "CorpSite — Site Institucional Empresarial",
    description: "Site corporativo moderno com blog integrado e área de clientes.",
    result: "Aumento de 200% no tráfego orgânico e 35% mais leads qualificados.",
    metrics: [
      { label: "Tráfego/mês", value: "25k" },
      { label: "Leads/mês", value: "450" },
      { label: "Tempo médio", value: "4:30min" },
    ],
    stack: ["Next.js", "MDX", "PostgreSQL", "Vercel", "Google Analytics"],
    icon: Building2,
    features: ["Blog integrado com MDX", "Área de clientes", "Formulários inteligentes", "Integração CRM"],
  },
];
