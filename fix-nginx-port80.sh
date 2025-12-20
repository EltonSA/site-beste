#!/bin/bash

# Script para resolver conflito de porta 80 e iniciar Nginx
# Execute na VPS: bash fix-nginx-port80.sh

echo "🔍 DIAGNOSTICANDO PORTA 80"
echo "=========================="
echo ""

# Verificar o que está usando porta 80
echo "1️⃣ Verificando o que está usando a porta 80..."
echo ""
PROCESS=$(sudo lsof -i :80 2>/dev/null | tail -n +2 | head -1)
if [ -z "$PROCESS" ]; then
    PROCESS=$(sudo fuser 80/tcp 2>/dev/null)
fi

if [ -n "$PROCESS" ]; then
    echo "⚠️  Porta 80 está em uso:"
    sudo netstat -tulpn | grep :80 || sudo ss -tulpn | grep :80
    echo ""
    
    # Tentar identificar o serviço
    PID=$(sudo lsof -i :80 2>/dev/null | tail -n +2 | awk '{print $2}' | head -1)
    if [ -n "$PID" ]; then
        SERVICE=$(ps -p $PID -o comm= 2>/dev/null)
        echo "   Processo: $SERVICE (PID: $PID)"
        
        # Verificar se é Nginx
        if echo "$SERVICE" | grep -qi "nginx"; then
            echo "   ✅ É o Nginx! Provavelmente já está rodando."
            echo ""
            echo "   Verificando status do Nginx..."
            sudo systemctl status nginx --no-pager | head -10
            echo ""
            echo "   Se o Nginx já está rodando, você pode:"
            echo "   1. Recarregar configuração: sudo nginx -s reload"
            echo "   2. Ou reiniciar: sudo systemctl restart nginx"
        else
            echo "   ⚠️  É outro serviço: $SERVICE"
            echo ""
            echo "   Opções:"
            echo "   1. Se for Apache, você pode parar: sudo systemctl stop apache2"
            echo "   2. Ou configurar o Nginx para usar outra porta (não recomendado)"
            echo "   3. Ou adicionar o Beste Web na configuração do serviço existente"
        fi
    fi
else
    echo "✅ Porta 80 está livre!"
    echo ""
    echo "   Iniciando Nginx..."
    sudo systemctl start nginx
    sudo systemctl enable nginx
    sudo systemctl status nginx --no-pager | head -10
fi

echo ""
echo "=========================="
echo "2️⃣ Verificando configuração do Nginx..."
echo ""

# Verificar se o site está habilitado
if [ -f "/etc/nginx/sites-available/beste-web" ]; then
    echo "✅ Arquivo de configuração existe"
    
    # Verificar se está habilitado
    if [ -L "/etc/nginx/sites-enabled/beste-web" ] || [ -f "/etc/nginx/sites-enabled/beste-web" ]; then
        echo "✅ Site já está habilitado"
    else
        echo "⚠️  Site não está habilitado. Habilitando..."
        sudo ln -s /etc/nginx/sites-available/beste-web /etc/nginx/sites-enabled/
    fi
    
    # Verificar configuração
    echo ""
    echo "3️⃣ Testando configuração..."
    if sudo nginx -t 2>&1 | grep -q "successful"; then
        echo "✅ Configuração está OK!"
        echo ""
        echo "   Recarregando Nginx..."
        sudo systemctl reload nginx || sudo systemctl restart nginx
    else
        echo "❌ Erro na configuração:"
        sudo nginx -t
    fi
else
    echo "❌ Arquivo de configuração não encontrado!"
fi

echo ""
echo "=========================="
echo "4️⃣ Verificação final..."
echo ""

# Verificar se Nginx está rodando
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx está rodando"
else
    echo "❌ Nginx não está rodando"
    echo "   Tente: sudo systemctl start nginx"
fi

# Verificar se a aplicação está rodando
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Aplicação está respondendo na porta 3001"
else
    echo "❌ Aplicação não está respondendo na porta 3001"
    echo "   Verifique: pm2 status"
fi

echo ""
echo "🧪 Teste o domínio:"
echo "   curl -I http://besteweb.com.br"

