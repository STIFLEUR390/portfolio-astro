import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: import.meta.env.GHOST_URL,
  key: import.meta.env.CONTENT_API_KEY,
  version: 'v5.0',
});

export async function getPosts({ page = 1, limit = 6 }: { page?: number; limit?: number } = {}) {
  return await api.posts.browse({
    limit,
    page,
    filter: 'visibility:public',
    include: ['tags', 'authors'],
  });
}

export async function getPostBySlug(slug: string) {
  return await api.posts.read(
    { slug },
    { include: ['tags', 'authors'] },
  );
}



export async function getTags() {
  return await api.tags.browse({ limit: 20 });
}
