# api-gateway/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copie des dépendances
COPY package*.json ./
RUN npm ci --omit=dev

# Copie du code
COPY . .

# Expose le port du gateway
EXPOSE 3000

CMD ["node", "app.js"]
