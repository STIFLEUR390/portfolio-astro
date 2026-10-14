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
- `src/lib/ghost.ts` constructs the Ghost Content API client at module load and **throws if env is missing**. `GHOST_URL` and `CONTENT_API_KEY` must be set (Astro loads `.env`; it is gitignored and there is no `.env.example`) or `bun run build` fails, and the dev server cannot render `/blog`.
- `Dockerfile` is a bun-build → nginx static image and passes those values as `--build-arg GHOST_URL=... --build-arg CONTENT_API_KEY=...`.

## Architecture

- `src/data/portfolio.ts` is the **single source of truth** for all content (site meta, projects, skills, experience, services, bio). Edit copy here, not in page templates.
- Blog is Ghost-backed through `src/lib/ghost.ts` (`getPosts` / `getPostBySlug` / `getTags`, Content API v5).
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
