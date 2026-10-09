import type { APIContext } from "astro";
import {
  DERIVED_DATA_DESCRIPTION,
  DERIVED_DATA_TITLE,
  SITE_AUTHOR,
  SITE_URL,
} from "@consts";
import { getFeedEntries, type FeedConfig } from "@lib/feed";

const feedConfig: FeedConfig = {
  collection: "derived-data",
  title: DERIVED_DATA_TITLE,
  description: DERIVED_DATA_DESCRIPTION,
  linkPrefix: "/derived-data",
};

export async function GET(context: APIContext): Promise<Response> {
  if (!context.site) {
    throw new Error(
      "JSON feeds require the `site` option to be set in astro.config.mjs.",
    );
  }

  const site = context.site;
  const entries = await getFeedEntries(feedConfig, site);
  const author = { name: SITE_AUTHOR, url: SITE_URL };

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: DERIVED_DATA_TITLE,
    home_page_url: new URL("/derived-data/", site).href,
    feed_url: new URL("/derived-data-feed.json", site).href,
    description: DERIVED_DATA_DESCRIPTION,
    icon: new URL("/icon-touch.png", site).href,
    language: "en",
    authors: [author],
    author,
    items: entries.map((entry) => ({
      id: new URL(entry.link, site).href,
      url: new URL(entry.link, site).href,
      title: entry.title,
      content_html: entry.content,
      date_published: entry.pubDate.toISOString(),
      ...(entry.updatedDate
        ? { date_modified: entry.updatedDate.toISOString() }
        : {}),
      ...(entry.description ? { summary: entry.description } : {}),
      ...(entry.tags ? { tags: entry.tags } : {}),
      authors: [author],
      author,
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
