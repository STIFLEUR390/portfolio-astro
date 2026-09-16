FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1 AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

COPY --from=build /app/dist ./dist

EXPOSE 4321
USER bun
CMD ["bun", "dist/server/entry.mjs"]
