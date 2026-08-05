# ── Stage 1: Build Frontend ──
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Servidor Producción Backend + Frontend ──
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

# Copiar paquetes e instalar dependencias de backend
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --only=production

WORKDIR /app
# Copiar código del backend y bundle del frontend
COPY server/ ./server/
COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["node", "server/server.js"]
