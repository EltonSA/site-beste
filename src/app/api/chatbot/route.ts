import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Você é a IA de Primeiro Atendimento da Beste Web, uma agência de tecnologia especializada em:
- Automação de processos
- Integrações com Inteligência Artificial
- Desenvolvimento de sites
- Criação de micro-SaaS

Seu objetivo é:
- Atender com clareza, educação e profissionalismo
- Entender a necessidade do cliente através de uma conversa natural e fluida
- Coletar informações essenciais de forma conversacional, não robótica
- Preparar os dados para diagnóstico humano
- Nunca prometer prazos ou valores

Você NÃO fecha venda. Você qualifica o contato.

TOM DE VOZ: Profissional, objetivo, acessível, amigável, empático, sem jargões técnicos excessivos, linguagem natural em português do Brasil. Seja conversacional, não robótico. Fale como um atendente humano real.

REGRAS IMPORTANTES:
- Seja natural e conversacional - não seja um formulário
- Faça perguntas de forma natural, como em uma conversa real
- Não pressione o usuário
- Se o cliente não souber responder, ofereça opções de forma amigável
- Se fugir do escopo, traga a conversa de volta com educação
- Não invente soluções
- Nunca diga que é "ChatGPT" ou "modelo de linguagem"
- Adapte suas respostas ao contexto da conversa
- Seja empático e prestativo
- Pode fazer comentários relevantes sobre o que o cliente disse

INFORMAÇÕES A COLETAR (de forma natural durante a conversa):
1. Nome
2. E-mail
3. WhatsApp
4. Tipo de projeto (Automação, IA, Site, Micro-SaaS, Outro)
5. Descrição do problema/cenário
6. Momento do projeto (ideia, em operação, precisa melhorar, urgente)
7. Orçamento (opcional, apenas se a conversa fluir naturalmente)

Quando tiver todas as informações essenciais (nome, email, whatsapp, tipo de projeto, descrição), finalize educadamente informando que o time técnico entrará em contato.`;

export async function POST(req: Request) {
  try {
    const { messages, chatData, conversationStep } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, message: "API key não configurada" },
        { status: 500 }
      );
    }

    // Prepara o contexto da conversa para a IA
    const conversationContext = `
Contexto da conversa atual:
- Nome coletado: ${chatData.nome || "Ainda não coletado"}
- Email coletado: ${chatData.email || "Ainda não coletado"}
- WhatsApp coletado: ${chatData.whatsapp || "Ainda não coletado"}
- Tipo de projeto: ${chatData.tipo_projeto || "Ainda não identificado"}
- Descrição: ${chatData.descricao || "Ainda não coletada"}
- Momento: ${chatData.momento || "Ainda não identificado"}

Instruções baseadas no que falta:
${!chatData.nome ? "- Você PRECISA perguntar explicitamente: 'Qual é o seu nome?' ou 'Como você se chama?'. NÃO aceite saudações como 'Boa tarde', 'Olá', etc como nome. Espere uma resposta com um nome real." : ""}
${!chatData.email ? "- Você precisa descobrir o EMAIL do cliente. Pergunte: 'Qual o melhor e-mail para contato?'" : ""}
${!chatData.whatsapp ? "- Você precisa descobrir o WHATSAPP do cliente. Pergunte: 'E o seu WhatsApp?'" : ""}
${!chatData.tipo_projeto ? "- Você precisa entender o TIPO DE PROJETO (Automação, IA, Site, Micro-SaaS, Outro) de forma natural" : ""}
${!chatData.descricao ? "- Você precisa entender a DESCRIÇÃO do problema/cenário de forma natural" : ""}
${!chatData.momento ? "- Você precisa saber o MOMENTO do projeto (ideia, em operação, precisa melhorar, urgente) de forma natural" : ""}

${chatData.nome && chatData.email && chatData.whatsapp && chatData.tipo_projeto && chatData.descricao && chatData.momento 
  ? "- Você já coletou TODAS as informações essenciais (nome, email, whatsapp, tipo de projeto, descrição, momento). AGORA você DEVE finalizar a conversa de forma educada e profissional. Diga algo como: 'Perfeito! Já tenho todas as informações. Vou encaminhar para nosso time técnico que entrará em contato em breve. Foi um prazer te atender!' NÃO faça mais perguntas. NÃO continue a conversa. APENAS finalize." 
  : ""}

IMPORTANTE: Seja natural e conversacional. Não seja um formulário. Faça perguntas de forma amigável e contextual. Pode comentar sobre o que o cliente disse antes de fazer a próxima pergunta.
`;

    // Chama a IA para gerar resposta contextual e conversacional
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: conversationContext },
          ...messages.slice(-10), // Últimas 10 mensagens para contexto completo
        ],
        temperature: 0.8,
        max_tokens: 350,
      }),
    });

    const data = await response.json();
    let aiResponse = data.choices?.[0]?.message?.content || "Entendi. Pode continuar?";

    // Extrai informações da última mensagem do usuário e atualiza chatData
    let updatedChatData = { ...chatData };
    let leadSaved = false;
    let nextStep = conversationStep + 1;

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const lastUserMessageLower = lastUserMessage.toLowerCase();

    // Pega a última mensagem da IA para contexto (usada em várias validações)
    const lastAssistantMessage = messages.filter((m: { role: string; content: string }) => m.role === "assistant").pop()?.content?.toLowerCase() || "";
    
    if (!updatedChatData.nome) {
      // Só extrai nome se a última mensagem da IA perguntou explicitamente sobre o nome
      if (lastAssistantMessage.includes("nome") || lastAssistantMessage.includes("chama") || lastAssistantMessage.includes("como você se chama")) {
        const possibleName = lastUserMessage.trim();
        // Lista de palavras que não são nomes (saudações, etc)
        const notNames = ["boa tarde", "boa noite", "bom dia", "olá", "oi", "olá", "e aí", "tudo bem", "tudo bom", "sim", "não", "ok", "pode ser", "claro"];
        
        // Valida se parece um nome (não contém @, http, números extensos, não é muito longo, não é saudação)
        if (
          possibleName.length > 0 && 
          possibleName.length < 50 && 
          !possibleName.includes("@") && 
          !possibleName.includes("http") && 
          !/\d{4,}/.test(possibleName) &&
          possibleName.split(" ").length <= 4 &&
          !notNames.includes(possibleName.toLowerCase())
        ) {
          updatedChatData.nome = possibleName;
        }
      }
    }

    // Extrai email
    const emailMatch = lastUserMessage.match(/[\w\.-]+@[\w\.-]+\.\w+/);
    if (emailMatch && !updatedChatData.email) {
      updatedChatData.email = emailMatch[0];
    }

    // Extrai telefone/whatsapp
    const phoneMatch = lastUserMessage.match(/(\+?55\s?)?(\(?\d{2}\)?\s?)?(\d{4,5}[-.\s]?\d{4})/);
    if (phoneMatch && !updatedChatData.whatsapp) {
      updatedChatData.whatsapp = phoneMatch[0].replace(/\s/g, "");
    }

    // Detecta tipo de projeto de forma mais flexível
    if (!updatedChatData.tipo_projeto) {
      if (lastUserMessageLower.includes("automação") || lastUserMessageLower.includes("automatizar") || lastUserMessageLower.includes("processo")) {
        updatedChatData.tipo_projeto = "Automação de processos";
      } else if (lastUserMessageLower.includes("ia") || lastUserMessageLower.includes("inteligência artificial") || lastUserMessageLower.includes("chatbot") || lastUserMessageLower.includes("assistente virtual")) {
        updatedChatData.tipo_projeto = "Integração com inteligência artificial";
      } else if (lastUserMessageLower.includes("site") || lastUserMessageLower.includes("landing page") || lastUserMessageLower.includes("página") || lastUserMessageLower.includes("web")) {
        updatedChatData.tipo_projeto = "Desenvolvimento de site";
      } else if (lastUserMessageLower.includes("micro-saas") || lastUserMessageLower.includes("mvp") || lastUserMessageLower.includes("saas") || lastUserMessageLower.includes("sistema")) {
        updatedChatData.tipo_projeto = "Criação de micro-SaaS";
      }
    }

    // Detecta momento do projeto - APENAS se a IA perguntou explicitamente sobre o momento
    // Não detecta automaticamente para evitar falsos positivos (ex: "automatizar" não significa momento)
    if (!updatedChatData.momento) {
      // Só detecta momento se a IA perguntou sobre isso na última mensagem
      // Verifica se a IA mencionou palavras-chave relacionadas a momento/fase
      const iaPerguntouMomento = lastAssistantMessage.includes("momento") || 
                                  lastAssistantMessage.includes("fase") || 
                                  lastAssistantMessage.includes("em que momento") ||
                                  lastAssistantMessage.includes("está hoje") ||
                                  lastAssistantMessage.includes("só uma ideia") ||
                                  lastAssistantMessage.includes("já em operação") ||
                                  lastAssistantMessage.includes("precisa melhorar");
      
      if (iaPerguntouMomento) {
        if (lastUserMessageLower.includes("ideia") || lastUserMessageLower.includes("pensando") || lastUserMessageLower.includes("planejando") || lastUserMessageLower.includes("só uma ideia") || lastUserMessageLower.includes("apenas uma ideia")) {
          updatedChatData.momento = "Só uma ideia";
        } else if (lastUserMessageLower.includes("operando") || lastUserMessageLower.includes("funcionando") || lastUserMessageLower.includes("já tenho") || lastUserMessageLower.includes("já existe") || lastUserMessageLower.includes("já em operação") || lastUserMessageLower.includes("já está")) {
          updatedChatData.momento = "Já em operação";
        } else if (lastUserMessageLower.includes("melhorar") || lastUserMessageLower.includes("otimizar") || lastUserMessageLower.includes("atualizar") || lastUserMessageLower.includes("precisa melhorar") || lastUserMessageLower.includes("preciso melhorar")) {
          updatedChatData.momento = "Precisa melhorar/automatizar";
        } else if (lastUserMessageLower.includes("urgente") || lastUserMessageLower.includes("rápido") || lastUserMessageLower.includes("asap") || lastUserMessageLower.includes("preciso urgente")) {
          updatedChatData.momento = "Urgente";
        }
      }
    }

    // Se tem descrição longa e ainda não tem, salva como descrição
    // Também verifica se a mensagem não é apenas um nome, email ou telefone
    if (!updatedChatData.descricao && lastUserMessage.length > 20 && !emailMatch && !phoneMatch) {
      const possibleName = lastUserMessage.trim();
      const notNames = ["boa tarde", "boa noite", "bom dia", "olá", "oi", "e aí", "tudo bem", "tudo bom", "sim", "não", "ok", "pode ser", "claro"];
      // Se não parece ser apenas um nome ou saudação, salva como descrição
      if (!notNames.includes(possibleName.toLowerCase()) && possibleName.split(" ").length > 1) {
        updatedChatData.descricao = lastUserMessage;
      } else if (lastUserMessage.length > 50) {
        // Se for muito longo, provavelmente é uma descrição
        updatedChatData.descricao = lastUserMessage;
      }
    }

    // Verifica se já coletou todas as informações essenciais
    const hasAllEssentialInfo = 
      updatedChatData.nome && 
      updatedChatData.email && 
      updatedChatData.whatsapp && 
      updatedChatData.tipo_projeto && 
      updatedChatData.descricao &&
      updatedChatData.momento;

    // Debug: log do estado atual (apenas em desenvolvimento)
    if (process.env.NODE_ENV === "development") {
      console.log("Chatbot - Estado atual:", {
        hasAllEssentialInfo,
        nome: updatedChatData.nome ? "***" : "Não coletado",
        email: updatedChatData.email ? "***" : "Não coletado",
        whatsapp: updatedChatData.whatsapp ? "***" : "Não coletado",
        tipo_projeto: updatedChatData.tipo_projeto,
        descricao: updatedChatData.descricao ? "***" : "Não coletado",
        momento: updatedChatData.momento,
        leadSaved: chatData.leadSaved,
      });
    }

    // Se coletou tudo, salva o lead (apenas uma vez)
    // Verifica se já foi salvo anteriormente no chatData
    if (hasAllEssentialInfo && !chatData.leadSaved && !leadSaved && updatedChatData.nome) {
      try {
        const { saveLead, getLeads } = await import("@/lib/db");
        // Verifica se já existe um lead com o mesmo email recente (últimos 5 minutos) para evitar duplicatas
        const existingLeads = getLeads();
        const recentDuplicate = existingLeads.find(lead => 
          lead.email === updatedChatData.email && 
          lead.source === "chatbot" &&
          new Date(lead.timestamp).getTime() > Date.now() - 5 * 60 * 1000 // últimos 5 minutos
        );
        
        if (!recentDuplicate) {
          // Garante que o nome seja válido (não seja saudação ou primeira mensagem)
          const validName = updatedChatData.nome.trim();
          const notNames = ["boa tarde", "boa noite", "bom dia", "olá", "oi", "e aí", "tudo bem", "tudo bom", "sim", "não", "ok", "pode ser", "claro"];
          
          if (validName && !notNames.includes(validName.toLowerCase()) && validName.length > 1) {
            const savedLead = saveLead({
              name: validName,
              email: updatedChatData.email || "",
              phone: updatedChatData.whatsapp || "",
              message: updatedChatData.descricao || "",
              service: updatedChatData.tipo_projeto || "Não especificado",
              timestamp: new Date().toISOString(),
              source: "chatbot",
              status: "novo",
              notes: `Momento: ${updatedChatData.momento || "Não informado"}\nOrçamento: ${updatedChatData.orcamento || "Não informado"}`,
            });
            if (process.env.NODE_ENV === "development") {
              console.log("Lead salvo com sucesso");
            }
            leadSaved = true;
            updatedChatData.leadSaved = true; // Marca como salvo no chatData
            
            // NÃO adiciona mensagem de confirmação aqui - a IA já deve ter finalizado a conversa
            // A mensagem de confirmação será adicionada apenas no frontend se necessário
            } else if (process.env.NODE_ENV === "development") {
              console.log("Nome inválido, não salvando");
            }
          } else if (process.env.NODE_ENV === "development") {
            console.log("Lead duplicado encontrado, não salvando novamente");
          // Já existe um lead recente, marca como salvo para não duplicar
          leadSaved = true;
          updatedChatData.leadSaved = true;
        }
      } catch (error) {
        console.error("Erro ao salvar lead:", error);
      }
    } else if (hasAllEssentialInfo && chatData.leadSaved) {
      // Se já foi salvo, apenas confirma
      leadSaved = true;
    }

    return NextResponse.json({
      success: true,
      message: aiResponse,
      chatData: updatedChatData,
      nextStep,
      leadSaved,
    });
  } catch (error: any) {
    console.error("Erro no chatbot:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Desculpe, ocorreu um erro. Pode tentar novamente?",
      },
      { status: 500 }
    );
  }
}
