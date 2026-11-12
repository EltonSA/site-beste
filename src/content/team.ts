import { Code2, ShieldCheck, PenTool, type LucideIcon } from "lucide-react";

export type Member = {
  name: string;
  area: string;
  description: string;
  /** o que a pessoa faz no dia a dia */
  functions: string[];
  skills: string[];
  icon: LucideIcon;
  photo: string;
  /** fundo do card da foto e cor do selo da área */
  backdrop: string;
  accent: string;
};

/**
 * Fotos em public/team (WebP 640×800, fundo transparente).
 * Ao trocar uma foto, salve com um nome novo (ex.: -v3.webp) e atualize aqui, para não ficar presa em cache.
 */
export const TEAM: Member[] = [
  {
    name: "Elton Santos",
    area: "Desenvolvimento e Integração",
    description:
      "Responsável por transformar o fluxo desenhado em sistema funcionando, conectando as ferramentas da sua empresa para que os dados circulem sem falhas.",
    functions: [
      "Desenvolve os fluxos de automação e os agentes de IA",
      "Integra WhatsApp, CRM, planilhas e sistemas via API",
      "Coloca as automações no ar e acompanha o funcionamento",
    ],
    skills: ["n8n e Make", "APIs e webhooks", "WhatsApp API", "Agentes de IA", "Next.js e bancos de dados"],
    icon: Code2,
    photo: "/team/elton-santos-v2.webp",
    backdrop: "from-orange-100 via-amber-50 to-white",
    accent: "bg-orange-100 text-orange-700",
  },
  {
    name: "Raul Castenoul",
    area: "Análise e Segurança Digital",
    description:
      "Responsável por entender o seu processo a fundo e por garantir que cada automação seja segura, com acessos, credenciais e informações protegidos.",
    functions: [
      "Mapeia processos e identifica onde a automação gera mais resultado",
      "Analisa dados e métricas para medir e melhorar cada fluxo",
      "Define acessos e protege credenciais e dados dos clientes",
    ],
    skills: ["Análise de processos", "Segurança da informação", "Controle de acessos", "Privacidade de dados", "Monitoramento"],
    icon: ShieldCheck,
    photo: "/team/raul-castenoul-v2.webp",
    backdrop: "from-sky-100 via-royal-50 to-white",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    name: "Gabriel Aires",
    area: "Estrutura e Design System",
    description:
      "Responsável pela estrutura e pelo design system dos projetos: define como cada jornada funciona e garante que telas, mensagens e páginas sigam um padrão visual claro e consistente.",
    functions: [
      "Estrutura as jornadas e os fluxos de conversa de cada projeto",
      "Cria e mantém o design system: componentes, padrões e identidade",
      "Desenha interfaces, sites e páginas alinhados à marca do cliente",
    ],
    skills: ["Design system", "Arquitetura de fluxos", "UX de conversas", "Design de interfaces", "Identidade visual"],
    icon: PenTool,
    photo: "/team/gabriel-aires-v2.webp",
    backdrop: "from-violet-100 via-royal-50 to-white",
    accent: "bg-violet-100 text-violet-700",
  },
];
