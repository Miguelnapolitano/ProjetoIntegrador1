# Usa a imagem oficial do Node.js como base
FROM node:22-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package* ./

# Instala as dependências do Node.js
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "src/app.js"]
