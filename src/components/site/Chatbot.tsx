"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send } from "lucide-react";
import LogoMark from "./LogoMark";
import { WhatsAppIcon } from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/site";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatData {
  nome?: string;
  email?: string;
  whatsapp?: string;
  tipo_projeto?: string;
  descricao?: string;
  momento?: string;
  orcamento?: string;
  leadSaved?: boolean;
}

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatData, setChatData] = useState<ChatData>({});
  const [conversationStep, setConversationStep] = useState(0);
  const [conversationEnded, setConversationEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Inicia a conversa automaticamente
      const welcomeMessage: Message = {
        id: "1",
        role: "assistant",
        content: "Olá! 👋 Sou a assistente da Beste Web. Vou te fazer algumas perguntas rápidas para entender o que você precisa e encaminhar para nosso time técnico. Pode ser?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setConversationStep(1);
      setConversationEnded(false);
      setChatData({});
    }
    
    // Foca no input quando o chat é aberto
    if (isOpen && !conversationEnded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, conversationEnded]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || isLoading || conversationEnded) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Mantém o foco no input após enviar
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          chatData,
          conversationStep,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setChatData(data.chatData || chatData);
        setConversationStep(data.nextStep || conversationStep + 1);

        // Se o lead foi salvo, finaliza a conversa
        if (data.leadSaved) {
          // Lead salvo, finalizando conversa
          setConversationEnded(true);
          setInput("");
          // Marca no chatData que já foi salvo para evitar duplicação
          setChatData((prev) => ({ ...prev, leadSaved: true }));
          
          // Verifica se a mensagem da IA já contém confirmação, se não, adiciona
          if (!data.message.toLowerCase().includes("encaminhar") && 
              !data.message.toLowerCase().includes("registrado") && 
              !data.message.toLowerCase().includes("contato") &&
              !data.message.toLowerCase().includes("sucesso")) {
            // Adiciona uma mensagem de confirmação visual após um pequeno delay
            setTimeout(() => {
              const confirmationMessage: Message = {
                id: (Date.now() + 2).toString(),
                role: "assistant",
                content: "✅ Suas informações foram encaminhadas com sucesso! Nosso time técnico entrará em contato em breve.",
                timestamp: new Date(),
              };
              setMessages((prev) => [...prev, confirmationMessage]);
            }, 500);
          }
        }
      } else {
        throw new Error(data.message || "Erro ao processar mensagem");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro. Pode tentar novamente?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Mantém o foco no input após processar a resposta
      setTimeout(() => {
        if (!conversationEnded) {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }

  // Na página de contato o passo a passo é o foco: esconde os botões flutuantes
  if (pathname === "/contato") return null;

  return (
    <>
      {/* Botões flutuantes: WhatsApp + Chat IA */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.6)] transition-transform duration-200 hover:scale-105"
            aria-label="Falar no WhatsApp com a Beste Web"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-white shadow-[0_12px_30px_-8px_rgb(8_19_58/0.7)] ring-1 ring-white/10 transition-transform duration-200 hover:scale-105"
            aria-label="Abrir chat com a assistente virtual"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
          </button>
        </div>
      )}

      {/* Janela do Chat */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat com a assistente Beste Web"
          className="fixed inset-x-3 bottom-3 z-50 flex h-[600px] max-h-[85dvh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-20px_rgb(8_19_58/0.45)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px]"
        >
          {/* Header */}
          <div className="relative flex items-center justify-between overflow-hidden bg-navy-900 px-4 py-4 text-white">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-brand opacity-70" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <LogoMark className="h-4 w-auto" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">Assistente Beste Web</h3>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online agora
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              aria-label="Fechar chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 ${
                    message.role === "user"
                      ? "rounded-br-md bg-royal-600 text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-800 shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
                  {[0, 0.15, 0.3].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-slate-200 bg-white p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={conversationEnded ? "Conversa finalizada" : "Digite sua mensagem..."}
                className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:border-royal-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-royal-500/10 disabled:opacity-50"
                disabled={isLoading || conversationEnded}
                aria-label="Mensagem"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || conversationEnded}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-royal-600 text-white transition-colors hover:bg-royal-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Enviar mensagem"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
