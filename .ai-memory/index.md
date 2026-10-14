# .ai-memory — portfolio-astro

Portfolio personnel statique (Astro 7 + îlots Vue + Tailwind v4), déployé sur
https://portfolio.aplix.nl. Copie 100 % française (`<html lang="fr">`).

## Fichiers

- `architecture.md` — structure du projet et flux de données
- `commands.md` — commandes utiles (build, dev, docker, strix)
- `errors.md` — erreurs fréquentes + solution
- `gotchas.md` — pièges non évidents

## Règles clés

- **Une seule source de contenu** : `src/data/portfolio.ts` pour tout le texte
  hors blog. Le blog vient de Ghost (`https://blogs.aplix.nl`, Content API).
- **Pas de test/lint/format** : la seule vérification est `bun run build` propre.
- **Ne jamais** ré-exposer `GHOST_URL`/`CONTENT_API_KEY` via `import.meta.env` :
  schema `astro:env` (`secret`) obligatoire (voir `errors.md`).
- `src/pages/blog/[...slug].astro` fusionne listing + pagination + article sur
  **une seule route** — ne pas re-séparer (a déjà causé des 404).
- Le déploiement auto ne se déclenche que sur **main** ; les autres branches ne
  sont pas déployées.

## Audit du 14/10/2026 (branche audit/docs-securite)

- Conformité doc vérifiée : astro:env, sitemap, rest-params, Tailwind v4
  `@custom-variant dark (&:where(.dark, .dark *))`, Ghost limit 100/pagination.
- Sécurité : `.prerender` retiré du Dockerfile (chunks avec secrets de build) ;
  nginx durci (`docker/nginx.conf`) ; audit Strix lancé (rapports `strix_runs/`).
