import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "leads.json");
const USERS_PATH = path.join(process.cwd(), "data", "users.json");

// Garantir que o diretório existe
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Tipos
export interface Lead {
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

export interface User {
  id: string;
  email: string;
  password: string; // Em produção, usar hash
  name: string;
}

// Funções para Leads
export function getLeads(): Lead[] {
  ensureDataDir();
  if (!fs.existsSync(DB_PATH)) {
    return [];
  }
  try {
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveLead(lead: Omit<Lead, "id">): Lead {
  ensureDataDir();
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    status: lead.status || "novo",
  };
  leads.push(newLead);
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
  return newLead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  ensureDataDir();
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], ...updates };
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
  return leads[index];
}

export function deleteLead(id: string): boolean {
  ensureDataDir();
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  fs.writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2));
  return true;
}

// Funções para Usuários
export function getUsers(): User[] {
  ensureDataDir();
  const defaultPassword = process.env.ADMIN_PASSWORD || "admin123"; // Fallback para desenvolvimento
  
  if (!fs.existsSync(USERS_PATH)) {
    // Criar usuário padrão usando senha do .env
    const defaultUser: User = {
      id: "1",
      email: "admin@besteweb.com.br",
      password: defaultPassword, // Em produção, usar hash!
      name: "Administrador",
    };
    fs.writeFileSync(USERS_PATH, JSON.stringify([defaultUser], null, 2));
    return [defaultUser];
  }
  
  try {
    const data = fs.readFileSync(USERS_PATH, "utf-8");
    const users = JSON.parse(data);
    
    // Sempre sincroniza a senha do usuário admin com o .env
    const adminUser = users.find((u: User) => u.email === "admin@besteweb.com.br");
    if (adminUser && adminUser.password !== defaultPassword) {
      adminUser.password = defaultPassword;
      fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
      if (process.env.NODE_ENV === "development") {
        console.log("Senha do admin atualizada com sucesso");
      }
    }
    
    return users;
  } catch {
    return [];
  }
}

export function getUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find((u) => u.email === email) || null;
}

