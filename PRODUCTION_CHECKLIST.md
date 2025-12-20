# ✅ Checklist de Produção

Use este checklist antes de fazer deploy em produção.

## 🔒 Segurança

- [ ] **Variáveis de Ambiente Configuradas**
  - [ ] `OPENAI_API_KEY` configurada
  - [ ] `ADMIN_PASSWORD` configurada com senha forte (mínimo 12 caracteres)
  - [ ] `NODE_ENV=production` definido

- [ ] **Arquivos Sensíveis**
  - [ ] `.env.local` NÃO está no Git (verificado no `.gitignore`)
  - [ ] `/data` está no `.gitignore` (banco de dados local)
  - [ ] Nenhuma credencial hardcoded no código

- [ ] **Autenticação**
  - [ ] Senha do admin não é "admin123" em produção
  - [ ] Cookie de sessão com `secure: true` em produção
  - [ ] Considerar implementar hash de senha (bcrypt) em produção

## 🗄️ Banco de Dados

- [ ] **Backup**
  - [ ] Estratégia de backup do diretório `/data` definida
  - [ ] Backup automático configurado (se necessário)

- [ ] **Persistência**
  - [ ] Em servidores serverless (Vercel, Netlify), considerar banco de dados externo
  - [ ] Arquivos JSON locais podem ser perdidos em deployments serverless

## 🌐 Deploy

- [ ] **Build**
  - [ ] `npm run build` executa sem erros
  - [ ] Nenhum warning crítico no build

- [ ] **Variáveis de Ambiente no Provedor**
  - [ ] Todas as variáveis configuradas no painel do provedor
  - [ ] `NODE_ENV=production` definido

- [ ] **Domínio e SSL**
  - [ ] Domínio configurado
  - [ ] SSL/HTTPS ativado
  - [ ] Redirecionamento HTTP → HTTPS configurado

## 🧪 Testes

- [ ] **Funcionalidades**
  - [ ] Formulário de contato funciona
  - [ ] Chatbot responde corretamente
  - [ ] Login no dashboard funciona
  - [ ] Kanban de leads funciona
  - [ ] Drag and drop funciona
  - [ ] Atualização automática de leads funciona

- [ ] **Responsividade**
  - [ ] Site funciona em mobile (< 770px)
  - [ ] Dashboard responsivo
  - [ ] Chatbot funciona em mobile

## 📊 Monitoramento

- [ ] **Logs**
  - [ ] Logs de erro configurados
  - [ ] Monitoramento de erros (Sentry, LogRocket, etc.) - opcional

- [ ] **Performance**
  - [ ] Lighthouse score > 80
  - [ ] Imagens otimizadas
  - [ ] Bundle size verificado

## 🔍 Revisão Final

- [ ] **Código**
  - [ ] Nenhum `console.log` com dados sensíveis
  - [ ] Tratamento de erros adequado
  - [ ] Validações de input implementadas

- [ ] **Documentação**
  - [ ] README.md atualizado
  - [ ] ENV_SETUP.md atualizado
  - [ ] Comentários no código quando necessário

## ⚠️ Avisos Importantes

1. **Banco de Dados Local**: Em servidores serverless (Vercel, Netlify), o diretório `/data` é temporário e pode ser perdido. Considere usar um banco de dados externo (PostgreSQL, MongoDB, etc.) em produção.

2. **Autenticação**: A autenticação atual é básica. Para maior segurança, considere:
   - Hash de senhas com bcrypt
   - JWT tokens
   - Rate limiting no login

3. **Logs**: Remova ou desative logs de debug em produção para não expor informações sensíveis.

4. **Rate Limiting**: Considere implementar rate limiting nas APIs para prevenir abuso.

