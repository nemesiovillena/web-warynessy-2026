# ========================================
# Stage 1: Dependencies
# ========================================
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies needed for native modules (sharp)
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm ci

# ========================================
# Stage 2: Builder
# ========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set production environment for build
ENV NODE_ENV=production

# Build both Astro and Payload
RUN npm run build

# ========================================
# Stage 3: Production Runtime
# ========================================
FROM node:20-alpine AS production
WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache libc6-compat

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 payload

# Copy built assets and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/payload.config.ts ./
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/tsconfig.json ./

# Create media directory with correct permissions
RUN mkdir -p /app/media && chown -R payload:nodejs /app/media

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Switch to non-root user
USER payload

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/admin || exit 1

# Start the application
CMD ["npx", "tsx", "server.ts"]

# ========================================
# Stage 4: Development Runtime
# ========================================
FROM node:20-alpine AS development
WORKDIR /app

# Install dependencies needed for native modules
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Set development environment
ENV NODE_ENV=development

# Expose ports (Astro: 4321, Payload: 3000)
EXPOSE 3000 4321

# Default command (can be overridden in docker-compose)
CMD ["npm", "run", "dev"]
