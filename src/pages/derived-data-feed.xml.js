import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();
import { DERIVED_DATA_TITLE, DERIVED_DATA_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("derived-data");
  const currentDate = new Date().toUTCString();

  return rss({
    title: DERIVED_DATA_TITLE,
    description: DERIVED_DATA_DESCRIPTION,
    site: context.site,
    items: posts
      .filter((post) => !post.data.isArchived)
      .sort((a, b) => {
        return new Date(b.data.pubDate) - new Date(a.data.pubDate);
      })
      .slice(0, 10)
      .map((post) => ({
        ...post.data,
        link: `/derived-data/${post.slug}/`,
        pubDate: post.data.pubDate,
        content: sanitizeHtml(parser.render(post.body)),
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
}
