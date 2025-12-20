import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserByEmail } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Criar sessão (em produção, usar JWT ou session mais segura)
    const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");
    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao fazer login" },
      { status: 500 }
    );
  }
}

