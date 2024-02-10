import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  const currentDate = new Date().toUTCString();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .sort((a, b) => {
        return new Date(b.data.pubDate) - new Date(a.data.pubDate);
      })
      .slice(0, 10)
      .map((post) => ({
        ...post.data,
        link: `/blog/${post.slug}/`,
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
    stylesheet: "/rss.xsl",
  });
}
