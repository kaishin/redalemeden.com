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
  updatedDate: Date | undefined;
  link: string;
  content: string | undefined;
};

function renderFeedContent(body: string, postUrl: string): string {
  return sanitizeHtml(parser.render(body), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
    },
    transformTags: {
      img: (tagName, attribs) => {
        if (!attribs.src) {
          return { tagName, attribs };
        }

        try {
          return {
            tagName,
            attribs: {
              ...attribs,
              src: new URL(attribs.src, postUrl).href,
            },
          };
        } catch {
          return { tagName, attribs };
        }
      },
    },
  });
}

export async function getFeedEntries(
  config: FeedConfig,
  site: URL,
): Promise<FeedEntry[]> {
  const posts = await getCollection(config.collection);

  return posts
    .filter((post) => !post.data.isArchived)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, 10)
    .map((post) => {
      const link = `${config.linkPrefix}/${post.id}/`;
      const postUrl = new URL(link, site).href;

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        updatedDate: post.data.updatedDate,
        link,
        content: post.body ? renderFeedContent(post.body, postUrl) : undefined,
      };
    });
}

export function createFeedHandler(config: FeedConfig) {
  return async function GET(context: APIContext): Promise<Response> {
    if (!context.site) {
      throw new Error(
        "RSS feeds require the `site` option to be set in astro.config.mjs.",
      );
    }

    const entries = await getFeedEntries(config, context.site);
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
