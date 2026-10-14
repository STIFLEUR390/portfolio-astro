FROM oven/bun:1 AS build
WORKDIR /app

ARG GHOST_URL
ARG CONTENT_API_KEY
ENV GHOST_URL=$GHOST_URL
ENV CONTENT_API_KEY=$CONTENT_API_KEY

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build
# dist/.prerender holds the server-side prerender chunks (they read build-time
# secrets via astro:env). They must never be served by nginx.
RUN rm -rf /app/dist/.prerender

FROM nginx:alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
