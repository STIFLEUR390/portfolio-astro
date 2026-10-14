# Architecture

## Flux de rendu

```
src/data/portfolio.ts ──┐
                        ├─> src/layouts/BaseLayout.astro ─> Header/Footer.astro
src/lib/ghost.ts ───────┘         (Header hydrate 1 îlot Vue : DarkModeToggle)
  (Content API v5,
   astro:env server secrets)      src/pages/blog/[...slug].astro
                                    └─ getStaticPaths(): getAllPosts() une fois,
                                       slicing in-memory pour pagination/articles
```

## Points structurants

- **Build statique intégral** : `output: static` (défaut). Aucune route serveur,
  aucune API, aucun backend. Le formulaire de contact poste vers FormSubmit.co.
- **Env** : `astro.config.mjs` déclare `env.schema` (GHOST_URL, CONTENT_API_KEY,
  `server`/`secret`). `src/lib/ghost.ts` les importe depuis `astro:env/server` —
  les valeurs ne sont donc jamais inlinées dans les bundles clients.
- **`src/components/ui/**`** : environ 400 composants shadcn-vue **vendored**
  (new-york), presque tous inutilisés par les pages. Utiles si le projet
  évolue ; gourmands en revendocs/audits — les déprioriser.
- **Dark mode** : classe `.dark` sur `<html>`, script inline no-FOUC dans
  BaseLayout, persistance `localStorage.theme`, bascule via l'îlot Vue
  (MutationObserver nettoyé `onUnmounted`).
- **Reveal au scroll** : IntersectionObserver dans BaseLayout sur `.reveal`
  (pas de `<ClientRouter />`, donc pas de re-hydration après navigation —
  chaque page est un plein rechargement).
- **Assets dist** : `/_astro/*` = hashés (immutable) ; `dist/.prerender` =
  chunks server-side supprimés dans le Dockerfile (jamais servis).
