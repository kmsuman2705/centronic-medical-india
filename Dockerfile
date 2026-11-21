# syntax=docker/dockerfile:1

# ---------- Build stage: compiles the React frontend and the Express server ----------
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Runtime stage: only production dependencies + compiled output ----------
FROM node:22-alpine AS runtime
ENV NODE_ENV=production \
    PORT=3000
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

# Directories are pre-created so bind/named volumes inherit the correct ownership.
RUN mkdir -p /app/data /app/uploads/images /app/uploads/documents \
    && chown -R node:node /app/data /app/uploads

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/api/health" >/dev/null 2>&1 || exit 1

CMD ["node", "dist/server.cjs"]
