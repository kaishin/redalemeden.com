import type { APIContext } from "astro";
import {
  DERIVED_DATA_DESCRIPTION,
  DERIVED_DATA_TITLE,
  SITE_AUTHOR,
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

  const entries = await getFeedEntries(feedConfig);
  const site = context.site;

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: DERIVED_DATA_TITLE,
    description: DERIVED_DATA_DESCRIPTION,
    home_page_url: new URL("/derived-data/", site).href,
    feed_url: new URL("/derived-data-feed.json", site).href,
    language: "en",
    authors: [{ name: SITE_AUTHOR }],
    items: entries.map((entry) => ({
      id: new URL(entry.link, site).href,
      url: new URL(entry.link, site).href,
      title: entry.title,
      content_html: entry.content,
      summary: entry.description,
      date_published: entry.pubDate.toISOString(),
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
