"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import Badge from "@/components/site/Badge";
import {
  LogOut,
  User,
  Mail,
  Phone,
  MessageSquare,
  Tag,
  Calendar,
  TrendingUp,
  Filter,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  timestamp: string;
  source: string;
  status?: "novo" | "contatado" | "qualificado" | "convertido" | "perdido";
  notes?: string;
}

const statusConfig = {
  novo: {
    label: "Novo",
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    icon: Clock,
  },
  contatado: {
    label: "Contatado",
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
    icon: User,
  },
  qualificado: {
    label: "Qualificado",
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-800",
    icon: TrendingUp,
  },
  convertido: {
    label: "Convertido",
    color: "bg-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
    icon: CheckCircle2,
  },
  perdido: {
    label: "Perdido",
    color: "bg-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
    icon: XCircle,
  },
};

const statusOrder: Array<keyof typeof statusConfig> = ["novo", "contatado", "qualificado", "convertido", "perdido"];

export default function DashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [newLeadsCount, setNewLeadsCount] = useState(0);
  const kanbanRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkAuth();
    loadLeads();
    
    // Atualização automática a cada 5 segundos
    const interval = setInterval(() => {
      loadLeads(true); // true = atualização silenciosa
    }, 5000);
    
    return () => {
      clearInterval(interval);
      stopAutoScroll();
    };
  }, []);

  async function checkAuth() {
    const res = await fetch("/api/auth/check");
    const data = await res.json();
    if (!data.authenticated) {
      router.push("/entrar");
    }
  }

  async function loadLeads(silent = false) {
    try {
      const res = await fetch("/api/leads");
      if (res.status === 401) {
        router.push("/entrar");
        return;
      }
      const data = await res.json();
      const newLeads = data.leads || [];
      
      // Detecta novos leads
      if (!silent && leads.length > 0) {
        const previousIds = new Set(leads.map((l: Lead) => l.id));
        const newLeadsFound = newLeads.filter((l: Lead) => !previousIds.has(l.id));
        if (newLeadsFound.length > 0) {
          setNewLeadsCount(newLeadsFound.length);
          // Remove o contador após 3 segundos
          setTimeout(() => setNewLeadsCount(0), 3000);
        }
      }
      
      setLeads(newLeads);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Erro ao carregar leads:", error);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }

  function filterLeads(leadList: Lead[]) {
    if (!searchTerm) return leadList;
    return leadList.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.service.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  function getLeadsByStatus(status: Lead["status"]) {
    return filterLeads(leads.filter((lead) => (lead.status || "novo") === status));
  }

  async function updateStatus(id: string, status: Lead["status"]) {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        loadLeads();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  }

  async function updateNotes(id: string) {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes }),
      });
      if (res.ok) {
        setSelectedLead(null);
        setNotes("");
        loadLeads();
      }
    } catch (error) {
      console.error("Erro ao atualizar notas:", error);
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        loadLeads();
      }
    } catch (error) {
      console.error("Erro ao deletar lead:", error);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/entrar");
  }

  function startAutoScroll() {
    // Função será chamada no handleDragOver
  }

  function stopAutoScroll() {
    // Limpa qualquer intervalo pendente
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }
  
  function handleAutoScroll(e: React.DragEvent) {
    if (!kanbanRef.current || !draggedLead) return;
    
    const container = kanbanRef.current;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX;
    const scrollSpeed = 20;
    const scrollZone = 150; // Zona de ativação próxima às bordas
    
    // Scroll para esquerda
    if (mouseX < rect.left + scrollZone && container.scrollLeft > 0) {
      container.scrollBy({ left: -scrollSpeed, behavior: 'auto' });
    }
    // Scroll para direita
    else if (mouseX > rect.right - scrollZone && container.scrollLeft < container.scrollWidth - container.clientWidth) {
      container.scrollBy({ left: scrollSpeed, behavior: 'auto' });
    }
  }

  function handleDragStart(e: React.DragEvent, lead: Lead) {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", lead.id);
    // Adiciona classe ao elemento sendo arrastado
    setTimeout(() => {
      (e.target as HTMLElement).style.opacity = "0.5";
    }, 0);
    
    // Inicia o auto-scroll
    startAutoScroll();
  }

  function handleDragEnd(e: React.DragEvent) {
    (e.target as HTMLElement).style.opacity = "1";
    setDraggedLead(null);
    // Remove classe drag-over de todas as colunas
    document.querySelectorAll(".kanban-column").forEach((col) => {
      col.classList.remove("drag-over");
    });
    // Para o auto-scroll
    stopAutoScroll();
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.classList.add("drag-over");
    // Auto-scroll durante o drag
    handleAutoScroll(e);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.currentTarget.classList.remove("drag-over");
  }

  async function handleDrop(e: React.DragEvent, targetStatus: Lead["status"]) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
    
    if (draggedLead && draggedLead.status !== targetStatus) {
      await updateStatus(draggedLead.id, targetStatus);
    }
    setDraggedLead(null);
  }

  const stats = {
    total: leads.length,
    novo: leads.filter((l) => l.status === "novo").length,
    contatado: leads.filter((l) => l.status === "contatado").length,
    qualificado: leads.filter((l) => l.status === "qualificado").length,
    convertido: leads.filter((l) => l.status === "convertido").length,
  };

  if (loading) {
    return (
      <Section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-zinc-600">Carregando...</div>
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-32 pb-20 min-h-screen">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <Badge>CRM de Leads</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 mt-4">
              Painel{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Kanban
              </span>
            </h1>
            <p className="text-sm text-zinc-500 mt-2">
              Atualizado às {lastUpdate.toLocaleTimeString("pt-BR")}
              {newLeadsCount > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold animate-pulse">
                  +{newLeadsCount} novo{newLeadsCount > 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="glass rounded-2xl p-4 border border-white/30">
            <div className="text-2xl font-bold text-zinc-900">{stats.total}</div>
            <div className="text-sm text-zinc-600">Total</div>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/30">
            <div className="text-2xl font-bold text-blue-600">{stats.novo}</div>
            <div className="text-sm text-zinc-600">Novos</div>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/30">
            <div className="text-2xl font-bold text-yellow-600">{stats.contatado}</div>
            <div className="text-sm text-zinc-600">Contatados</div>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/30">
            <div className="text-2xl font-bold text-purple-600">{stats.qualificado}</div>
            <div className="text-sm text-zinc-600">Qualificados</div>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/30">
            <div className="text-2xl font-bold text-green-600">{stats.convertido}</div>
            <div className="text-sm text-zinc-600">Convertidos</div>
          </div>
        </div>

        {/* Busca */}
        <div className="glass rounded-2xl p-4 mb-6 border border-white/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por nome, email, telefone ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 bg-white/80 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Kanban Board */}
        <div className="relative group/kanban">
          {/* Seta esquerda */}
          <button
            onMouseEnter={() => {
              if (kanbanRef.current) {
                kanbanRef.current.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 border-blue-300 shadow-xl hover:bg-blue-50 hover:border-blue-500 transition-all opacity-0 group-hover/kanban:opacity-100 hover:scale-110 flex items-center justify-center text-blue-600 hover:shadow-blue-500/30"
            style={{ marginLeft: '-1.5rem' }}
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Seta direita */}
          <button
            onMouseEnter={() => {
              if (kanbanRef.current) {
                kanbanRef.current.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 border-blue-300 shadow-xl hover:bg-blue-50 hover:border-blue-500 transition-all opacity-0 group-hover/kanban:opacity-100 hover:scale-110 flex items-center justify-center text-blue-600 hover:shadow-blue-500/30"
            style={{ marginRight: '-1.5rem' }}
            aria-label="Rolar para direita"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={kanbanRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'thin', scrollPadding: '1rem' }}
            onDragOver={(e) => {
              e.preventDefault();
              handleAutoScroll(e);
            }}
          >
          {statusOrder.map((status) => {
            const config = statusConfig[status];
            const statusLeads = getLeadsByStatus(status);
            const StatusIcon = config.icon;

            return (
              <div
                key={status}
                className="kanban-column flex flex-col min-w-[320px] max-w-[320px] transition-all flex-shrink-0"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => {
                  handleDrop(e, status);
                }}
              >
                {/* Header da Coluna */}
                <div
                  className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-5 mb-4 shadow-sm`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${config.color} shadow-sm`}></div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-4 h-4 ${config.textColor}`} />
                        <h3 className="font-bold text-zinc-900 text-base">{config.label}</h3>
                      </div>
                    </div>
                    <span className={`${config.textColor} text-sm font-bold bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm min-w-[2rem] text-center`}>
                      {statusLeads.length}
                    </span>
                  </div>
                </div>

                {/* Cards da Coluna */}
                <div className="flex-1 space-y-4 min-h-[200px] relative w-full">
                  {statusLeads.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400 text-sm bg-zinc-50/50 rounded-xl border-2 border-dashed border-zinc-200">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-2">
                          <Plus className="w-6 h-6 text-zinc-400" />
                        </div>
                        <span>Nenhum lead</span>
                      </div>
                    </div>
                  ) : (
                    statusLeads.map((lead) => {
                      const leadStatus = (lead.status || "novo") as keyof typeof statusConfig;
                      const statusColor = statusConfig[leadStatus];
                      
                      return (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead)}
                        onDragEnd={handleDragEnd}
                        className={`relative glass rounded-2xl p-5 border-2 border-blue-800 cursor-move hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/95 backdrop-blur-sm active:cursor-grabbing card-glow hover:border-${statusColor.color.replace('bg-', '')} w-full`}
                        style={{
                          boxShadow: '0 0 0 1px rgba(30, 58, 138, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          zIndex: 1,
                          position: 'relative',
                          marginBottom: '1rem',
                        }}
                        onMouseEnter={(e) => {
                          // Muda a borda para a cor do status no hover
                          const colorMap: Record<string, string> = {
                            'bg-blue-500': 'rgb(59, 130, 246)',
                            'bg-yellow-500': 'rgb(234, 179, 8)',
                            'bg-purple-500': 'rgb(168, 85, 247)',
                            'bg-green-500': 'rgb(34, 197, 94)',
                            'bg-red-500': 'rgb(239, 68, 68)',
                          };
                          const hoverColor = colorMap[statusColor.color] || 'rgb(59, 130, 246)';
                          (e.currentTarget as HTMLElement).style.borderColor = hoverColor;
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${hoverColor}40, 0 8px 16px -4px ${hoverColor}30`;
                        }}
                        onMouseLeave={(e) => {
                          // Volta para azul escuro quando sai o mouse
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgb(30, 58, 138)';
                          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(30, 58, 138, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-bold text-zinc-900 text-base leading-tight pr-2">{lead.name}</h4>
                              {lead.source === "chatbot" && (
                                <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 text-white text-[10px] font-semibold">
                                  IA
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-3">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{new Date(lead.timestamp).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-zinc-700 bg-zinc-50 rounded-lg px-3 py-2">
                              <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                              <span className="truncate font-medium">{lead.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-700 bg-zinc-50 rounded-lg px-3 py-2">
                              <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="font-medium">{lead.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-700 bg-zinc-50 rounded-lg px-3 py-2">
                              <Tag className="w-4 h-4 text-orange-500 flex-shrink-0" />
                              <span className="truncate font-medium">{lead.service}</span>
                            </div>
                          </div>

                          {lead.message && (
                            <div className="text-xs text-zinc-700 line-clamp-3 flex items-start gap-2 bg-blue-50/50 rounded-lg p-3 border border-blue-100">
                              <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-3 leading-relaxed">{lead.message}</span>
                            </div>
                          )}

                          {lead.notes && (
                            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-300 rounded-xl p-4 text-xs text-blue-900 shadow-sm hover:shadow-md transition-shadow">
                              <div className="font-bold mb-2 flex items-center gap-2 text-blue-700">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                  <Edit className="w-3 h-3 text-white" />
                                </div>
                                <span>Notas</span>
                              </div>
                              <div className="line-clamp-2 leading-relaxed text-blue-800 pl-8">{lead.notes}</div>
                            </div>
                          )}

                          <div className="flex gap-2 pt-3 border-t border-zinc-200/50">
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setNotes(lead.notes || "");
                              }}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg !bg-gradient-to-r !from-blue-500 !via-blue-600 !to-indigo-600 text-white hover:!from-blue-600 hover:!via-blue-700 hover:!to-indigo-700 transition-all text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                              style={{
                                background: 'linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235), rgb(79, 70, 229))',
                              }}
                            >
                              <Edit className="w-3.5 h-3.5" />
                              {lead.notes ? "Editar nota" : "Adicionar nota"}
                            </button>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-xs font-semibold hover:scale-105 active:scale-95"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </Container>

      {/* Modal de Notas */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeInUp">
          <div className="glass rounded-3xl p-8 max-w-lg w-full border-2 border-blue-200 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
            {/* Decoração de fundo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-orange-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900">{selectedLead.name}</h3>
                    <p className="text-sm text-zinc-600 flex items-center gap-1 mt-1">
                      <Mail className="w-3.5 h-3.5" />
                      {selectedLead.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Edit className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-zinc-900">
                    {selectedLead.notes ? "Editar Notas" : "Adicionar Notas"}
                  </h4>
                </div>
              </div>

              {/* Textarea */}
              <div className="mb-6">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Digite suas notas sobre este lead... Ex: Cliente interessado em automação, orçamento de R$ 5.000, prazo de 30 dias..."
                  rows={8}
                  className="w-full rounded-2xl border-2 border-zinc-200 bg-white/90 backdrop-blur-sm px-5 py-4 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all text-sm text-zinc-800 placeholder:text-zinc-400 resize-none shadow-inner"
                />
                <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  Suas notas são privadas e visíveis apenas para você
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-3">
                <button
                  onClick={() => updateNotes(selectedLead.id)}
                  className="flex-1 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-6 py-4 text-white font-bold hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Salvar Notas
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button
                  onClick={() => {
                    setSelectedLead(null);
                    setNotes("");
                  }}
                  className="px-6 py-4 rounded-2xl border-2 border-zinc-300 bg-white/80 hover:bg-zinc-50 hover:border-zinc-400 transition-all font-semibold text-zinc-700 hover:scale-105 active:scale-95"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
