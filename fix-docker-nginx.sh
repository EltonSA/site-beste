#!/bin/bash

# Script para resolver conflito entre Docker (porta 80) e Nginx
# Execute na VPS: bash fix-docker-nginx.sh

set -e

echo "🔧 RESOLVENDO CONFLITO DOCKER + NGINX"
echo "===================================="
echo ""

# 1. Identificar qual container está usando porta 80
echo "1️⃣ Identificando container Docker na porta 80..."
echo ""

DOCKER_CONTAINER=$(docker ps --format "{{.Names}}" | head -1)
if [ -n "$DOCKER_CONTAINER" ]; then
    echo "   Container encontrado: $DOCKER_CONTAINER"
    echo "   (Provavelmente Chat Woot ou outro serviço)"
    echo ""
    
    # Verificar se é Chat Woot
    if echo "$DOCKER_CONTAINER" | grep -qi "woot\|chat"; then
        echo "   ✅ Parece ser o Chat Woot"
    fi
else
    echo "   ⚠️  Não foi possível identificar o container"
fi

echo ""
echo "2️⃣ Opções de solução:"
echo ""
echo "   OPÇÃO 1 (Recomendada): Usar Nginx como proxy para ambos"
echo "   - Nginx na porta 80"
echo "   - Docker em outra porta (ex: 8080)"
echo "   - Beste Web na porta 3001"
echo ""
echo "   OPÇÃO 2: Parar Docker temporariamente"
echo "   - Parar container que usa porta 80"
echo "   - Iniciar Nginx"
echo ""

read -p "   Escolha (1 ou 2): " choice

if [ "$choice" = "1" ]; then
    echo ""
    echo "3️⃣ Configurando Nginx como proxy para ambos..."
    echo ""
    
    # Verificar se já existe configuração do Chat Woot
    if [ -f "/etc/nginx/sites-available/chatwoot" ] || [ -f "/etc/nginx/sites-available/default" ]; then
        echo "   ⚠️  Já existe configuração do Nginx"
        echo "   Vamos adicionar o Beste Web na configuração existente"
    else
        echo "   Criando configuração completa..."
    fi
    
    # Criar/atualizar configuração do Nginx
    echo ""
    echo "   📝 Editando configuração do Nginx..."
    echo "   Você precisa editar manualmente:"
    echo "   sudo nano /etc/nginx/sites-available/beste-web"
    echo ""
    echo "   Adicione um server block para o Chat Woot também, ou"
    echo "   configure o Nginx para fazer proxy baseado no domínio"
    echo ""
    
    # Sugerir configuração
    echo "   Exemplo de configuração (dois server blocks):"
    echo ""
    echo "   # Chat Woot (se tiver domínio específico)"
    echo "   server {"
    echo "       listen 80;"
    echo "       server_name chat.besteweb.com.br;"
    echo "       location / {"
    echo "           proxy_pass http://localhost:8080;  # Porta do Docker"
    echo "           # ... headers ..."
    echo "       }"
    echo "   }"
    echo ""
    echo "   # Beste Web"
    echo "   server {"
    echo "       listen 80;"
    echo "       server_name besteweb.com.br www.besteweb.com.br;"
    echo "       location / {"
    echo "           proxy_pass http://localhost:3001;"
    echo "           # ... headers ..."
    echo "       }"
    echo "   }"
    echo ""
    
elif [ "$choice" = "2" ]; then
    echo ""
    echo "3️⃣ Parando Docker na porta 80..."
    echo ""
    
    if [ -n "$DOCKER_CONTAINER" ]; then
        echo "   ⚠️  ATENÇÃO: Isso vai parar o container: $DOCKER_CONTAINER"
        read -p "   Continuar? (s/N): " confirm
        
        if [ "$confirm" = "s" ] || [ "$confirm" = "S" ]; then
            echo "   Parando container..."
            docker stop "$DOCKER_CONTAINER" || true
            
            echo "   Aguardando 2 segundos..."
            sleep 2
            
            echo "   Iniciando Nginx..."
            sudo systemctl start nginx
            sudo systemctl enable nginx
            
            echo ""
            echo "   ✅ Nginx iniciado!"
            echo "   ⚠️  Lembre-se: O Docker está parado. Você precisará"
            echo "   reconfigurá-lo para usar outra porta ou reiniciar"
            echo "   depois de configurar o Nginx como proxy"
        else
            echo "   Operação cancelada"
            exit 0
        fi
    fi
else
    echo "   Opção inválida"
    exit 1
fi

echo ""
echo "===================================="
echo "4️⃣ Verificação final..."
echo ""

# Verificar se porta 80 está livre
if sudo lsof -i :80 2>/dev/null | grep -q "nginx"; then
    echo "✅ Nginx está usando a porta 80"
elif sudo lsof -i :80 2>/dev/null | grep -q "docker"; then
    echo "⚠️  Docker ainda está usando a porta 80"
    echo "   Você precisa reconfigurar o Docker ou usar a Opção 1"
else
    echo "✅ Porta 80 está livre"
    echo "   Iniciando Nginx..."
    sudo systemctl start nginx
    sudo systemctl enable nginx
fi

# Verificar status do Nginx
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx está rodando"
    sudo systemctl status nginx --no-pager | head -5
else
    echo "❌ Nginx não está rodando"
    echo "   Verifique: sudo systemctl status nginx"
fi

echo ""
echo "🧪 Teste:"
echo "   curl -I http://besteweb.com.br"

