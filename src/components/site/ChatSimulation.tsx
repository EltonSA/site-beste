"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  delay: number;
}

const conversation: Message[] = [
  {
    id: 1,
    sender: "user",
    text: "Olá, preciso de ajuda com automação",
    delay: 1000,
  },
  {
    id: 2,
    sender: "bot",
    text: "Olá! Fico feliz em ajudar. Qual processo você gostaria de automatizar?",
    delay: 2500,
  },
  {
    id: 3,
    sender: "user",
    text: "Quero automatizar o atendimento do WhatsApp",
    delay: 5000,
  },
  {
    id: 4,
    sender: "bot",
    text: "Perfeito! Posso criar um chatbot inteligente que responde automaticamente, qualifica leads e agenda reuniões. Funciona 24/7!",
    delay: 7500,
  },
  {
    id: 5,
    sender: "user",
    text: "Quanto tempo leva para implementar?",
    delay: 11000,
  },
  {
    id: 6,
    sender: "bot",
    text: "Em média, 1-2 semanas para ter o primeiro bot funcionando. Começamos com as perguntas mais frequentes e expandimos conforme sua necessidade.",
    delay: 13500,
  },
];

export default function ChatSimulation() {
  const [messages, setMessages] = useState<Array<Message & { displayedText: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentMessageIndex < conversation.length) {
      const currentMessage = conversation[currentMessageIndex];
      
      setIsTyping(true);
      
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        
        // Adiciona a mensagem vazia primeiro
        setMessages((prev) => [...prev, { ...currentMessage, displayedText: "" }]);
        
        // Efeito de digitação letra por letra
        let charIndex = 0;
        typingIntervalRef.current = setInterval(() => {
          if (charIndex < currentMessage.text.length) {
            const displayedText = currentMessage.text.slice(0, charIndex + 1);
            setMessages((prev) => {
              const newMessages = [...prev];
              const lastIndex = newMessages.length - 1;
              if (lastIndex >= 0 && newMessages[lastIndex].id === currentMessage.id) {
                newMessages[lastIndex] = { ...currentMessage, displayedText };
              }
              return newMessages;
            });
            charIndex++;
          } else {
            if (typingIntervalRef.current) {
              clearInterval(typingIntervalRef.current);
            }
            // Aguarda um pouco antes de mostrar a próxima mensagem
            setTimeout(() => {
              setCurrentMessageIndex((prev) => prev + 1);
            }, 800);
          }
        }, 30); // Velocidade de digitação
      }, currentMessage.delay);

      return () => {
        clearTimeout(typingTimer);
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
      };
    }
  }, [currentMessageIndex]);

  return (
    <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl border border-white/30 max-w-2xl mx-auto">
      {/* Header do Chat */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200/50">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
          <Bot className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-zinc-900">Assistente IA</h3>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <p className="text-xs text-zinc-500">Online • Responde instantaneamente</p>
        </div>
        <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
      </div>

      {/* Mensagens */}
      <div className="space-y-3 md:space-y-4 min-h-[300px] md:min-h-[400px] max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-slide-in-left ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            {message.sender === "bot" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                  : "bg-zinc-100 text-zinc-900"
              }`}
            >
              <p className="text-sm leading-relaxed">
                {message.displayedText}
                {message.displayedText.length < message.text.length && (
                  <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse">|</span>
                )}
              </p>
            </div>
            {message.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {/* Indicador de digitação */}
        {isTyping && (
          <div className="flex gap-3 justify-start animate-slide-in-left">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-zinc-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
