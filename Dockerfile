FROM node:18-alpine AS base
WORKDIR /app

FROM base AS base-pnpm
RUN npm i -g pnpm

FROM base-pnpm AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

FROM base-pnpm AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY next.config.js postcss.config.js tailwind.config.ts tsconfig.json ./
COPY package.json pnpm-lock.yaml ./
COPY public ./public
COPY src ./src
ENV NEXT_TELEMETRY_DISABLED 1
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG NEXT_PUBLIC_BACKEND_URL
RUN pnpm build

FROM base AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs

CMD ["node", "server.js"]
