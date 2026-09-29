import rss from "@astrojs/rss";
import type { RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import type { CollectionKey } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export type FeedConfig = {
  collection: CollectionKey;
  title: string;
  description: string;
  linkPrefix: string;
};

type FeedEntry = {
  title: string;
  description: string | undefined;
  pubDate: Date;
  link: string;
  content: string | undefined;
};

export async function getFeedEntries(config: FeedConfig): Promise<FeedEntry[]> {
  const posts = await getCollection(config.collection);

  return posts
    .filter((post) => !post.data.isArchived)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, 10)
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${config.linkPrefix}/${post.id}/`,
      content: post.body ? sanitizeHtml(parser.render(post.body)) : undefined,
    }));
}

export function createFeedHandler(config: FeedConfig) {
  return async function GET(context: APIContext): Promise<Response> {
    if (!context.site) {
      throw new Error(
        "RSS feeds require the `site` option to be set in astro.config.mjs.",
      );
    }

    const entries = await getFeedEntries(config);
    const currentDate = new Date().toUTCString();

    return rss({
      title: config.title,
      description: config.description,
      site: context.site,
      items: entries.map((entry): RSSFeedItem => ({
        title: entry.title,
        description: entry.description,
        pubDate: entry.pubDate,
        link: entry.link,
        content: entry.content,
      })),
      customData: `
      <lastBuildDate>${currentDate}</lastBuildDate>
      <image>
        <title>Reda Lemeden</title>
        <url>https://redalemeden.com/icon-touch.png</url>
        <link>https://redalemeden.com</link>
      </image>
    `,
    });
  };
}
