# Erreurs connues

## `[EnvInvalidVariables] GHOST_URL is missing` au build
**Cause** : `.env` absent (gitignored, aucun `.env.example`) ou vars manquantes.
**Solution** : créer `.env` avec `GHOST_URL=https://blogs.aplix.nl` et
`CONTENT_API_KEY=<clé 26 hex>`. En Docker : build args. C'est voulu (fail-fast
depuis le schéma `astro:env`) — ne pas revenir à `import.meta.env` qui inlinerait
la clé dans les bundles.

## `@tryghost/content-api Config Missing: 'url' is required`
Même cause que ci-dessus, version historique (avant le schéma astro:env) :
`import.meta.env.GHOST_URL` undefined → le SDK Ghost lève cette erreur.

## Posts manquants au-delà de 100 articles
**Cause** : le max de l'API Ghost Content est `limit: 100` par requête ; un
`limit: 200` est silencieusement tronqué. **Solution** : `getAllPosts()` dans
`src/lib/ghost.ts` paginait via `meta.pagination.next` — toujours passer par lui.

## 404 nginx brute au lieu du 404 du site
Avant : nginx n'avait pas `error_page 404 /404.html`. Corrigé dans
`docker/nginx.conf`.
