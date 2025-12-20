import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLeads, updateLead, deleteLead } from "@/lib/db";

// Verificar autenticação
async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  return !!session;
}

export async function GET() {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const leads = getLeads();
  return NextResponse.json({ leads });
}

export async function PATCH(req: Request) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id, ...updates } = await req.json();
    const updated = updateLead(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ lead: updated });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar lead" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }
    const deleted = deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar lead" }, { status: 500 });
  }
}

