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
- **FX & prefers-reduced-motion** : le head script choisit l'état FX par
  défaut UNE fois au chargement ; si vous inversez la préférence système,
  l'état stocké (`localStorage.fx`) reste prioritaire. Ne jamais animer un
  élément portant `data-fx-parallax` avec une animation CSS `transform`
  (conflit : l'inline style et l'animation se marchent dessus) — animer un
  enfant (`data-fx-float`) à la place.
- **HTML Ghost sanitisé au build** : `getAllPosts()` passe `post.html` dans
  DOMPurify (`isomorphic-dompurify`, options : iframe embeds autorisés +
  attributs allow/fullscreen). Conséquences : (1) les commentaires
  `<!--kg-card-begin/end-->` de Ghost disparaissent (cosmétique, sans effet) ;
  (2) TOUT nouvel embed/HTML brut devra survivre à DOMPurify — si un format
  Ghost légitime est strippé, étendre `SANITIZE_OPTIONS` dans `src/lib/ghost.ts`,
  ne pas retirer la sanitisation.
- **Overrides de dépendances (`package.json` → `overrides`)** : devalue
  (^5.9.3), source-map-js (^1.2.2) et postcss-selector-parser (^7.1.6) sont
  forcés au-dessus des pins des parents (astro, @tailwindcss/typography) pour
  corriger des CVE build-time. `postcss-selector-parser` 7.x fonctionne avec
  typography 0.5.20 malgré son pin exact "6.0.10" (build vérifié) — si une
  MAJ de typography casse, regarder d'abord ces overrides.
- **http-cache-semantics 4.2.0** (CVE-2026-93748) : aucun fix amont, dépendance
  transitive d'astro, module JAMAIS chargé ici (fetcher d'images distantes
  uniquement, pas utilisé) — non traitable, ignoré volontairement (scan Strix
  du 14/10/2026, finding INFO prouvé non-exploitable).
- **Strix** : config dans `~/.strix/cli-config.json` + vars `.bashrc`
  (`STRIX_LLM="openai/<modèle>"`, `LLM_API_BASE` local ocx). Piège : les vars
  d'env de la shell priment sur le fichier — une session ouverte avant un
  changement de config écrasera la nouvelle config.
