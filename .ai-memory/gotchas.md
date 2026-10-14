# Pièges

- **Route blog unique** : `src/pages/blog/[...slug].astro` fusionne listing,
  pagination (`/blog/2`) et articles. Séparer en `blog/index.astro` +
  `blog/[...slug].astro` a déjà causé des 404 — ne pas refaire.
- **Collision de routes possible (théorique)** : les pages de pagination
  `/blog/<n>` sont des slugs numériques ; un article Ghost sluggé "2"
  entrerait en collision. Slugs réels longs → risque nul aujourd'hui.
- **Ordre des posts Ghost** : newest-first. `allPosts[i+1]` = article plus
  ANCIEN (précédent chronologique), `allPosts[i-1]` = plus récent.
- **Pas de `<ClientRouter />`** : les scripts Astro s'exécutent à chaque
  chargement. Si quelqu'un ajoute les view-transitions, il faut gérer le
  re-observe `.reveal` ET le re-attach du bouton menu mobile.
- **shadcn-vue vendored** : ne pas le "nettoyer" sans demande explicite
  (~400 fichiers, architecture assumée pour la suite).
- **`og:image`** : dimensions 2048×1152 (og-card.webp) — vérifier si l'image
  change.
- **Déploiement** : seules les branches **main** déclenchent la mise en ligne ;
  les merges sont donc le moment du contrôle final.
- **Ghost version** : SDK en `v5.0` (Accept-Version) — toujours fonctionnel ;
  le défaut du SDK récent est `v6.0`. Ne changer qu'avec vérification du blog.
