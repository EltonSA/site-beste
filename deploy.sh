#!/bin/bash

# Script de deploy automático para VPS
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando deploy do Beste Web..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: package.json não encontrado. Execute este script na raiz do projeto.${NC}"
    exit 1
fi

# Verificar se .env.local existe
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local não encontrado. Criando a partir do .env.example...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo -e "${YELLOW}⚠️  Por favor, edite o .env.local com suas credenciais antes de continuar.${NC}"
        exit 1
    else
        echo -e "${RED}❌ Erro: .env.example não encontrado.${NC}"
        exit 1
    fi
fi

# Instalar dependências
echo -e "${GREEN}📦 Instalando dependências...${NC}"
npm install

# Fazer build
echo -e "${GREEN}🔨 Fazendo build de produção...${NC}"
npm run build

# Verificar se PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2 não encontrado. Instalando...${NC}"
    sudo npm install -g pm2
fi

# Parar aplicação se estiver rodando
if pm2 list | grep -q "beste-web"; then
    echo -e "${GREEN}🔄 Reiniciando aplicação...${NC}"
    pm2 restart beste-web
else
    echo -e "${GREEN}🚀 Iniciando aplicação...${NC}"
    pm2 start npm --name "beste-web" -- start
    pm2 save
fi

# Verificar status
echo -e "${GREEN}✅ Deploy concluído!${NC}"
echo -e "${GREEN}📊 Status da aplicação:${NC}"
pm2 status

echo -e "${GREEN}📝 Para ver os logs: pm2 logs beste-web${NC}"
echo -e "${GREEN}🔄 Para reiniciar: pm2 restart beste-web${NC}"

