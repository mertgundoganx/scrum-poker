# syntax=docker/dockerfile:1
# An exact release and digest: builds repeat, and Dependabot bumps both.
FROM node:24.22.2-alpine3.24@sha256:8a32c8cf649a49915a66e81e7a609223c708d0adabf288ee3f4077d765542f85 AS base

# pnpm's version comes from "packageManager" in package.json.
RUN corepack enable

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
# pnpm-workspace.yaml holds the install settings (allowBuilds); without it the
# install refuses the dependencies' unreviewed build scripts.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# The store is kept between builds: a changed lockfile fetches only what changed.
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir /pnpm/store

# --- Build ---
FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# --- Runner ---
# No package manager at runtime: the server needs node alone.
FROM node:24.22.2-alpine3.24@sha256:8a32c8cf649a49915a66e81e7a609223c708d0adabf288ee3f4077d765542f85 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
      /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack /opt/yarn-* \
      /usr/local/bin/yarn /usr/local/bin/yarnpkg \
 && addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# The code belongs to root: the server, running as nextjs, can read it but
# can't rewrite it. Only Next's cache directory is writable (a tmpfs in
# production, where the root filesystem is read-only).
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# app/api/health answers 200 once the server takes requests (the same path as
# health.path in shipwick.yaml). wget is busybox's, part of the base image.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/api/health" || exit 1

CMD ["node", "server.js"]
