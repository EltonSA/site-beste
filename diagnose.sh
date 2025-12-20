#!/bin/bash

# Script de diagnóstico rápido para VPS
# Execute na VPS: bash diagnose.sh

echo "🔍 DIAGNÓSTICO DO BESTE WEB"
echo "================================"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Verificar PM2
echo "1️⃣ Verificando PM2..."
if pm2 list | grep -q "beste-web"; then
    STATUS=$(pm2 jlist | jq -r '.[] | select(.name=="beste-web") | .pm2_env.status' 2>/dev/null || echo "unknown")
    if [ "$STATUS" = "online" ]; then
        echo -e "${GREEN}✅ PM2: Aplicação rodando${NC}"
    else
        echo -e "${RED}❌ PM2: Aplicação não está online (status: $STATUS)${NC}"
    fi
    pm2 list | grep beste-web
else
    echo -e "${RED}❌ PM2: Aplicação 'beste-web' não encontrada${NC}"
    echo "   Execute: pm2 start npm --name 'beste-web' -- start"
fi
echo ""

# 2. Verificar porta 3000
echo "2️⃣ Verificando porta 3000..."
if sudo netstat -tulpn 2>/dev/null | grep -q ":3000" || sudo ss -tulpn 2>/dev/null | grep -q ":3000"; then
    echo -e "${GREEN}✅ Porta 3000 está em uso${NC}"
    sudo netstat -tulpn 2>/dev/null | grep ":3000" || sudo ss -tulpn 2>/dev/null | grep ":3000"
else
    echo -e "${RED}❌ Porta 3000 não está em uso${NC}"
    echo "   A aplicação pode não ter iniciado corretamente"
fi
echo ""

# 3. Testar localhost
echo "3️⃣ Testando localhost:3000..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo -e "${GREEN}✅ Localhost responde (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ Localhost não responde (HTTP $HTTP_CODE)${NC}"
    echo "   Verifique os logs: pm2 logs beste-web"
fi
echo ""

# 4. Verificar Nginx
echo "4️⃣ Verificando Nginx..."
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx está rodando${NC}"
else
    echo -e "${RED}❌ Nginx não está rodando${NC}"
    echo "   Execute: sudo systemctl start nginx"
fi

# Verificar configuração
if sudo nginx -t 2>&1 | grep -q "successful"; then
    echo -e "${GREEN}✅ Configuração do Nginx está OK${NC}"
else
    echo -e "${RED}❌ Erro na configuração do Nginx${NC}"
    sudo nginx -t
fi
echo ""

# 5. Verificar site no Nginx
echo "5️⃣ Verificando configuração do site..."
if [ -f "/etc/nginx/sites-enabled/beste-web" ] || [ -L "/etc/nginx/sites-enabled/beste-web" ]; then
    echo -e "${GREEN}✅ Site configurado no Nginx${NC}"
    echo "   Configuração:"
    grep -E "server_name|proxy_pass" /etc/nginx/sites-enabled/beste-web 2>/dev/null | head -5
else
    echo -e "${RED}❌ Site não configurado no Nginx${NC}"
    echo "   Execute: sudo ln -s /etc/nginx/sites-available/beste-web /etc/nginx/sites-enabled/"
fi
echo ""

# 6. Verificar firewall
echo "6️⃣ Verificando firewall..."
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(sudo ufw status | head -1)
    echo "   Status: $UFW_STATUS"
    if echo "$UFW_STATUS" | grep -q "active"; then
        if sudo ufw status | grep -qE "80|443"; then
            echo -e "${GREEN}✅ Portas 80/443 permitidas${NC}"
        else
            echo -e "${YELLOW}⚠️  Portas 80/443 podem não estar permitidas${NC}"
        fi
    fi
else
    echo -e "${YELLOW}⚠️  UFW não instalado${NC}"
fi
echo ""

# 7. Verificar .env.local
echo "7️⃣ Verificando variáveis de ambiente..."
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ .env.local existe${NC}"
    if grep -q "OPENAI_API_KEY" .env.local && grep -q "ADMIN_PASSWORD" .env.local; then
        echo -e "${GREEN}✅ Variáveis obrigatórias configuradas${NC}"
    else
        echo -e "${RED}❌ Variáveis obrigatórias faltando${NC}"
    fi
else
    echo -e "${RED}❌ .env.local não encontrado${NC}"
    echo "   Crie o arquivo com: OPENAI_API_KEY e ADMIN_PASSWORD"
fi
echo ""

# 8. Verificar build
echo "8️⃣ Verificando build..."
if [ -d ".next" ]; then
    echo -e "${GREEN}✅ Diretório .next existe (build feito)${NC}"
else
    echo -e "${RED}❌ Diretório .next não existe${NC}"
    echo "   Execute: npm run build"
fi
echo ""

# 9. Últimos logs
echo "9️⃣ Últimos logs do PM2 (últimas 10 linhas):"
echo "----------------------------------------"
pm2 logs beste-web --lines 10 --nostream 2>/dev/null || echo "Não foi possível ler logs"
echo ""

echo "🔟 Últimos erros do Nginx:"
echo "----------------------------------------"
sudo tail -5 /var/log/nginx/error.log 2>/dev/null || echo "Não foi possível ler logs do Nginx"
echo ""

echo "================================"
echo "✅ Diagnóstico completo!"
echo ""
echo "📝 Próximos passos:"
echo "   1. Se PM2 não está rodando: pm2 start npm --name 'beste-web' -- start"
echo "   2. Se Nginx não está rodando: sudo systemctl start nginx"
echo "   3. Se há erros, verifique: pm2 logs beste-web"
echo "   4. Teste localmente: curl http://localhost:3000"

