import { NextResponse } from "next/server";

const N8N_WEBHOOK_TEST = "https://n8n.besteweb.com.br/webhook-test/72045347-6382-49d2-a72e-b337e5e954e4";
const N8N_WEBHOOK_PROD = "https://n8n.besteweb.com.br/webhook/72045347-6382-49d2-a72e-b337e5e954e4";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validação dos campos obrigatórios
    if (!data.name || !data.email || !data.phone || !data.message || !data.service) {
      return NextResponse.json(
        { success: false, message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Determina qual webhook usar baseado no ambiente
    const webhookUrl = process.env.NODE_ENV === "production" ? N8N_WEBHOOK_PROD : N8N_WEBHOOK_TEST;

    // Prepara os dados para enviar ao n8n
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      service: data.service,
      timestamp: new Date().toISOString(),
      source: "website",
    };

    // Envia para o webhook do n8n
    try {
      const n8nResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!n8nResponse.ok) {
        console.error("Erro ao enviar para n8n:", await n8nResponse.text());
        // Continua mesmo se o n8n falhar, para não bloquear o usuário
      }
    } catch (n8nError) {
      console.error("Erro na requisição para n8n:", n8nError);
      // Continua mesmo se o n8n falhar
    }

    // Salvar no banco de dados local
    try {
      const { saveLead } = await import("@/lib/db");
      saveLead(payload);
    } catch (dbError) {
      console.error("Erro ao salvar no banco:", dbError);
      // Continua mesmo se falhar
    }

    // Log local para debug (apenas em desenvolvimento)
    if (process.env.NODE_ENV === "development") {
      console.log("Novo lead recebido");
    }

    return NextResponse.json({
      success: true,
      message: "Lead enviado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao processar lead:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao enviar formulário. Tente novamente." },
      { status: 500 }
    );
  }
}
