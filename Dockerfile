# ── Stage 1: Build Frontend App ──
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Production Server (Non-root hardening) ──
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Crear grupo y usuario no privilegiado para ejecutar Node
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/server ./server

RUN mkdir -p uploads && chown -R appuser:appgroup /app

USER appuser

EXPOSE 4000

CMD ["node", "server/server.js"]
