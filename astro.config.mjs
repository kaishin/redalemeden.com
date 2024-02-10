import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://redalemeden.com",
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true,
    },
  },
  redirects: {
    "/blog/1": "/blog",
    "/blog/2": "/blog",
    "/blog/3": "/blog",
    "/blog/4": "/blog",
    "/blog/5": "/blog",
    "/blog/2020/this-week-i-learned-21": "/experiments/twil",
    "/blog/2020/this-week-i-learned-22": "/experiments/twil",
    "/blog/2020/this-week-i-learned-23": "/experiments/twil",
    "/blog/2020/this-week-i-learned-24": "/experiments/twil",
    "/blog/2020/this-week-i-learned-25": "/experiments/twil",
    "/blog/2020/this-week-i-learned-26": "/experiments/twil",
    "/blog/2020/this-week-i-learned-27": "/experiments/twil",
    "/blog/2020/this-week-i-learned-28": "/experiments/twil",
    "/blog/2020/this-week-i-learned-29": "/experiments/twil",
    "/blog/2020/this-week-i-learned-30": "/experiments/twil",
    "/blog/2020/this-week-i-learned-31": "/experiments/twil",
    "/blog/2020/this-week-i-learned-32": "/experiments/twil",
    "/blog/2021/wwdc-21-day-2-session-notes": "/blog/2021/wwdc-21-session-notes/",
    "/blog/2021/wwdc-21-day-3-session-notes": "/blog/2021/wwdc-21-session-notes/",
    "/blog/2021/wwdc-21-day-4-5-session-notes": "/blog/2021/wwdc-21-session-notes/",
    "/microblog/": "/experiments/microblog",
    "/frequent-typos": "/experiments/frequent-typos",
    "/writing/chrome-no-more": "/blog/2019/we-need-chrome-no-more/",
  }
});
