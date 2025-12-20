# 🚀 Deploy no Coolify

Guia completo para fazer deploy do Beste Web usando Coolify.

## 📋 Pré-requisitos

- Coolify instalado e rodando
- Acesso ao painel do Coolify
- Repositório GitHub configurado

## 🔧 Passo 1: Preparar o Projeto

O projeto já está pronto para Coolify! Não precisa de mudanças.

## 📦 Passo 2: Criar Aplicação no Coolify

1. **Acesse o painel do Coolify**
2. **Clique em "New Resource"** → **"Application"**
3. **Configure a aplicação:**
   - **Name**: `beste-web`
   - **Repository**: `https://github.com/EltonSA/site-beste.git`
   - **Branch**: `main`
   - **Build Pack**: `nixpacks` (detecta automaticamente Next.js)
   - **Port**: `3000` (padrão do Next.js)

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

No painel do Coolify, adicione as seguintes variáveis de ambiente:

```env
NODE_ENV=production
OPENAI_API_KEY=sk-sua-chave-aqui
ADMIN_PASSWORD=sua-senha-forte-aqui
PORT=3000
```

**Como adicionar:**
1. Na aplicação criada, vá em **"Environment Variables"**
2. Adicione cada variável uma por uma
3. Salve

## 🔨 Passo 4: Configurar Build

Coolify detecta automaticamente Next.js, mas você pode configurar:

**Build Command** (se necessário):
```bash
npm install && npm run build
```

**Start Command**:
```bash
npm start
```

## 🌐 Passo 5: Configurar Domínio

1. Na aplicação, vá em **"Domains"**
2. Adicione seu domínio: `besteweb.com.br`
3. Adicione também: `www.besteweb.com.br`
4. Coolify configurará SSL automaticamente com Let's Encrypt

## 💾 Passo 6: Configurar Persistência de Dados

⚠️ **IMPORTANTE**: O diretório `/data` precisa ser persistente.

1. Vá em **"Volumes"** ou **"Storage"**
2. Adicione um volume:
   - **Path**: `/app/data`
   - **Mount Point**: `/app/data`

Ou configure no `docker-compose.yml` do Coolify (se disponível):

```yaml
volumes:
  - ./data:/app/data
```

## 🚀 Passo 7: Deploy

1. Clique em **"Deploy"** ou **"Redeploy"**
2. Aguarde o build e deploy
3. Verifique os logs se houver problemas

## ✅ Verificação

Após o deploy:

1. **Verificar logs**:
   - No painel do Coolify, vá em **"Logs"**
   - Verifique se não há erros

2. **Testar aplicação**:
   ```bash
   curl https://besteweb.com.br
   ```

3. **Verificar banco de dados**:
   - Acesse o dashboard: `https://besteweb.com.br/dashboard`
   - Faça login e verifique se os leads estão sendo salvos

## 🔄 Atualizações Futuras

Para atualizar a aplicação:

1. Faça push para o GitHub:
   ```bash
   git push origin main
   ```

2. No Coolify, clique em **"Redeploy"** ou configure **auto-deploy** para fazer deploy automático a cada push.

## 📝 Configurações Adicionais

### Health Check

Configure um health check no Coolify:
- **Path**: `/`
- **Port**: `3000`

### Recursos

- **CPU**: Mínimo 0.5 CPU
- **RAM**: Mínimo 512MB (recomendado 1GB)
- **Storage**: Mínimo 1GB (para dados)

### Variáveis de Ambiente Opcionais

```env
# N8N Webhooks (já configurados no código, mas podem ser sobrescritos)
N8N_WEBHOOK_TEST=https://n8n.besteweb.com.br/webhook-test/72045347-6382-49d2-a72e-b337e5e954e4
N8N_WEBHOOK_PROD=https://n8n.besteweb.com.br/webhook/72045347-6382-49d2-a72e-b337e5e954e4
```

## 🐛 Troubleshooting

### Erro: "Cannot find module"
- Verifique se todas as dependências estão no `package.json`
- Force rebuild: **"Redeploy"** → **"Clean Build"**

### Erro: "Port already in use"
- Verifique se a porta está configurada corretamente
- Coolify geralmente gerencia isso automaticamente

### Dados não persistem
- Verifique se o volume está montado corretamente
- Verifique permissões do diretório `/data`

### Erro de variáveis de ambiente
- Verifique se todas as variáveis obrigatórias estão configuradas
- Verifique se não há espaços extras nos valores

## 📚 Recursos

- [Documentação do Coolify](https://coolify.io/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

