# 🚀 Guia de Deploy na VPS

Este guia mostra como fazer deploy do site Beste Web em uma VPS (Ubuntu/Debian).

## 📋 Pré-requisitos

- VPS com Ubuntu 20.04+ ou Debian 11+
- Acesso SSH à VPS
- Domínio apontado para o IP da VPS (opcional, mas recomendado)

## 🔧 Passo 1: Conectar na VPS

```bash
ssh usuario@seu-ip-vps
```

## 📦 Passo 2: Instalar Dependências

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Git
sudo apt install -y git

# Instalar PM2 (gerenciador de processos)
sudo npm install -g pm2

# Instalar Nginx (reverse proxy)
sudo apt install -y nginx

# Instalar Certbot (para SSL)
sudo apt install -y certbot python3-certbot-nginx
```

## 📥 Passo 3: Clonar o Repositório

```bash
# Criar diretório para aplicações
sudo mkdir -p /var/www
cd /var/www

# Clonar repositório
sudo git clone https://github.com/EltonSA/site-beste.git
sudo chown -R $USER:$USER /var/www/site-beste
cd site-beste
```

## ⚙️ Passo 4: Configurar Variáveis de Ambiente

```bash
# Criar arquivo .env.local
nano .env.local
```

Adicione:
```env
OPENAI_API_KEY=sk-sua-chave-aqui
ADMIN_PASSWORD=sua-senha-forte-aqui
NODE_ENV=production
```

Salve com `Ctrl+X`, depois `Y`, depois `Enter`.

## 🔨 Passo 5: Instalar Dependências e Build

```bash
# Instalar dependências
npm install

# Fazer build de produção
npm run build
```

## 🚀 Passo 6: Configurar PM2

```bash
# Iniciar aplicação com PM2
pm2 start npm --name "beste-web" -- start

# Salvar configuração do PM2
pm2 save

# Configurar PM2 para iniciar no boot
pm2 startup
# Execute o comando que aparecer (geralmente algo como: sudo env PATH=...)
```

## 🌐 Passo 7: Configurar Nginx

```bash
# Criar configuração do Nginx
sudo nano /etc/nginx/sites-available/beste-web
```

Adicione:
```nginx
server {
    listen 80;
    server_name besteweb.com.br www.besteweb.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ativar o site:
```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/beste-web /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

## 🔒 Passo 8: Configurar SSL (HTTPS)

```bash
# Obter certificado SSL
sudo certbot --nginx -d besteweb.com.br -d www.besteweb.com.br

# O Certbot vai renovar automaticamente, mas você pode testar com:
sudo certbot renew --dry-run
```

## 📁 Passo 9: Configurar Persistência de Dados

⚠️ **IMPORTANTE**: Em VPS, o diretório `/data` será persistente. Mas é recomendado fazer backup:

```bash
# Criar script de backup
nano /var/www/site-beste/backup.sh
```

Adicione:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/beste-web"
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/data_backup_$DATE.tar.gz /var/www/site-beste/data
# Manter apenas últimos 7 backups
find $BACKUP_DIR -name "data_backup_*.tar.gz" -mtime +7 -delete
```

Tornar executável:
```bash
chmod +x /var/www/site-beste/backup.sh
```

## 🔄 Passo 10: Comandos Úteis

```bash
# Ver logs da aplicação
pm2 logs beste-web

# Reiniciar aplicação
pm2 restart beste-web

# Parar aplicação
pm2 stop beste-web

# Ver status
pm2 status

# Atualizar código
cd /var/www/site-beste
git pull
npm install
npm run build
pm2 restart beste-web

# Ver logs do Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 🔐 Passo 11: Firewall (Opcional mas Recomendado)

```bash
# Instalar UFW
sudo apt install -y ufw

# Permitir SSH, HTTP e HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Ativar firewall
sudo ufw enable
```

## 📊 Monitoramento

```bash
# Monitorar recursos
pm2 monit

# Ver informações do sistema
htop
```

## ⚠️ Troubleshooting

Veja o arquivo `TROUBLESHOOTING.md` para diagnóstico completo.

### Diagnóstico Rápido

```bash
# 1. Verificar se aplicação está rodando
pm2 status

# 2. Verificar se porta 3000 está ativa
curl http://localhost:3000

# 3. Verificar Nginx
sudo systemctl status nginx
sudo nginx -t

# 4. Ver logs
pm2 logs beste-web --lines 50
sudo tail -f /var/log/nginx/error.log
```

### Problemas Comuns

**502 Bad Gateway**: Aplicação não está rodando
```bash
pm2 restart beste-web
```

**Connection Refused**: Firewall ou aplicação não iniciou
```bash
sudo ufw allow 3000/tcp
pm2 restart beste-web
```

**Erro 500**: Verificar logs e variáveis de ambiente
```bash
pm2 logs beste-web
cat .env.local
```

## 🔄 Atualizações Futuras

Para atualizar o código:

```bash
cd /var/www/site-beste
git pull origin main
npm install
npm run build
pm2 restart beste-web
```

## 📝 Checklist Final

- [ ] Node.js instalado
- [ ] Repositório clonado
- [ ] `.env.local` configurado
- [ ] Build executado com sucesso
- [ ] PM2 configurado e rodando
- [ ] Nginx configurado
- [ ] SSL configurado (se tiver domínio)
- [ ] Firewall configurado
- [ ] Backup configurado
- [ ] Site acessível

## 🆘 Suporte

Se tiver problemas, verifique:
1. Logs do PM2: `pm2 logs beste-web`
2. Logs do Nginx: `sudo tail -f /var/log/nginx/error.log`
3. Status do serviço: `pm2 status`
4. Porta 3000: `sudo netstat -tulpn | grep 3000`

