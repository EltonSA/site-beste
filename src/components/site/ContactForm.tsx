"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

const services = [
  "Automação de WhatsApp",
  "Agente de IA / Chatbot",
  "Integrações e CRM",
  "Automação de processos internos",
  "Site ou landing page",
  "Sistema / Micro-SaaS",
  "Outro",
];

const field =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[0.95rem] text-navy-900 placeholder:text-slate-400 transition-colors focus:border-royal-500 focus:outline-none focus:ring-4 focus:ring-royal-500/10";
const label = "mb-1.5 block text-sm font-medium text-slate-700";

export default function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          service: formData.get("service"),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        form.reset();
        router.push("/contato?ok=1");
        router.refresh();
      } else {
        setError(result.message || "Erro ao enviar formulário. Tente novamente.");
      }
    } catch {
      setError("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Nome / Empresa <span className="text-brand-orange">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" placeholder="Seu nome ou empresa" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            E-mail <span className="text-brand-orange">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com" className={field} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            WhatsApp <span className="text-brand-orange">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="(41) 99999-9999" className={field} />
        </div>
        <div>
          <label htmlFor="service" className={label}>
            Serviço de interesse <span className="text-brand-orange">*</span>
          </label>
          <select id="service" name="service" required defaultValue="" className={field}>
            <option value="" disabled>
              Selecione
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Sobre o projeto <span className="text-brand-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="O que você quer automatizar? Como funciona seu atendimento hoje e quais ferramentas usa?"
          className={`${field} resize-none`}
        />
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">Seus dados são usados apenas para retornarmos o contato.</p>
        <button type="submit" disabled={isSubmitting} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              Enviar mensagem
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
