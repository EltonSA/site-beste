#!/bin/bash

# Script para corrigir problemas de porta e iniciar aplicação
# Execute na VPS: bash fix-vps.sh

set -e

echo "🔧 CORRIGINDO CONFIGURAÇÃO DA VPS"
echo "=================================="
echo ""

cd /var/www/site-beste

# 1. Parar aplicação atual
echo "1️⃣ Parando aplicação atual..."
pm2 stop beste-web 2>/dev/null || true
pm2 delete beste-web 2>/dev/null || true

# 2. Iniciar na porta 3001
echo "2️⃣ Iniciando aplicação na porta 3001..."
PORT=3001 pm2 start npm --name "beste-web" -- start

# 3. Salvar configuração
echo "3️⃣ Salvando configuração do PM2..."
pm2 save

# 4. Verificar se está rodando
echo "4️⃣ Verificando se está rodando..."
sleep 3
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Aplicação rodando na porta 3001!"
else
    echo "❌ Erro ao iniciar aplicação. Verifique os logs:"
    pm2 logs beste-web --lines 20
    exit 1
fi

# 5. Verificar configuração do Nginx
echo "5️⃣ Verificando configuração do Nginx..."
if grep -q "proxy_pass http://localhost:3001" /etc/nginx/sites-available/beste-web 2>/dev/null; then
    echo "✅ Nginx já configurado para porta 3001"
else
    echo "⚠️  Nginx precisa ser atualizado para porta 3001"
    echo "   Edite: sudo nano /etc/nginx/sites-available/beste-web"
    echo "   Altere proxy_pass para: http://localhost:3001"
fi

# 6. Verificar o que está usando porta 80
echo "6️⃣ Verificando porta 80..."
if sudo netstat -tulpn 2>/dev/null | grep -q ":80 " || sudo ss -tulpn 2>/dev/null | grep -q ":80 "; then
    echo "⚠️  Porta 80 está em uso:"
    sudo netstat -tulpn 2>/dev/null | grep ":80 " || sudo ss -tulpn 2>/dev/null | grep ":80 "
    echo ""
    echo "   Se for outro Nginx, você pode iniciar normalmente:"
    echo "   sudo systemctl start nginx"
    echo ""
    echo "   Se for outro serviço, você precisa parar ou configurar diferente"
else
    echo "✅ Porta 80 está livre"
    echo "   Iniciando Nginx..."
    sudo systemctl start nginx 2>/dev/null || echo "⚠️  Nginx não iniciou. Verifique: sudo systemctl status nginx"
fi

echo ""
echo "=================================="
echo "✅ CORREÇÃO CONCLUÍDA!"
echo ""
echo "📊 Status:"
pm2 status | grep beste-web
echo ""
echo "🧪 Teste:"
echo "   curl http://localhost:3001"
echo ""
echo "🌐 Próximos passos:"
echo "   1. Verifique se o Nginx está configurado corretamente"
echo "   2. Inicie o Nginx: sudo systemctl start nginx"
echo "   3. Teste o domínio: curl -I http://besteweb.com.br"

