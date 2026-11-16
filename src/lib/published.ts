/**
 * Collection filter that hides draft posts from production builds. Drafts stay
 * visible in `pnpm dev` so they can be previewed.
 */
export const isPublished = ({ data }: { data: { draft?: boolean } }) =>
  import.meta.env.DEV || !data.draft;
