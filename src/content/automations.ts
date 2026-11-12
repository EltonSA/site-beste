import {
  Headphones,
  UserPlus,
  CalendarCheck,
  ShoppingCart,
  BarChart3,
  Stethoscope,
  Scale,
  Calculator,
  ShoppingBag,
  Home,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export type ChatLine = {
  from: "user" | "bot";
  text: string;
  /** botões de resposta rápida exibidos abaixo da mensagem do bot */
  options?: string[];
};

export type UseCase = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  result: string;
  chatTitle: string;
  script: ChatLine[];
};

/** Abas "o que dá pra automatizar" da home. Conversas ilustrativas. */
export const USE_CASES: UseCase[] = [
  {
    id: "atendimento",
    label: "Atendimento 24/7",
    icon: Headphones,
    title: "Responda na hora, a qualquer hora",
    description:
      "Dúvidas frequentes, horários, preços e status de pedido respondidos em segundos — de madrugada, no fim de semana ou no pico do dia.",
    bullets: ["FAQ e menus automáticos", "Respostas com fotos, PDFs e links", "Transbordo para humano com histórico"],
    result: "Atendimento resolvido sem fila",
    chatTitle: "Atendimento",
    script: [
      { from: "user", text: "Oi! Vocês abrem no sábado?" },
      {
        from: "bot",
        text: "Olá! 👋 Abrimos aos sábados das 9h às 13h. Posso ajudar com mais alguma coisa?",
        options: ["Ver serviços", "Falar com atendente"],
      },
      { from: "user", text: "Ver serviços" },
      { from: "bot", text: "Aqui está nosso catálogo completo 📄 Se quiser, já agendo um horário pra você." },
    ],
  },
  {
    id: "leads",
    label: "Captação de leads",
    icon: UserPlus,
    title: "Transforme conversas em leads qualificados",
    description:
      "O bot faz as perguntas certas, entende a necessidade do cliente e entrega o lead pronto no CRM, com etiqueta e prioridade.",
    bullets: ["Perguntas de qualificação", "Lead criado automaticamente no CRM", "Aviso imediato ao vendedor"],
    result: "Lead criado no CRM",
    chatTitle: "Comercial",
    script: [
      { from: "user", text: "Quero um orçamento" },
      { from: "bot", text: "Claro! Pra começar, qual é o seu nome?" },
      { from: "user", text: "Mariana" },
      {
        from: "bot",
        text: "Prazer, Mariana! O que você precisa?",
        options: ["Automação", "Site", "Outro"],
      },
      { from: "user", text: "Automação" },
      { from: "bot", text: "Perfeito! Já encaminhei para um especialista, que fala com você em instantes ✅" },
    ],
  },
  {
    id: "agenda",
    label: "Agendamentos",
    icon: CalendarCheck,
    title: "Agenda cheia, sem troca de mensagens",
    description:
      "O cliente escolhe o horário direto na conversa. A agenda é atualizada, e os lembretes saem sozinhos para reduzir faltas.",
    bullets: ["Horários livres em tempo real", "Confirmação e lembrete automáticos", "Remarcação pelo próprio cliente"],
    result: "Evento criado na agenda",
    chatTitle: "Agendamentos",
    script: [
      { from: "user", text: "Quero marcar uma consulta" },
      {
        from: "bot",
        text: "Temos estes horários para amanhã:",
        options: ["09:00", "14:30", "16:00"],
      },
      { from: "user", text: "14:30" },
      { from: "bot", text: "Agendado! ✅ Te envio um lembrete um dia antes. Até amanhã!" },
    ],
  },
  {
    id: "vendas",
    label: "Vendas e follow-up",
    icon: ShoppingCart,
    title: "Nenhum orçamento esquecido no vácuo",
    description:
      "Follow-ups no momento certo para quem pediu orçamento, abandonou o carrinho ou sumiu no meio da conversa.",
    bullets: ["Recuperação de carrinho e orçamento", "Sequências de follow-up", "Pós-venda e pedido de avaliação"],
    result: "Venda recuperada",
    chatTitle: "Vendas",
    script: [
      {
        from: "bot",
        text: "Oi, Carlos! Vi que você não finalizou seu pedido. Posso ajudar? 🙂",
        options: ["Finalizar compra", "Tirar uma dúvida"],
      },
      { from: "user", text: "Finalizar compra" },
      { from: "bot", text: "Aqui está o link do seu carrinho 🛒 Qualquer dúvida, é só chamar!" },
      { from: "user", text: "Pronto, paguei!" },
      { from: "bot", text: "Pagamento confirmado ✅ Seu pedido já está sendo separado." },
    ],
  },
  {
    id: "processos",
    label: "Processos internos",
    icon: BarChart3,
    title: "O back-office rodando sozinho",
    description:
      "Relatórios, cobranças, planilhas e avisos para o time — tudo acontecendo no horário certo, sem ninguém precisar lembrar.",
    bullets: ["Relatórios diários automáticos", "Cobranças e lembretes de pagamento", "Planilhas e sistemas sincronizados"],
    result: "Planilha atualizada",
    chatTitle: "Equipe",
    script: [
      {
        from: "bot",
        text: "📊 Bom dia! Ontem: 32 novos leads, 12 reuniões agendadas e 5 propostas enviadas.",
      },
      { from: "user", text: "Me manda os leads quentes" },
      { from: "bot", text: "Enviei a lista no seu e-mail e no canal do comercial ✅" },
    ],
  },
];

export type Template = {
  segment: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  tint: string;
};

/** Modelos de automação por segmento. */
export const TEMPLATES: Template[] = [
  {
    segment: "Clínicas e consultórios",
    title: "Confirmação e lembrete de consultas",
    description: "Confirma presença, envia lembretes e libera o horário automaticamente quando o paciente cancela.",
    tags: ["WhatsApp", "Agenda"],
    icon: Stethoscope,
    tint: "bg-sky-100 text-sky-700",
  },
  {
    segment: "Advocacia",
    title: "Triagem de casos com IA",
    description: "Entende o caso do cliente, classifica a área do direito e agenda a consulta com o advogado certo.",
    tags: ["IA", "CRM"],
    icon: Scale,
    tint: "bg-violet-100 text-violet-700",
  },
  {
    segment: "Contabilidade",
    title: "Cobrança de documentos",
    description: "Pede os documentos do mês, recebe pelo WhatsApp e organiza tudo na pasta de cada cliente.",
    tags: ["WhatsApp", "Drive"],
    icon: Calculator,
    tint: "bg-emerald-100 text-emerald-700",
  },
  {
    segment: "E-commerce",
    title: "Recuperação de carrinho e pós-venda",
    description: "Lembra quem abandonou o carrinho, avisa o status da entrega e pede avaliação depois da compra.",
    tags: ["WhatsApp", "Loja"],
    icon: ShoppingBag,
    tint: "bg-orange-100 text-orange-700",
  },
  {
    segment: "Imobiliárias",
    title: "Qualificação e agendamento de visitas",
    description: "Pergunta orçamento, região e tipo de imóvel, envia opções e marca a visita com o corretor.",
    tags: ["WhatsApp", "CRM"],
    icon: Home,
    tint: "bg-amber-100 text-amber-700",
  },
  {
    segment: "Educação",
    title: "Matrículas e comunicação com alunos",
    description: "Tira dúvidas sobre cursos, conduz a matrícula e envia avisos e lembretes para alunos e responsáveis.",
    tags: ["IA", "WhatsApp"],
    icon: GraduationCap,
    tint: "bg-blue-100 text-blue-700",
  },
];
