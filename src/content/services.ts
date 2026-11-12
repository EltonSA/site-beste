import { MessageCircle, Bot, Workflow, Cog, Globe, Rocket, type LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  items: string[];
  benefits: string[];
};

/** Núcleo da Beste Web: automação. */
export const SERVICES: Service[] = [
  {
    id: "whatsapp",
    title: "Automação de WhatsApp",
    short: "Atendimento, menus, agendamentos e follow-ups rodando sozinhos no canal que seu cliente mais usa.",
    description:
      "Seu WhatsApp atendendo, qualificando e vendendo 24 horas por dia — com transbordo para o time quando uma pessoa precisa entrar.",
    icon: MessageCircle,
    items: [
      "API oficial do WhatsApp Business",
      "Menus, respostas rápidas e FAQ automático",
      "Agendamento e lembretes automáticos",
      "Recuperação de orçamentos e carrinhos",
      "Disparos segmentados e follow-up",
      "Transbordo para atendente com histórico",
    ],
    benefits: ["Resposta em segundos, não em horas", "Nenhum lead esquecido", "Time focado no que importa"],
  },
  {
    id: "ia",
    title: "Agentes de IA",
    short: "Assistentes treinados com as informações da sua empresa que conversam como gente e trabalham como sistema.",
    description:
      "Agentes de IA que entendem perguntas abertas, consultam sua base de conhecimento e executam ações — não só respostas prontas.",
    icon: Bot,
    items: [
      "Base de conhecimento com seus documentos (RAG)",
      "Triagem, classificação e qualificação de leads",
      "Respostas com anexos (PDF, imagens, catálogos)",
      "Ações em sistemas: agenda, CRM, planilhas",
      "Análise de sentimento e priorização",
      "Monitoramento e melhoria contínua",
    ],
    benefits: ["Atendimento 24/7", "Respostas consistentes", "Menos carga sobre o time"],
  },
  {
    id: "integracoes",
    title: "Integrações e CRM",
    short: "Conectamos WhatsApp, CRM, planilhas e sistemas para que os dados andem sozinhos entre eles.",
    description:
      "Fluxos em n8n, Make e APIs que conectam suas ferramentas e acabam com o copia-e-cola entre sistemas.",
    icon: Workflow,
    items: [
      "n8n, Make e Zapier",
      "Bitrix24, HubSpot, RD Station e outros CRMs",
      "Pipelines de vendas automáticos",
      "Sincronização entre sistemas e bancos de dados",
      "Webhooks e integrações via API",
      "Monitoramento e alertas de falha",
    ],
    benefits: ["Dados sempre atualizados", "Fim do retrabalho manual", "Processos rastreáveis"],
  },
  {
    id: "processos",
    title: "Automação de Processos Internos",
    short: "Relatórios, cobranças, documentos e rotinas do back-office acontecendo no automático.",
    description:
      "As tarefas repetitivas do dia a dia — relatórios, cobranças, documentos e avisos — rodando sem ninguém precisar lembrar.",
    icon: Cog,
    items: [
      "Relatórios diários e semanais automáticos",
      "Cobrança e lembretes de pagamento",
      "Geração e envio de documentos",
      "Atualização automática de planilhas",
      "Notificações para o time (Slack, e-mail, WhatsApp)",
      "Onboarding de clientes e colaboradores",
    ],
    benefits: ["Horas de trabalho devolvidas", "Menos erros operacionais", "Escala sem contratar"],
  },
];

/** Serviços complementares. */
export const EXTRA_SERVICES = [
  {
    id: "sites",
    title: "Sites e landing pages",
    short: "Páginas rápidas e otimizadas para conversão, já integradas às suas automações e ao CRM.",
    icon: Globe,
  },
  {
    id: "micro-saas",
    title: "Sistemas e micro-SaaS",
    short: "Quando a automação pede um sistema próprio: login, painel, cobrança recorrente e métricas.",
    icon: Rocket,
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Diagnóstico",
    description: "Mapeamos seu atendimento e seus processos para achar onde a automação gera mais retorno.",
  },
  {
    step: "02",
    title: "Desenho do fluxo",
    description: "Você aprova o fluxo, as mensagens e as integrações antes de qualquer linha de código.",
  },
  {
    step: "03",
    title: "Implantação",
    description: "Colocamos no ar em ciclos curtos, testando com casos reais da sua operação.",
  },
  {
    step: "04",
    title: "Otimização",
    description: "Acompanhamos as métricas e ajustamos o fluxo para converter e atender cada vez melhor.",
  },
];

export const FAQ = [
  {
    q: "Em quanto tempo a automação fica pronta?",
    a: "Fluxos de WhatsApp e agentes de IA costumam ter a primeira versão no ar em 1 a 2 semanas. Integrações maiores são entregues por etapas, para você ver resultado desde o início.",
  },
  {
    q: "Vocês usam a API oficial do WhatsApp?",
    a: "Sim. Trabalhamos com a API oficial do WhatsApp Business, que é mais estável e segura para o seu número. Cuidamos de toda a configuração.",
  },
  {
    q: "A automação substitui o meu time?",
    a: "Não. Ela tira do time o trabalho repetitivo e transfere a conversa para uma pessoa quando necessário, com todo o histórico, para ninguém precisar perguntar de novo.",
  },
  {
    q: "Funciona com o CRM e as ferramentas que eu já uso?",
    a: "Na grande maioria dos casos, sim. Integramos com CRMs, planilhas, ERPs, agendas, plataformas de pagamento e qualquer sistema que tenha API.",
  },
  {
    q: "Quanto custa?",
    a: "Depende do escopo. Depois do diagnóstico gratuito você recebe uma proposta com escopo fechado, prazo e investimento — antes de qualquer compromisso.",
  },
  {
    q: "E depois que estiver no ar?",
    a: "Acompanhamos métricas, corrigimos o que for preciso e evoluímos os fluxos conforme sua operação cresce.",
  },
];
