import { createFeedHandler } from "@lib/feed";
import { DERIVED_DATA_TITLE, DERIVED_DATA_DESCRIPTION } from "@consts";

export const GET = createFeedHandler({
  collection: "derived-data",
  title: DERIVED_DATA_TITLE,
  description: DERIVED_DATA_DESCRIPTION,
  linkPrefix: "/derived-data",
});
