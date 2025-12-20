# Beste Web - Site Institucional e CRM

Site institucional da Beste Web com sistema interno de CRM para gerenciamento de leads.

## 🚀 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **OpenAI GPT-4o-mini** - Chatbot com IA
- **n8n** - Automação de webhooks

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta OpenAI (para o chatbot)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd beste-we-site
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o `.env.local` e adicione:
```env
OPENAI_API_KEY=sk-sua-chave-aqui
ADMIN_PASSWORD=sua-senha-segura-aqui
NODE_ENV=production
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🏗️ Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
beste-we-site/
├── src/
│   ├── app/              # Rotas e páginas
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # CRM interno
│   │   └── ...
│   ├── components/       # Componentes React
│   ├── lib/             # Utilitários e banco de dados
│   └── styles/          # Estilos globais
├── data/                # Banco de dados local (JSON)
└── public/              # Arquivos estáticos
```

## 🔐 Segurança

⚠️ **IMPORTANTE PARA PRODUÇÃO:**

1. **Senha do Admin**: Configure `ADMIN_PASSWORD` no `.env.local` com uma senha forte
2. **API Key OpenAI**: Mantenha a chave segura, nunca commite no Git
3. **Banco de Dados**: O diretório `/data` está no `.gitignore` e não será commitado
4. **Autenticação**: Atualmente usa sessão simples - considere implementar JWT em produção

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente:
   - `OPENAI_API_KEY`
   - `ADMIN_PASSWORD`
   - `NODE_ENV=production`
3. Deploy automático a cada push

### Outros Provedores

O projeto é compatível com qualquer provedor que suporte Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 📝 Variáveis de Ambiente

Veja `ENV_SETUP.md` para detalhes completos sobre as variáveis de ambiente.

### Obrigatórias:
- `OPENAI_API_KEY` - Chave da API OpenAI
- `ADMIN_PASSWORD` - Senha do administrador

### Opcionais:
- `N8N_WEBHOOK_TEST` - Webhook n8n para testes
- `N8N_WEBHOOK_PROD` - Webhook n8n para produção
- `NODE_ENV` - Ambiente (development/production)

## 🎯 Funcionalidades

- ✅ Site institucional responsivo
- ✅ Formulário de contato com integração n8n
- ✅ Chatbot com IA para primeiro atendimento
- ✅ CRM interno com visualização Kanban
- ✅ Sistema de autenticação
- ✅ Gerenciamento de leads
- ✅ Notas e status de leads

## 📞 Suporte

Para dúvidas ou problemas, entre em contato:
- Email: contato@besteweb.com.br
- WhatsApp: (41) 99830-6017

## 📄 Licença

Todos os direitos reservados © 2025 Beste Web
