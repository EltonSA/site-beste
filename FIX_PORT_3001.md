# 🔧 Correção: Porta 3001 (Conflito com Chat Woot)

Como você já tem o Chat Woot rodando na porta 3000, vamos configurar o Beste Web para usar a porta 3001.

## ✅ Solução Rápida

Execute estes comandos na sua VPS:

```bash
cd /var/www/site-beste

# 1. Parar a aplicação atual
pm2 stop beste-web
pm2 delete beste-web

# 2. Iniciar na porta 3001
PORT=3001 pm2 start npm --name "beste-web" -- start

# 3. Salvar configuração
pm2 save

# 4. Verificar se está rodando
pm2 status
curl http://localhost:3001
```

## 🔍 Verificar o que está usando a porta 80

O Nginx não está iniciando porque algo já está usando a porta 80. Vamos verificar:

```bash
# Ver o que está usando a porta 80
sudo netstat -tulpn | grep :80
# ou
sudo ss -tulpn | grep :80

# Se for outro Nginx ou serviço, você pode:
# - Parar o serviço temporariamente
# - Ou configurar o Nginx para usar outra porta
# - Ou usar o mesmo Nginx para ambos os serviços
```

## 🌐 Configurar Nginx (se ainda não estiver configurado)

Se o Nginx já está configurado para porta 3001 (como mostrado no diagnóstico), só precisa iniciar:

```bash
# Verificar configuração
cat /etc/nginx/sites-available/beste-web

# Se estiver correto (proxy_pass http://localhost:3001), iniciar:
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 🚨 Se a porta 80 estiver em uso por outro serviço

Opções:

### Opção 1: Usar o mesmo Nginx para múltiplos serviços
Se você já tem um Nginx rodando, adicione a configuração do Beste Web nele:

```bash
# Editar configuração existente
sudo nano /etc/nginx/sites-available/default
# ou
sudo nano /etc/nginx/nginx.conf

# Adicionar o server block do Beste Web
```

### Opção 2: Parar o serviço que está usando a porta 80
```bash
# Identificar o processo
sudo lsof -i :80
# ou
sudo fuser -k 80/tcp

# Parar o serviço (cuidado!)
sudo systemctl stop <nome-do-servico>
```

### Opção 3: Usar porta diferente para Nginx
Não recomendado, mas possível se necessário.

## ✅ Verificação Final

```bash
# 1. Aplicação rodando na 3001?
curl http://localhost:3001

# 2. Nginx rodando?
sudo systemctl status nginx

# 3. Testar domínio
curl -I http://besteweb.com.br
```

## 📝 Atualizar .env.local (Opcional)

Você pode adicionar a porta no `.env.local`:

```bash
nano .env.local
```

Adicione:
```env
PORT=3001
```

Mas não é necessário, pois já configuramos no PM2.

