import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://redalemeden.com",
  integrations: [mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "dracula",
      },
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
    "/blog/2021/a-feel-good-refactor": "/derived-data/2021/a-feel-good-refactor/",
    "/blog/2021/wwdc-21-day-2-session-notes":
      "/derived-data/2021/wwdc-21-session-notes/",
    "/blog/2021/wwdc-21-day-3-session-notes":
      "/derived-data/2021/wwdc-21-session-notes/",
    "/blog/2021/wwdc-21-day-4-5-session-notes":
      "/derived-data/2021/wwdc-21-session-notes/",
    "/blog/2015/tvos-hig-tldr": "/derived-data/2015/tvos-hig-tldr/",
    "/blog/2016/swift-3-access-control":
      "/derived-data/2016/swift-3-access-control/",
    "/blog/2016/units-in-foundation": "/derived-data/2016/units-in-foundation/",
    "/blog/2019/ibm-serverside-swift": "/derived-data/2019/ibm-serverside-swift/",
    "/blog/2019/inset-grouped-lists-swiftui":
      "/derived-data/2019/inset-grouped-lists-swiftui/",
    "/blog/2019/swift-killer-feature": "/derived-data/2019/swift-killer-feature/",
    "/blog/2019/swift-ui-early-lessons":
      "/derived-data/2019/swift-ui-early-lessons/",
    "/blog/2020/debugging-swiftui-trials-and-tribulations":
      "/derived-data/2020/debugging-swiftui-trials-and-tribulations/",
    "/blog/2020/deduplicating-swift-arrays":
      "/derived-data/2020/deduplicating-swift-arrays/",
    "/blog/2020/flatmap-throwing-swift-nio":
      "/derived-data/2020/flatmap-throwing-swift-nio/",
    "/blog/2020/mattt-wwdc-2020": "/derived-data/2020/mattt-wwdc-2020/",
    "/blog/2020/wwdc-20-session-notes":
      "/derived-data/2020/wwdc-20-session-notes/",
    "/blog/2020/xcode-12-document-tabs":
      "/derived-data/2020/xcode-12-document-tabs/",
    "/blog/2021/wwdc-21-session-notes":
      "/derived-data/2021/wwdc-21-session-notes/",
    "/blog/2022/ditching-docker-desktop-apple-silicon":
      "/derived-data/2022/ditching-docker-desktop-apple-silicon/",
    "/microblog/": "/experiments/microblog",
    "/frequent-typos": "/experiments/frequent-typos",
    "/writing/chrome-no-more": "/blog/2019/we-need-chrome-no-more/",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
