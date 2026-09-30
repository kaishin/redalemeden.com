import type { APIContext } from "astro";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@consts";
import { getFeedEntries, type FeedConfig } from "@lib/feed";

const feedConfig: FeedConfig = {
  collection: "blog",
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  linkPrefix: "/blog",
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
    version: "https://jsonfeed.org/version/1",
    title: SITE_TITLE,
    home_page_url: new URL("/", site).href,
    feed_url: new URL("/feed.json", site).href,
    description: SITE_DESCRIPTION,
    icon: new URL("/icon-touch.png", site).href,
    author,
    items: entries.map((entry) => ({
      // Keep the pre-generated feed's ID form (no trailing slash) so
      // subscribers do not see the same post as a new item.
      id: new URL(entry.link, site).href.replace(/\/$/, ""),
      url: new URL(entry.link, site).href,
      title: entry.title,
      content_html: entry.content,
      date_published: entry.pubDate.toISOString(),
      ...(entry.updatedDate
        ? { date_modified: entry.updatedDate.toISOString() }
        : {}),
      author,
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
