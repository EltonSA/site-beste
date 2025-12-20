#!/bin/bash

# Script para limpar o projeto Beste Web da VPS
# Execute na VPS: bash cleanup-vps.sh

set -e

echo "🧹 LIMPANDO PROJETO BESTE WEB DA VPS"
echo "===================================="
echo ""

# Cores
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

# Confirmar
echo -e "${YELLOW}⚠️  ATENÇÃO: Isso vai remover:${NC}"
echo "   - Aplicação PM2 (beste-web)"
echo "   - Diretório /var/www/site-beste"
echo "   - Configuração do Nginx (beste-web)"
echo ""
read -p "   Continuar? (s/N): " confirm

if [ "$confirm" != "s" ] && [ "$confirm" != "S" ]; then
    echo "   Operação cancelada"
    exit 0
fi

echo ""
echo "1️⃣ Parando e removendo aplicação do PM2..."
if pm2 list | grep -q "beste-web"; then
    pm2 stop beste-web
    pm2 delete beste-web
    pm2 save
    echo -e "${GREEN}✅ Aplicação removida do PM2${NC}"
else
    echo "   Aplicação não encontrada no PM2"
fi

echo ""
echo "2️⃣ Removendo configuração do Nginx..."
if [ -f "/etc/nginx/sites-enabled/beste-web" ] || [ -L "/etc/nginx/sites-enabled/beste-web" ]; then
    sudo rm /etc/nginx/sites-enabled/beste-web
    echo -e "${GREEN}✅ Link simbólico removido${NC}"
else
    echo "   Link simbólico não encontrado"
fi

if [ -f "/etc/nginx/sites-available/beste-web" ]; then
    read -p "   Remover arquivo de configuração também? (s/N): " remove_config
    if [ "$remove_config" = "s" ] || [ "$remove_config" = "S" ]; then
        sudo rm /etc/nginx/sites-available/beste-web
        echo -e "${GREEN}✅ Arquivo de configuração removido${NC}"
    else
        echo "   Arquivo mantido em /etc/nginx/sites-available/beste-web"
    fi
fi

# Recarregar Nginx se estiver rodando
if systemctl is-active --quiet nginx; then
    echo "   Recarregando Nginx..."
    sudo nginx -s reload || sudo systemctl reload nginx
    echo -e "${GREEN}✅ Nginx recarregado${NC}"
fi

echo ""
echo "3️⃣ Removendo diretório do projeto..."
if [ -d "/var/www/site-beste" ]; then
    read -p "   Remover diretório /var/www/site-beste? (s/N): " remove_dir
    if [ "$remove_dir" = "s" ] || [ "$remove_dir" = "S" ]; then
        # Fazer backup dos dados antes (opcional)
        if [ -d "/var/www/site-beste/data" ]; then
            read -p "   Fazer backup dos dados antes? (s/N): " backup
            if [ "$backup" = "s" ] || [ "$backup" = "S" ]; then
                BACKUP_DIR="/var/backups/beste-web-$(date +%Y%m%d_%H%M%S)"
                mkdir -p "$BACKUP_DIR"
                cp -r /var/www/site-beste/data "$BACKUP_DIR/"
                echo -e "${GREEN}✅ Backup criado em: $BACKUP_DIR${NC}"
            fi
        fi
        
        sudo rm -rf /var/www/site-beste
        echo -e "${GREEN}✅ Diretório removido${NC}"
    else
        echo "   Diretório mantido em /var/www/site-beste"
    fi
else
    echo "   Diretório não encontrado"
fi

echo ""
echo "4️⃣ Verificando processos restantes..."
if pgrep -f "site-beste\|beste-web" > /dev/null; then
    echo -e "${YELLOW}⚠️  Ainda há processos rodando:${NC}"
    pgrep -f "site-beste\|beste-web"
    read -p "   Encerrar processos? (s/N): " kill_procs
    if [ "$kill_procs" = "s" ] || [ "$kill_procs" = "S" ]; then
        pkill -f "site-beste\|beste-web" || true
        echo -e "${GREEN}✅ Processos encerrados${NC}"
    fi
else
    echo -e "${GREEN}✅ Nenhum processo restante${NC}"
fi

echo ""
echo "===================================="
echo -e "${GREEN}✅ LIMPEZA CONCLUÍDA!${NC}"
echo ""
echo "📋 Resumo:"
echo "   - PM2: Aplicação removida"
echo "   - Nginx: Configuração removida"
echo "   - Diretório: Removido (se confirmado)"
echo ""
echo "🚀 Próximos passos:"
echo "   1. Configure o deploy no Coolify"
echo "   2. Adicione as variáveis de ambiente"
echo "   3. Configure o domínio"
echo "   4. Faça o deploy!"
echo ""
echo "📚 Veja o guia completo em: DEPLOY_COOLIFY.md"

