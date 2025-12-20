# 🚀 Coolify - Passo a Passo Visual

Guia visual para criar a aplicação Beste Web no Coolify.

## 📍 Você está aqui: "New Resource"

Na tela atual, você vê:
- Campo de busca "Application"
- Seção "Docker Based"
- Seção "Services"

## 🎯 Passo 1: Procurar por "Application"

1. **No campo de busca "Application"** (onde está o cursor), digite: `application` ou `git`
2. Ou procure por uma opção que diga algo como:
   - "Git Repository"
   - "Application from Git"
   - "GitHub Application"
   - "Source: Git"

## 🔍 Passo 2: Selecionar o Tipo de Recurso

Você deve encontrar uma opção para criar uma aplicação a partir de um repositório Git. Pode aparecer como:

- **"Application"** (com ícone de código)
- **"Git Repository"** 
- **"Source: GitHub/GitLab"**

Clique nessa opção.

## 📦 Passo 3: Configurar a Aplicação

Após clicar, você verá um formulário. Preencha:

### Informações Básicas:
- **Name**: `beste-web`
- **Description**: (opcional) `Site institucional e CRM Beste Web`

### Repositório:
- **Repository URL**: `https://github.com/EltonSA/site-beste.git`
- **Branch**: `main`
- **Build Pack**: Deixe como `nixpacks` (detecta Next.js automaticamente)

### Porta:
- **Port**: `3000` (padrão do Next.js)

## ⚙️ Passo 4: Variáveis de Ambiente

Procure por uma seção "Environment Variables" ou "Env Vars" e adicione:

```env
NODE_ENV=production
OPENAI_API_KEY=sk-sua-chave-aqui
ADMIN_PASSWORD=sua-senha-forte-aqui
PORT=3000
```

## 💾 Passo 5: Configurar Volume (IMPORTANTE!)

Procure por "Volumes", "Storage" ou "Persistent Storage" e adicione:

- **Path**: `/app/data`
- **Mount Point**: `/app/data`

Isso mantém os dados dos leads salvos.

## 🌐 Passo 6: Configurar Domínio

Procure por "Domains" ou "Custom Domain" e adicione:

- `besteweb.com.br`
- `www.besteweb.com.br`

O Coolify configurará SSL automaticamente.

## 🚀 Passo 7: Deploy

1. Clique em **"Deploy"** ou **"Save & Deploy"**
2. Aguarde o build (pode levar alguns minutos)
3. Acompanhe os logs em tempo real

## 🔄 Se não encontrar "Application" na busca

Tente estas alternativas:

1. **Verifique o menu lateral esquerdo**:
   - Procure por "Applications" ou "Apps"
   - Pode estar em uma seção separada

2. **Verifique se há um botão "+" ou "Create"**:
   - No topo da página
   - Ou no menu lateral

3. **Verifique a versão do Coolify**:
   - Você está na versão `4.0.0-beta.442`
   - A interface pode variar entre versões

## 📸 Dica: O que procurar

Na interface do Coolify, procure por:
- ✅ Ícone de código/folder (aplicação)
- ✅ Opção que menciona "Git", "GitHub", "Repository"
- ✅ Opção que não seja "Docker Compose" ou "Service"

## 🆘 Se ainda não encontrar

1. **Tire uma captura de tela** da tela atual
2. Ou me diga quais opções você vê no campo de busca quando digita "application"
3. Ou verifique se há um menu "Applications" no sidebar esquerdo

## ✅ Checklist Rápido

- [ ] Encontrou opção "Application" ou similar
- [ ] Configurou repositório: `https://github.com/EltonSA/site-beste.git`
- [ ] Branch: `main`
- [ ] Porta: `3000`
- [ ] Variáveis de ambiente configuradas
- [ ] Volume `/app/data` configurado
- [ ] Domínio configurado
- [ ] Deploy iniciado

