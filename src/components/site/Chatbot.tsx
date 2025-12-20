"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

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

  return (
    <>
      {/* Botão flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full !bg-gradient-to-r !from-blue-600 !to-orange-500 text-white shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          style={{
            background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(249, 115, 22))',
          }}
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Janela do Chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-96 h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Assistente Beste We</h3>
                <p className="text-xs opacity-90">Online agora</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "bg-white text-zinc-900 border border-zinc-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl px-4 py-2.5 border border-zinc-200">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-200 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={conversationEnded ? "Conversa finalizada" : "Digite sua mensagem..."}
                className="flex-1 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50"
                disabled={isLoading || conversationEnded}
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || conversationEnded}
                className="w-11 h-11 rounded-xl !bg-gradient-to-r !from-blue-600 !to-orange-500 text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(249, 115, 22))',
                }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

