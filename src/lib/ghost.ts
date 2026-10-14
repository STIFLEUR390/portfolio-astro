import GhostContentAPI from '@tryghost/content-api';
import { GHOST_URL, CONTENT_API_KEY } from 'astro:env/server';

const api = new GhostContentAPI({
  url: GHOST_URL,
  key: CONTENT_API_KEY,
  version: 'v5.0',
});

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
    posts.push(...batch);
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
