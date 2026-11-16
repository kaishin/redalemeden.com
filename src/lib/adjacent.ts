export interface PostLink {
  href: string;
  title: string;
}

interface PostLike {
  id: string;
  data: { title: string; pubDate: Date; isArchived?: boolean };
}

/**
 * Pairs each post with its older (`previous`) and newer (`next`) neighbor in
 * chronological order. Archived and current posts form separate chains, so
 * navigation never crosses from a listed post into a hidden archived one.
 */
export function withNeighbors<T extends PostLike>(
  posts: T[],
  basePath: string,
): { post: T; previous?: PostLink; next?: PostLink }[] {
  const toLink = (post: T | undefined): PostLink | undefined =>
    post && { href: `${basePath}/${post.id}/`, title: post.data.title };

  const sorted = [...posts].sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
  );
  const chains = [
    sorted.filter((post) => post.data.isArchived),
    sorted.filter((post) => !post.data.isArchived),
  ];

  return chains.flatMap((chain) =>
    chain.map((post, index) => ({
      post,
      previous: toLink(chain[index - 1]),
      next: toLink(chain[index + 1]),
    })),
  );
}
