# 🔧 Troubleshooting - Problemas Comuns

## ❌ Site não carrega no domínio

### 1. Verificar se a aplicação está rodando

```bash
# Ver status do PM2
pm2 status

# Se não estiver rodando, iniciar:
pm2 start npm --name "beste-web" -- start

# Ver logs para erros
pm2 logs beste-web --lines 50
```

### 2. Verificar se a porta 3000 está acessível

```bash
# Verificar se a aplicação está escutando na porta 3000
sudo netstat -tulpn | grep 3000
# ou
sudo ss -tulpn | grep 3000

# Testar localmente
curl http://localhost:3000
```

### 3. Verificar configuração do Nginx

```bash
# Verificar se o site está habilitado
ls -la /etc/nginx/sites-enabled/

# Verificar configuração
sudo nginx -t

# Ver logs do Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### 4. Verificar se o Nginx está rodando

```bash
# Status do Nginx
sudo systemctl status nginx

# Se não estiver rodando:
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 5. Verificar DNS do domínio

```bash
# Verificar se o domínio aponta para o IP correto
nslookup besteweb.com.br
# ou
dig besteweb.com.br

# Verificar IP da VPS
curl ifconfig.me
```

### 6. Verificar firewall

```bash
# Ver regras do UFW
sudo ufw status

# Se necessário, permitir portas:
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
```

### 7. Verificar variáveis de ambiente

```bash
# Verificar se .env.local existe e tem as variáveis
cat .env.local

# Verificar se NODE_ENV está como production
grep NODE_ENV .env.local
```

### 8. Verificar permissões

```bash
# Verificar permissões do diretório
ls -la /var/www/site-beste

# Ajustar se necessário
sudo chown -R $USER:$USER /var/www/site-beste
chmod -R 755 /var/www/site-beste
```

## 🔍 Diagnóstico Rápido

Execute este script para verificar tudo:

```bash
#!/bin/bash
echo "=== Verificando Aplicação ==="
pm2 status
echo ""
echo "=== Verificando Porta 3000 ==="
sudo netstat -tulpn | grep 3000
echo ""
echo "=== Verificando Nginx ==="
sudo systemctl status nginx --no-pager
echo ""
echo "=== Verificando Configuração Nginx ==="
sudo nginx -t
echo ""
echo "=== Últimos logs do PM2 ==="
pm2 logs beste-web --lines 10 --nostream
echo ""
echo "=== Últimos logs do Nginx (erro) ==="
sudo tail -5 /var/log/nginx/error.log
```

## 🚨 Problemas Comuns e Soluções

### Erro: "502 Bad Gateway"
- **Causa**: Aplicação não está rodando ou porta errada
- **Solução**: 
  ```bash
  pm2 restart beste-web
  # Verificar se está na porta 3000
  ```

### Erro: "Connection refused"
- **Causa**: Firewall bloqueando ou aplicação não iniciou
- **Solução**:
  ```bash
  sudo ufw allow 3000/tcp
  pm2 restart beste-web
  ```

### Erro: "Cannot GET /"
- **Causa**: Build não foi feito ou está desatualizado
- **Solução**:
  ```bash
  npm run build
  pm2 restart beste-web
  ```

### Site carrega mas dá erro 500
- **Causa**: Erro na aplicação ou variáveis de ambiente
- **Solução**:
  ```bash
  pm2 logs beste-web --lines 50
  # Verificar .env.local
  cat .env.local
  ```

### Nginx não inicia
- **Causa**: Erro de sintaxe na configuração
- **Solução**:
  ```bash
  sudo nginx -t
  # Corrigir erros mostrados
  ```

## 📝 Checklist de Verificação

Execute cada item:

```bash
# 1. Aplicação rodando?
pm2 list | grep beste-web

# 2. Porta 3000 ativa?
curl http://localhost:3000

# 3. Nginx rodando?
sudo systemctl status nginx

# 4. Configuração OK?
sudo nginx -t

# 5. Firewall permitindo?
sudo ufw status | grep -E "80|443"

# 6. DNS correto?
nslookup besteweb.com.br

# 7. Build existe?
ls -la .next/

# 8. Variáveis de ambiente?
cat .env.local | grep -v "PASSWORD\|API_KEY"
```

## 🆘 Se nada funcionar

1. **Reiniciar tudo**:
```bash
pm2 restart beste-web
sudo systemctl restart nginx
```

2. **Ver logs completos**:
```bash
pm2 logs beste-web --lines 100
sudo journalctl -u nginx -n 50
```

3. **Testar localmente primeiro**:
```bash
# Na VPS, testar:
curl http://localhost:3000
# Se funcionar localmente, problema é no Nginx/DNS
```

