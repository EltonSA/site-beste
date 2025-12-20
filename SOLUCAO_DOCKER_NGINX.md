# 🔧 Solução: Docker na Porta 80 + Nginx

O Docker está usando a porta 80, impedindo o Nginx de iniciar. Aqui estão as soluções:

## 🎯 Solução Recomendada: Nginx como Proxy Reverso

Configure o Nginx para fazer proxy tanto para o Docker (Chat Woot) quanto para o Beste Web.

### Passo 1: Identificar a porta do Docker

```bash
# Ver qual porta o Docker está usando internamente
docker ps
# Procure pela coluna PORTS, geralmente algo como: 0.0.0.0:80->3000/tcp
# O número depois do -> é a porta interna do container
```

### Passo 2: Configurar Nginx para ambos os serviços

Edite o arquivo do Nginx:

```bash
sudo nano /etc/nginx/sites-available/beste-web
```

**Opção A**: Se o Chat Woot tem domínio próprio (ex: chat.besteweb.com.br):

```nginx
# Chat Woot
server {
    listen 80;
    server_name chat.besteweb.com.br;

    location / {
        proxy_pass http://localhost:8080;  # Porta interna do Docker
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

# Beste Web
server {
    listen 80;
    server_name besteweb.com.br www.besteweb.com.br;

    location / {
        proxy_pass http://localhost:3001;
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

**Opção B**: Se ambos usam o mesmo domínio (com paths diferentes):

```nginx
server {
    listen 80;
    server_name besteweb.com.br www.besteweb.com.br;

    # Chat Woot em /chat
    location /chat {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Beste Web (raiz)
    location / {
        proxy_pass http://localhost:3001;
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

### Passo 3: Reconfigurar Docker para não usar porta 80 diretamente

```bash
# Parar o container
docker stop <nome-do-container>

# Reiniciar com mapeamento diferente (ex: 8080:3000)
# Isso depende de como você iniciou o container
# Se usar docker-compose, edite o docker-compose.yml:
#   ports:
#     - "8080:3000"  # Em vez de "80:3000"
```

### Passo 4: Iniciar Nginx

```bash
# Testar configuração
sudo nginx -t

# Iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verificar status
sudo systemctl status nginx
```

## 🚨 Solução Alternativa: Parar Docker Temporariamente

Se você não precisa do Chat Woot no momento:

```bash
# Identificar container
docker ps

# Parar container
docker stop <nome-do-container>

# Iniciar Nginx
sudo systemctl start nginx

# Depois, reconfigurar Docker para usar outra porta
```

## ✅ Verificação

```bash
# Verificar se Nginx está rodando
sudo systemctl status nginx

# Verificar se porta 80 está livre (deve mostrar nginx)
sudo lsof -i :80

# Testar Beste Web
curl -I http://besteweb.com.br

# Testar Chat Woot (se configurado)
curl -I http://chat.besteweb.com.br
```

## 📝 Notas Importantes

1. **Não pare o Docker permanentemente** se o Chat Woot estiver em uso
2. **Use o Nginx como proxy** para ambos os serviços
3. **Reconfigure o Docker** para usar porta interna (ex: 8080) e deixe o Nginx na 80
4. **SSL/HTTPS**: Depois de configurar, use Certbot para ambos os domínios

