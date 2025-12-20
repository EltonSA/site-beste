import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUsers } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json({ authenticated: false });
    }

    // Verificar se a sessão é válida (simplificado)
    // Em produção, validar o token adequadamente
    const users = getUsers();
    if (users.length > 0) {
      return NextResponse.json({
        authenticated: true,
        user: { id: users[0].id, email: users[0].email, name: users[0].name },
      });
    }

    return NextResponse.json({ authenticated: false });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

