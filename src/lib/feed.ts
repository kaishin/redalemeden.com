import rss from "@astrojs/rss";
import type { RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import type { CollectionKey } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

type FeedConfig = {
  collection: CollectionKey;
  title: string;
  description: string;
  linkPrefix: string;
};

export function createFeedHandler(config: FeedConfig) {
  return async function GET(context: APIContext): Promise<Response> {
    if (!context.site) {
      throw new Error(
        "RSS feeds require the `site` option to be set in astro.config.mjs.",
      );
    }

    const posts = await getCollection(config.collection);
    const currentDate = new Date().toUTCString();

    return rss({
      title: config.title,
      description: config.description,
      site: context.site,
      items: posts
        .filter((post) => !post.data.isArchived)
        .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
        .slice(0, 10)
        .map((post): RSSFeedItem => ({
          title: post.data.title,
          description: post.data.description,
          pubDate: post.data.pubDate,
          link: `${config.linkPrefix}/${post.id}/`,
          content: post.body
            ? sanitizeHtml(parser.render(post.body))
            : undefined,
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
