# Configuração de Variáveis de Ambiente

Para o chatbot funcionar, você precisa configurar a API Key da OpenAI e a senha do administrador.

## Passos:

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione as seguintes variáveis:

```env
OPENAI_API_KEY=sk-sua-chave-aqui
ADMIN_PASSWORD=sua-senha-segura-aqui
```

## Como obter a API Key:

1. Acesse https://platform.openai.com/api-keys
2. Faça login ou crie uma conta
3. Clique em "Create new secret key"
4. Copie a chave e cole no arquivo `.env.local`

## Variáveis:

### Obrigatórias:
- `OPENAI_API_KEY`: Chave da API da OpenAI para o chatbot
- `ADMIN_PASSWORD`: Senha do usuário administrador (padrão: admin123 se não configurado)

### Opcionais:

```env
# N8N Webhooks (já configurados no código, mas podem ser sobrescritos)
N8N_WEBHOOK_TEST=https://n8n.besteweb.com.br/webhook-test/72045347-6382-49d2-a72e-b337e5e954e4
N8N_WEBHOOK_PROD=https://n8n.besteweb.com.br/webhook/72045347-6382-49d2-a72e-b337e5e954e4

# Ambiente
NODE_ENV=development
```

## Credenciais padrão:

- **Email**: admin@besteweb.com.br
- **Senha**: Definida pela variável `ADMIN_PASSWORD` no `.env.local` (ou "admin123" como fallback)

## Importante:

- Nunca commite o arquivo `.env.local` no Git
- O arquivo já está no `.gitignore`
- Reinicie o servidor após criar/editar o `.env.local`

