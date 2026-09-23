import { createFeedHandler } from "@lib/feed";
import { SITE_TITLE, SITE_DESCRIPTION } from "@consts";

export const GET = createFeedHandler({
  collection: "blog",
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  linkPrefix: "/blog",
});
