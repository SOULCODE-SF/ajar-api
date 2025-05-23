# Stage 1: Base dengan alpine dan pnpm setup
FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install corepack untuk pnpm
RUN apk add --no-cache curl && \
    corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

# Stage 2: Install dependencies
FROM base AS install
RUN pnpm install --frozen-lockfile

# Stage 3: Build source
FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Stage 4: Production runtime
FROM node:20-alpine AS production

WORKDIR /app

# Copy hasil build dan node_modules production
COPY --from=build /app/dist ./dist
COPY --from=install /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 7000

CMD ["node", "dist/index.js"]
