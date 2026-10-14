# AGENTS.md

Static personal portfolio (Astro 7 + Vue islands + Tailwind v4), deployed at https://portfolio.aplix.nl.
All site copy is French (`<html lang="fr">`); keep user-facing strings in French.

## Commands

- Package manager is **bun** (`bun.lock`); Node `>=22.12.0` (see `package.json` `engines`).
- `astro` is **not** installed globally — run it through bun:
  - `bun astro dev --background` (background dev server), then `bun astro dev status|logs|stop`.
  - `bun run build`, `bun run preview`.
- No test suite, linter, or formatter is configured. The only verification is a clean `bun run build`.
- `bun astro check` is **not** set up (`@astrojs/check` / `vue-tsc` are not dependencies); it will prompt to install. Don't treat it as a typecheck you can run.

## Build & environment (non-obvious)

- Output is fully **static**: every page, including each blog post, is prerendered at build time.
- `GHOST_URL` and `CONTENT_API_KEY` are declared in the `env.schema` of `astro.config.mjs` (via `astro:env`, `context: "server"`, `access: "secret"`) and consumed in `src/lib/ghost.ts` through `import { GHOST_URL, CONTENT_API_KEY } from 'astro:env/server'`. A missing variable fails the build early with `[EnvInvalidVariables]`. Astro loads `.env` (gitignored, no `.env.example`); the Dockerfile passes the same values as `--build-arg`. Secret values are **not** inlined in build output — keep it that way (never switch back to `import.meta.env.*` for these).
- `Dockerfile` deletes `dist/.prerender` before copying `dist/` to nginx: that folder holds server-side prerender chunks that read build secrets and must never be publicly served. `docker/nginx.conf` adds security headers, Astro's 404 page and immutable caching for `/_astro/`.

## Architecture

- `src/data/portfolio.ts` is the **single source of truth** for all content (site meta, projects, skills, experience, services, bio). Edit copy here, not in page templates.
- Blog is Ghost-backed through `src/lib/ghost.ts` (`getAllPosts` — paginated at Ghost's max of 100/request via `meta.pagination.next`; `getPosts({ limit })`; Content API v5). In `src/pages/blog/[...slug].astro`, `getStaticPaths()` fetches **all posts once** and slices listings/pagination in memory — do not re-fetch per page. Posts come newest-first: `allPosts[i + 1]` is the chronologically *previous* article.
- `src/pages/blog/[...slug].astro` deliberately merges the listing, pagination and article views into **one** route. Do not split it back into separate routes — that previously caused 404s.
- Interactivity uses Vue via `@astrojs/vue`, hydrated as islands (`client:load`); currently only `DarkModeToggle.vue`. Everything else is `.astro`.
- The contact form posts to the external FormSubmit.co service; there is no backend or API route.
- `src/components/ui/**` is **generated shadcn-vue** (new-york style; aliases in `components.json`, `@/*` → `src/*`, `cn()` in `src/lib/utils.ts`). Most of it is unused vendored components.

## Styling

- Tailwind v4, CSS-first: there is **no `tailwind.config`**. Design tokens and custom utilities live in `src/styles/globals.css` (`@theme inline`, OKLCH vars under `:root` / `.dark`).
- Custom utilities: `.reveal` / `.reveal-delay-{1,2,3}` (driven by an IntersectionObserver in `BaseLayout.astro`) and `.card-hover`.
- Dark mode is class-based on `<html>`, initialized by an inline no-FOUC script in `BaseLayout.astro`, persisted in `localStorage.theme`, toggled by the Vue island.

## Conventions

- `CLAUDE.md` is a symlink to this file; edit this one.
- `.agents/skills/` holds design skills, symlinked into `.claude/skills` and `.pi/skills` and locked in `skills-lock.json` — regenerate via the skills tooling, don't hand-edit.

## Documentation

- Astro: https://docs.astro.build (also available as the `astro-docs` MCP tool). Use the `shadcnVue` / `nuxt-ui` MCP docs for those libraries rather than guessing APIs.
