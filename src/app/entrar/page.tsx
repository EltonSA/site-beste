"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import LogoMark from "@/components/site/LogoMark";
import { buttonClasses } from "@/components/ui/Button";

const field =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[0.95rem] text-navy-900 placeholder:text-slate-400 transition-colors focus:border-royal-500 focus:outline-none focus:ring-4 focus:ring-royal-500/10";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar se já está autenticado
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.push("/dashboard");
        }
      });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.message || "Credenciais inválidas");
      }
    } catch {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 pb-16 pt-28">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
            <LogoMark className="h-6 w-auto" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold text-navy-900">Área do cliente</h1>
          <p className="mt-2 text-slate-600">Acesse o painel de gestão de leads.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-3xl bg-white p-7 ring-1 ring-slate-200 shadow-[0_30px_70px_-30px_rgb(8_19_58/0.35)] sm:p-8"
        >
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="voce@empresa.com"
              className={field}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={field}
            />
          </div>

          {error && (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-800">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className={buttonClasses("dark", "lg", "w-full")}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando…
              </>
            ) : (
              <>
                Entrar
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            Conexão segura · acesso restrito à equipe
          </p>
        </form>
      </div>
    </div>
  );
}
