import GhostContentAPI from '@tryghost/content-api';
import DOMPurify from 'isomorphic-dompurify';
import { GHOST_URL, CONTENT_API_KEY } from 'astro:env/server';

const api = new GhostContentAPI({
  url: GHOST_URL,
  key: CONTENT_API_KEY,
  version: 'v5.0',
});

// Ghost embeds (YouTube, Vimeo, Spotify…) arrive en <iframe>; DOMPurify les
// strippe par défaut — on les ré-autorise (https uniquement via l'URI regex
// par défaut de DOMPurify) avec leurs attributs d'embed.
const SANITIZE_OPTIONS = {
  ADD_TAGS: ['iframe'],
  ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
} as const;

// Build-time sanitization of CMS-sourced HTML (stored-XSS defense in depth:
// a compromised Ghost account must not be able to ship <script>/on* handlers
// to every visitor).
function sanitizePostHtml(html: string): string {
  return DOMPurify.sanitize(html, SANITIZE_OPTIONS);
}

// The Ghost Content API caps `limit` at 100 per request, so paginate with
// `meta.pagination.next` to fetch every public post.
export async function getAllPosts() {
  const posts = [];
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const batch = await api.posts.browse({
      limit: 100,
      page,
      filter: 'visibility:public',
      include: ['tags', 'authors'],
    });
    posts.push(...batch.map((post) => ({ ...post, html: sanitizePostHtml(post.html ?? '') })));
    hasNext = Boolean(batch.meta?.pagination?.next);
    page += 1;
  }

  return posts;
}

export async function getPosts({ page = 1, limit = 6 }: { page?: number; limit?: number } = {}) {
  return await api.posts.browse({
    limit,
    page,
    filter: 'visibility:public',
    include: ['tags', 'authors'],
  });
}
