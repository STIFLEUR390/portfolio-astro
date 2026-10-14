# Commandes utiles

```bash
# Dev (bun, astro non global)
bun astro dev --background        # puis: bun astro dev status|logs|stop

# Build / preview — seule vérification du projet
bun run build
bun run preview

# Docker complet (build args = secrets Ghost)
docker build --build-arg GHOST_URL=https://blogs.aplix.nl \
             --build-arg CONTENT_API_KEY=<26-hex> -t portfolio .

# Vérifier qu'aucune secret n'a fuité dans le build
grep -r "$CONTENT_API_KEY" dist/ && echo "FUITE !" || echo "propre"

# Audit sécurité (strix local, Docker requis)
strix -n -t ./ -t https://portfolio.aplix.nl --scan-mode standard --max-budget 20

# Docs
npx ctx7@latest library "<pkg>" "<query>"   # puis docs <libraryId>
# ou MCP astro-docs pour Astro
```

Voir aussi : `bunx astro sync` régénère les types (dont `astro:env`).
