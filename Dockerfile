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

# Copiar configuración e instalar dependencias del servidor backend
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install --omit=dev

WORKDIR /app
COPY server/ ./server/
COPY --from=builder /app/dist ./dist
# Copiar carpeta public/ al runner para servir imágenes directamente
COPY public/ ./public/
RUN mkdir -p uploads

EXPOSE 4000

CMD ["node", "server/server.js"]
