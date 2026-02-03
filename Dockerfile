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

# Build arguments needed for Next.js/Payload compilation
ARG DATABASE_URL
ARG PAYLOAD_SECRET
ARG PAYLOAD_PUBLIC_SERVER_URL
ARG PUBLIC_PAYLOAD_API_URL
ARG PUBLIC_SITE_URL
ARG PUBLIC_SITE_NAME

# Set environment variables from build args
ENV DATABASE_URL=${DATABASE_URL}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV PAYLOAD_PUBLIC_SERVER_URL=${PAYLOAD_PUBLIC_SERVER_URL}
ENV PUBLIC_PAYLOAD_API_URL=${PUBLIC_PAYLOAD_API_URL}
ENV PUBLIC_SITE_URL=${PUBLIC_SITE_URL}
ENV PUBLIC_SITE_NAME=${PUBLIC_SITE_NAME}
ENV NODE_ENV=production

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build both Astro and Next.js/Payload
RUN npm run build

# ========================================
# Stage 3: Production Runtime
# ========================================
FROM node:20-alpine AS production
WORKDIR /app

# Install runtime dependencies only (wget needed for healthcheck)
RUN apk add --no-cache libc6-compat wget

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 payload

# Copy standalone build from Next.js
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy Payload config and source files needed at runtime
COPY --from=builder /app/payload.config.ts ./
COPY --from=builder /app/src/payload ./src/payload

# Copy Astro dist for SSR (if needed later)
COPY --from=builder /app/dist ./dist

# Create media directory with correct permissions
RUN mkdir -p /app/media && chown -R payload:nodejs /app

# Set environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Switch to non-root user
USER payload

# Expose port
EXPOSE 3000

# Health check (simple check on root)
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start Next.js standalone server
CMD ["node", "server.js"]

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
