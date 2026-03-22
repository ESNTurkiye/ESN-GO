# =========================================
# Stage 1: Dependencies
# =========================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only files needed for installation
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# =========================================
# Stage 2: Build
# =========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Re-enable pnpm for the build stage
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env (NEXT_PUBLIC_* only)
ARG NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

ENV NEXT_PUBLIC_FEATURE_HERO=true
ENV NEXT_PUBLIC_FEATURE_HERO_ANIMATION=true
ENV NEXT_PUBLIC_FEATURE_DESTINATIONS=true
ENV NEXT_PUBLIC_FEATURE_CAROUSEL=true
ENV NEXT_PUBLIC_FEATURE_VIBE_FOOD=true
ENV NEXT_PUBLIC_FEATURE_FAQ=true

RUN pnpm run build

# =========================================
# Stage 3: Production
# =========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]