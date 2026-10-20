# TODO

## Architecture Sync

Items are ordered; each is one focused pull request.

### Shipped

- [x] Fail `pnpm check` on warnings, not only errors: `check` now runs
      `astro check --minimumFailingSeverity warning --minimumSeverity warning`
      (the failing-severity flag is what turns a nonzero exit on warnings;
      `--minimumSeverity` only filters what is displayed, so both are set).
      The current tree is clean — 0 errors and 0 warnings. Note: the planned
      throwaway unused-import probe exits 0, because
      `astro/tsconfigs/strict` does not enable `noUnusedLocals`, so unused
      imports are not reported as diagnostics at all; the flags now guard
      against warning-severity diagnostics such as future deprecated-API
      notices instead.

- [x] Upgrade pnpm to 11 and check peer dependencies in CI: `packageManager`
      pinned to `pnpm@11.22.0`, `.node-version` and `engines.node` raised to
      22.13.0 (pnpm 11's floor, verified to refuse 22.12.0),
      `pnpm-workspace.yaml` with `allowBuilds` (`esbuild`/`sharp` true — both
      have install-time scripts; `@tailwindcss/oxide` false — it ships
      prebuilt and has no install-time script) and a `minimumReleaseAgeExclude`
      for the already-pinned `prettier@3.9.9`, plus a `Check peer dependencies`
      CI step running `pnpm peers check`.

- [x] Type the RSS endpoints and extract their shared feed builder into
      `src/lib/feed.ts` (`src/pages/feed.xml.ts`,
      `src/pages/derived-data-feed.xml.ts`, `@lib/*` path alias).
- [x] Upgrade TypeScript to 6 and drop `baseUrl`: `typescript@^6.0.3`,
      `./`-relative `paths` entries, and `@astrojs/check` moved to
      `devDependencies`.
- [x] Run the project checks in CI: add `.github/workflows/ci.yml` that runs
      `pnpm format:check`, `pnpm check`, and `pnpm build` on pull requests and
      pushes to `main`, with Node pinned via `node-version-file: .node-version`,
      pnpm from `packageManager`, and each check step guarded with
      `if: ${{ !cancelled() }}` so one run reports every failure at once.
- [x] Add first-class `check` and `format:check` scripts, and switch the
      `README.md` / `CLAUDE.md` command tables to `pnpm`.
- [x] Migrate `blog` and `derived-data` to the Content Layer API
      (`src/content.config.ts`, `glob()` loader, `post.id`, `render(post)`).
- [x] Upgrade Astro 5 to Astro 7 with its `@astrojs/*` integrations, and raise
      `.node-version` plus `engines.node` to the runtime floor it requires.
- [x] Upgrade the Prettier toolchain (`prettier@^3.9.9`,
      `prettier-plugin-astro@^1.0.1`, `prettier-plugin-tailwindcss@^0.8.1`) and
      reformat the tree. The MDX formatter still oscillates on
      `src/pages/experiments/twil/index.mdx`, so its `.prettierignore` entry and
      the comment explaining it stay.

## Tasks

- [x] Update the Astro lockfile to the latest 7.x patch (Tasker #48)
      The Astro 5 to 7 upgrade is already shipped (astro ^7.3.4, listed under
      Shipped above); only the lockfile lags at 7.3.4 while 7.3.5 is out.
      Run `pnpm up astro`, verify on main with `pnpm check` and `pnpm build`,
      and close as done.
- [x] Generate the main blog JSON feed instead of serving a stale static file (Tasker #104)
      `public/feed.json` is hand-committed and stops at 2024-01-25. Replace it with
      `src/pages/feed.json.ts` mirroring `src/pages/derived-data-feed.json.ts` and
      delete the static file. Acceptance: `pnpm check` and `pnpm build` pass;
      `dist/feed.json` leads with the newest blog post and matches `dist/feed.xml`.
- [x] Remove the nested main landmark from the 404 page (Tasker #107)
      `src/pages/404.astro` wraps its content in `<main>` inside
      `NavigationLayout`'s own `<main>`. Replace the inner one with a fragment or
      plain element. Acceptance: checks and build pass; `dist/404.html` has
      exactly one `<main>`.
- [x] Give the theme selector an accessible name (Tasker #106)
      `src/components/ThemeSelect.astro`'s `<select id="themeSelect">` has no
      label or `aria-label`. Add one (e.g. `aria-label="Color theme"` or an
      `sr-only` label) without visual change. Acceptance: checks and build pass;
      the built select carries an accessible name.
- [x] Fix project card heading level and redundant image alt (Tasker #109)
      `src/components/ProjectCard.astro` uses `<h5>` under the home page's h3
      and `alt={name}` beside the visible name in the same link. Switch to `<h4>`
      (same classes) and `alt=""`. Acceptance: checks and build pass;
      `dist/index.html` cards use `<h4>` and `alt=""`; no visual change.
- [x] Advertise every site feed via link rel=alternate autodiscovery (Tasker #105)
      `BaseLayout.astro` only advertises `/feed.xml`. Add a JSON Feed alternate
      there, and RSS + JSON alternates for Derived Data on its index and post
      pages via the head slot, which `NavigationLayout.astro` and
      `BlogPost.astro` must first forward to `BaseLayout`. Acceptance: checks and
      build pass; built HTML lists the expected alternates inside `<head>`.
- [x] Give post pages a single h1 and stop repeating the site name in the header link (Tasker #108)
      `Header.astro` renders the site name as `<h1>` on every page and
      `BlogPost.astro` adds the post title as a second `<h1>`; the header logo's
      `alt="Reda Lemeden"` duplicates the link text. Set the logo `alt=""` and
      render the header name as a non-heading on post pages (prop via
      `NavigationLayout`). Acceptance: checks and build pass; built blog and
      Derived Data posts have exactly one `<h1>`; `dist/index.html` keeps one.
- [x] Mark the current section in the navigation and delete the unused HeaderLink component (Tasker #114)
      `Navigation.astro` never marks the current page, and `HeaderLink.astro` is
      imported nowhere. Add `aria-current="page"` to the link matching
      `Astro.url.pathname` (trailing slash stripped) and delete `HeaderLink.astro`.
      Acceptance: checks and build pass; built `/blog`, `/derived-data` and
      `/contact` each mark only their own link; `dist/index.html` marks none.
- [x] Fix the misspelled correct spelling on the frequent typos page (Tasker #115)
      `src/pages/experiments/frequent-typos/index.mdx` gives `**Occurence**` as
      the fix for "Occurance"; the correct spelling is `Occurrence`. Change only
      that word. Acceptance: format check, checks and build pass; the built page
      contains "Occurrence" and no `<strong>Occurence</strong>`.
- [x] Give the collection pages a single h1 (Tasker #117)
      `src/pages/collections/swiftui-2022.mdx` and `stable-diffusion.mdx` open
      with a Markdown `#` heading under `Header.astro`'s site-name `<h1>`. Add
      `isPost: true` to both frontmatters (the flag from #108) so the header
      renders a `<p>`. Acceptance: checks and build pass; each built collection
      page has exactly one `<h1>` (its title); `dist/index.html` keeps one.
- [x] Repoint dead microblog post permalinks to their anchors on the microblog page (Tasker #116)
      Eight links use `microblog/post-<ms>` permalinks that 404 (only
      `/microblog/` redirects): six absolute (`https://redalemeden.com/…`) and
      two relative (`/microblog/post-…` in twil #6 and microblog line 268).
      Repoint to `/experiments/microblog#<day>` anchors (`may-13-2020`,
      `mar-17-2020`, `mar-04-2020`, `jul-25-2021`, `nov-14-2020`), and to the
      bare page for the three with no matching entry (twil `#2`, twil `#6`,
      microblog line 499). Acceptance: checks and build pass; a recursive grep
      for `microblog/post-` under `src` finds nothing; every fragment exists
      in the built microblog page.
- [x] Mark post pages as Open Graph articles with their publish dates (Tasker #113)
      `BaseLayout.astro` hard-codes `og:type=website`. Add optional props
      (og type, published/modified time) passed via `NavigationLayout` from
      `BlogPost.astro`, emitting `og:type=article`, `article:published_time` and
      `article:modified_time` when `updatedDate` exists. Also switch the
      `twitter:*` meta tags from `property=` to `name=`. Acceptance: checks and
      build pass; built posts carry the article tags; `dist/index.html` stays
      `website`; no built page contains `property="twitter:`.
- [x] Give the blog, Derived Data, contact and resume pages their own titles (Tasker #119)
      `blog/index.astro`, `derived-data/index.astro`, `contact/index.astro` and
      `contact/thank-you/index.astro` pass no title to `NavigationLayout`, so all
      four are titled just "Reda Lemeden". Pass titles ("Unredacted", "Derived
      Data", "Get in Touch", "Message Sent") and, for the two indexes, their
      intro sentence as description; leave the contact form alone. Also drop the
      "Reda Lemeden | " prefix from `resume/mobile.mdx`'s title (BaseLayout
      appends the suffix). Acceptance: checks and build pass; each page has its
      own `<title>`; the resume title names the site once; `dist/index.html`
      unchanged.
- [x] Fix two dead post links in the 2016 achievement roundup (Tasker #134)
      `src/content/blog/2017/achievement-unlocked-2016/index.md` links
      `/2016/speedster-a-retrospective` and `/2016/swift-3-access-control`;
      no `/2016/*` route or redirect exists. Repoint to
      `/blog/2016/speedster-a-retrospective/` and
      `/derived-data/2016/swift-3-access-control/`. Acceptance: format check,
      checks and build pass; no `](/2016/` under `src/content`.
- [x] Render the keywords meta tag from SITE_KEYWORDS (Tasker #139)
      `src/consts.ts` exports `SITE_KEYWORDS`, but nothing imports it, while
      `BaseLayout.astro` hard-codes a drifted list. Make the constant match the
      rendered list exactly (add `Indie` after `Kaishin`, drop `KaishinLab`),
      import it, and render `SITE_KEYWORDS.join(", ")`. Acceptance: format
      check, checks and build pass; the keywords meta in `dist/index.html` is
      byte-identical; no literal keyword string is left in `BaseLayout.astro`.
- [x] Fix og:image URLs for posts that set a bare image filename (Tasker #138)
      `BaseLayout.astro` resolves `image` against the site root, so bare
      filenames 404: `swift-killer-feature` (`default.jpg`), `we-need-chrome-no-more`
      (`chrome-no-more.jpg`, which lives in `public/social-cards/`) and
      `ditching-docker-desktop-apple-silicon` (`docker-whale.jpg`, which doesn't exist).
      Drop the image line from the first and third posts, and set the second to
      `/social-cards/chrome-no-more.jpg`. Acceptance: format check, checks
      and build pass; every built `og:image`/`twitter:image` starts with
      `https://redalemeden.com/social-cards/`.
- [x] Make link hrefs in feed item content absolute (Tasker #135)
      `src/lib/feed.ts` absolutizes `<img src>` but not `<a href>`, so the newest
      Derived Data post's `/derived-data/2026/what-new-in-xcode-27-mcp-bridge`
      link ships relative in both Derived Data feeds. Add an `a` transform
      resolving `href` against the post URL (skip absolute, `mailto:` and
      `#` hrefs). Acceptance: checks and build pass; no built feed contains a
      root-relative `href`; image `src` output unchanged.
- [x] Keep the contact thank-you page out of the sitemap and search results (Tasker #174)
      `sitemap()` in `astro.config.mjs` has no filter, so the form confirmation
      page `contact/thank-you` is listed and indexable, and `BaseLayout.astro`
      hard-codes an obsolete `noodp, noydir` robots tag. Add an optional
      `noindex` prop (forwarded by `NavigationLayout`) that renders a `noindex`
      robots meta in place of that tag, set it on the thank-you page, and filter
      the page out of the sitemap. Leave archived posts alone. Acceptance:
      format check, checks and build pass; the sitemap omits thank-you but keeps
      `/contact/`; thank-you carries `noindex`; no page contains `noodp`;
      `dist/index.html` has no robots meta.
- [x] Accept unquoted YAML dates for updatedDate (Tasker #175)
      `src/content.config.ts` types `updatedDate` as `z.string()` only, while
      `pubDate` accepts string or Date and 59 posts write it unquoted (a YAML
      Date). An unquoted `updatedDate` therefore fails validation and breaks the
      build. Give it `pubDate`'s string-or-date union and transform, still
      optional; set it on no post. Acceptance: format check, checks and build
      pass; built output unchanged; a throwaway (uncommitted) unquoted
      `updatedDate` on one post builds and renders "Last updated on" plus
      `article:modified_time`.
- [x] Carry post summaries and tags into the JSON feeds and declare JSON Feed 1.1 (Tasker #157)
      `feed.json.ts` and `derived-data-feed.json.ts` drop `description` (the
      RSS feeds ship it) and `tags`, and declare version 1 with the deprecated
      `author`. Expose tags on `FeedEntry`, switch to version 1.1, add
      `language`, `authors` (keep `author` for 1.0 readers), item `summary` and
      `tags`. Keep item ids unchanged. Acceptance: format check, checks and
      build pass; both JSON feeds declare 1.1 with `authors`; described items
      carry `summary`; ids and RSS output unchanged.
- [x] Raise light-mode contrast of muted text and icons (Tasker #177)
      Nine light-mode elements use `text-stone-400` on cream (~2.5:1, failing
      WCAG AA): the Header tagline, the home intro span, the Navigation RSS
      icons, and the Footer social icons and copyright. Replace
      `text-stone-400 dark:text-[var(--muted-text)]` with
      `text-[var(--muted-text)]` and lower the light `--muted-text` in
      `global.css` to `oklch(52% 0.024 294)`. Dark mode and the contact
      placeholders stay as they are. Acceptance: format check, checks and
      build pass; no `text-stone-400` under `src`; light `--muted-text` is
      ≥4.5:1 against cream and the gradient top.
- [x] Raise light-mode contrast of post dates on the blog and Derived Data indexes (Tasker #178)
      The date line under each post title in `src/pages/blog/index.astro` and
      `src/pages/derived-data/index.astro` uses `text-purple-500` on cream
      (~3.9:1 for small semibold text, failing WCAG AA). Replace it with
      `text-purple-600` (~5.3:1 on cream, ~5.0:1 on the gradient top) in both
      places, keeping the dark variant. Acceptance: format check, checks and
      build pass; no `text-purple-500` under `src`; dark mode unchanged.
- [x] Mark the Japanese header subtitle as Japanese (Tasker #195)
      `src/components/Header.astro` can show `開発の何でも屋` as a subtitle on an
      `lang="en"` page with an Inter + generic sans-serif stack, so it is read
      with an English voice and may get Chinese glyphs. Have the subtitle
      script wrap the Japanese option in an element with `lang="ja"` (build
      child spans via `textContent`, no `innerHTML`); keep the list, random
      pick, `&` separator, noscript and classes. Acceptance: format check,
      checks and build pass; the Japanese subtitle renders inside `lang="ja"`,
      English ones carry no `lang`; the header looks the same.
- [x] Project cards should be same height (Tasker #196)
      `src/components/ProjectGrid.astro` stretches each grid `<li>` to its
      row's height, but the `<article>` in `src/components/ProjectCard.astro`
      and its `<a>` keep content height, so cards in a row end unevenly. Make
      the card fill its cell (e.g. `h-full` on the article, a full-height
      block or flex column on the link), keeping image, padding, hover scale,
      colors and dark ring. Leave grid columns, project data and text alone.
      Acceptance: format check, checks and build pass; cards in a row share
      one rendered height at narrow and wide widths, light and dark; each
      card stays one link.
- [x] Give the resume page an h1 and a logical heading order (Tasker #194)
      `src/pages/resume/mobile.mdx` (on `StandaloneLayout`, no Header) has no
      `<h1>`: it opens with `### Reda Lemeden` then `## Staff Engineer — Mobile`.
      Render the name as the single `<h1>` while keeping its current h3 look;
      leave every other heading, the print layout and the content unchanged.
      Acceptance: format check, checks and build pass; the built resume has
      exactly one `<h1>` ("Reda Lemeden") before the h2; it looks the same on
      screen and in print preview.
- [x] Give project cards a visible keyboard focus state and respect reduced motion (Tasker #226)
      In `src/components/ProjectCard.astro` the full-size link sits inside an
      `overflow-hidden` rounded `<article>`, so the default focus outline is
      clipped and keyboard users see no focus indicator; the hover scale never
      applies on focus and has no reduced-motion variant. Add a visible focus
      ring on the card when its link is `:focus-visible` (light and dark),
      mirror the hover lift on focus, and add `motion-reduce` variants that
      drop scale and transition. Keep the look, equal heights and one link per
      card. Acceptance: format check, checks and build pass; tabbing shows an
      unclipped focus indicator in both modes; no scaling with reduced motion.
- [x] Link only the post title on the blog and Derived Data indexes (Tasker #227)
      `src/pages/blog/index.astro` and `src/pages/derived-data/index.astro`
      wrap each entry's `<h3>`, date and tag `<ul>` in one `<a>`, so its
      accessible name runs title + date + tags. Move the `<a>` inside the
      `<h3>` around the title only and keep the entry clickable with a
      stretched link (`relative` on the `<li>`, `after:absolute after:inset-0`
      on the link); keep classes, hrefs, order and filtering. Acceptance:
      format check, checks and build pass; every built index post link sits in
      an `<h3>` and holds only the title; clicking anywhere on an entry still
      opens the post; no visual change in either mode.
- [x] Add og:site_name and og:locale to the Open Graph tags (Tasker #229)
      `src/layouts/BaseLayout.astro` emits og:type, og:url, og:title,
      og:description and og:image but no `og:site_name` or `og:locale`. Add
      `<meta property="og:site_name" content={SITE_TITLE} />` (already
      imported) and `<meta property="og:locale" content="en_US" />` next to
      og:type; change nothing else. Acceptance: format check, checks and build
      pass; every built page carries exactly one og:site_name ("Reda Lemeden")
      and one og:locale ("en_US"); other meta tags unchanged.
- [x] Fix drifted code style and collection notes in CLAUDE.md and README.md (Tasker #233)
      `CLAUDE.md` says strings use single quotes, but `.prettierrc` sets no
      `singleQuote` and the code uses double quotes; it describes only the
      `blog` collection (not `derived-data`) and omits `isArchived` from the
      optional fields. `README.md`'s Assets section still calls assets "an
      experimental feature in v2". Fix those lines; docs only. Acceptance:
      format check passes; neither file mentions single quotes or the v2
      note; `CLAUDE.md` names both collections and `isArchived`.
- [x] Stop the new-post script from scaffolding ignored and blank frontmatter (Tasker #232)
      `scripts/new-post.mjs` writes `draft: true` (no schema field, so Zod
      strips it and the post publishes anyway) and empty `description`,
      `audience` and `image` (an empty description beats `BaseLayout`'s
      `SITE_DESCRIPTION` default, so meta/og descriptions ship empty). Drop
      those four lines, keep title, `tags: []` and `pubDate`, and add a YAML
      comment listing the optional fields. No draft support, no post edits.
      Acceptance: format check, checks and build pass; a throwaway scaffolded
      post has no `draft` key or empty strings and renders the site
      description.
- [x] Add a web app manifest so the Android home-screen icons are used (Tasker #234)
      `public/android-chrome-192x192.png` and `-512x512.png` are referenced
      nowhere: there is no `site.webmanifest` and no `rel=manifest` link in
      `BaseLayout.astro`. Add `public/site.webmanifest` (name/short_name
      "Reda Lemeden", `start_url` "/", the two PNG icons), a `rel=manifest`
      link after the shortcut icon, and a `public/_headers` entry serving it
      as `application/manifest+json`. No `theme_color`/`display`, no other
      icon or meta changes. Acceptance: format check, checks and build pass;
      `dist/site.webmanifest` is valid JSON with existing icon paths; every
      built page has one `rel=manifest` link.
- [x] Title the home page with the site name alone (Tasker #236)
      `src/pages/index.mdx` sets `title: "Home"`, so `BaseLayout.astro` makes
      the home `<title>`, meta title, og:title and twitter:title read
      "Home | Reda Lemeden". Remove that frontmatter line so the title falls
      back to `SITE_TITLE` (left unsuffixed); keep the layout line and body,
      touch no other page or layout. Acceptance: format check, checks and
      build pass; `dist/index.html` is titled "Reda Lemeden" in `<title>`,
      og:title and twitter:title; no built title contains "Home |"; other
      titles unchanged.
- [x] Give the experiment and collection pages their own meta descriptions (Tasker #235)
      `experiments/microblog/index.md`, `experiments/twil/index.mdx`,
      `experiments/frequent-typos/index.mdx`, `collections/stable-diffusion.mdx`
      and `collections/swiftui-2022.mdx` under `src/pages` set no
      `description`, so they ship `SITE_DESCRIPTION` in meta, og and twitter
      tags. Add a quoted one-line `description` from each page's intro
      sentence (as #119 did), ending twil and frequent-typos with a period.
      Leave the bodies and the other pages alone. Acceptance: format check,
      checks and build pass; each of the five pages' descriptions equals its
      intro sentence; `dist/index.html` keeps `SITE_DESCRIPTION`.
- [x] Show each post's assumed audience under its title (Tasker #238)
      32 posts set `audience` (31 non-empty) and the 2019
      `note-about-assumed-audiences` post says every article opens with it, but
      `src/layouts/BlogPost.astro` never renders it. When `audience?.trim()` is
      non-empty, render "Assumed audience: <text>" (period added unless it ends
      in `.`, `!` or `?`) after the title divider, before the archived notice,
      as a small muted line (mind the dark `prose-p` color; `not-prose` helps).
      Reword `we-need-chrome-no-more`'s full-sentence value to "people
      interested in the open Web as a platform." Schema, feeds, indexes and
      other content unchanged. Acceptance: format check, checks and build pass;
      the 31 posts show exactly one line; empty or missing values show none; no
      "Assumed audience: This article"; legible in both modes.
- [x] Fall back to the post's opening paragraph for its meta description (Tasker #237)
      Only 5 of 59 posts set `description`, so 54 post pages ship
      `SITE_DESCRIPTION` in meta, og and twitter tags. Add a `src/lib` helper
      that parses `post.body` with markdown-it, takes the first paragraph with
      text (some posts open with an image), joins its text tokens as plain text
      and truncates to ~160 characters at a word boundary with an ellipsis. Both
      `[...slug].astro` routes pass `description ?? excerpt(post.body)`; a
      frontmatter description wins. Feeds, indexes and content unchanged.
      Acceptance: format check, checks and build pass; no built post's
      description equals `SITE_DESCRIPTION` or contains `](`, `**`, `<` or
      `&amp;amp;`; the five set descriptions are verbatim; `dist/index.html`
      keeps `SITE_DESCRIPTION`.
- [x] Add BlogPosting structured data to post pages (Tasker #239)
      Nothing under `src` emits `application/ld+json`. In
      `src/layouts/BlogPost.astro` add one `ld+json` script to the head slot
      with a schema.org `BlogPosting`: raw-title `headline`, `description` when
      passed, `datePublished`, `dateModified` (only with `updatedDate`), a
      `Person` author from `SITE_AUTHOR`/`SITE_URL`, canonical `url` and
      `mainEntityOfPage`, and `image` resolved like og:image. Escape `<` in
      the JSON as its Unicode escape (backslash, `u003c`). BaseLayout, meta
      tags, feeds and other pages unchanged.
      Acceptance: format check, checks and build pass; each built post has one
      parseable `BlogPosting` whose headline, `datePublished` and image match
      its h1, `article:published_time` and og:image; the home and index pages
      have none.
- [x] Keep the footnotes heading available to screen readers (Tasker #247)
      `src/styles/global.css` hides `.prose :where(.footnotes h2)` with
      `display: none`. That unlayered rule beats any `sr-only` utility and
      drops Astro's `<h2 class="sr-only" id="footnote-label">Footnotes</h2>`
      from the accessibility tree. Nine posts have footnotes. Replace `display: none` in that rule with the
      standard visually-hidden declarations (absolute, 1px box, -1px margin, no
      padding or border, overflow hidden, clip rect 0, nowrap). Selector, the
      font-size rule, markdown config and content unchanged. Acceptance: format
      check, checks and build pass; a footnoted post keeps one "Footnotes" h2
      (`id="footnote-label"`) in `section.footnotes`, invisible in both modes
      with no layout shift; no built CSS sets `display: none` on it.
- [x] Stop the new-post script from overwriting posts or writing outside a slug folder (Tasker #243)
      `scripts/new-post.mjs` writes `index.md` with no existence check, so a
      repeated title in the same year silently replaces a post; a title with no
      ASCII letters or digits slugifies to "" and writes
      `src/content/blog/<year>/index.md`; and the raw title inside a
      double-quoted YAML scalar breaks on a double quote or backslash. Exit 1
      on an empty slug, refuse to overwrite (`wx` flag or a check), and write
      the title as `JSON.stringify(title)`. Frontmatter shape, paths and the
      skill unchanged. Acceptance: format check, checks and build pass;
      throwaway runs (deleted, nothing committed) show a fresh title works, a
      repeat exits nonzero leaving the file intact, a Japanese-only title
      creates nothing, and a title with a double quote builds verbatim.
- [ ] Render footnotes in feed content and keep footnote markers out of post excerpts (Tasker #255)
      `src/lib/feed.ts` and `src/lib/excerpt.ts` use a bare markdown-it with no
      footnote syntax, so feeds show literal `[^1]` references and `[^1]:`
      paragraphs (the newest Derived Data post in both Derived Data feeds;
      `stable-diffusion-a-quick-tour` in both blog feeds), and
      `2011/invisible-computers`'s meta description reads "article[^1] from".
      Add `markdown-it-footnote` (plus its types if needed), use it in both
      parsers, and allow `id` on `a` and `li` in the sanitize-html options so
      the fragments resolve. Keep other tags, attributes, the a/img transforms,
      content and the feed shape as they are. Acceptance: format check, checks
      and build pass; no built feed contains `[^`; each footnote renders as a
      sup link whose `#fn` fragment matches a `li` id in the same item;
      invisible-computers' description has no `[^`; feed items for posts
      without footnotes are byte-identical (ignore lastBuildDate).
- [ ] Keep the theme scripts working when localStorage is blocked (Tasker #258)
      The inline theme scripts in `src/layouts/BaseLayout.astro` and
      `src/components/ThemeSelect.astro` access `localStorage` unguarded.
      Browsers throw a SecurityError when site storage is blocked, so the head
      script never applies a dark system theme and the selector gets no change
      listener. Wrap reads and writes in try/catch helpers (a failed read means
      no stored theme, a failed write is ignored), and keep the current choice
      in a variable so `handleSystemChange` doesn't undo an in-session pick.
      Key, values, theme logic, color-scheme meta, markup and styles stay as
      they are; both scripts stay `is:inline`. Acceptance: format check,
      checks and build pass; with storage blocked a page loads without console
      errors, follows the system scheme, and the selector switches the theme
      for the session; with storage available, saved choices persist and
      System clears them, as now.
- [ ] Proposal: Show tags and previous/next post links on post pages (Tasker #228)
      `src/layouts/BlogPost.astro` shows only date, title and archived notice;
      58 posts carry tags visible only on the indexes, and there is no way to
      the adjacent post. Proposal: tag pills under the title (index style) and a
      previous/next footer within the same collection by `pubDate`. Owner
      decides first: plain pills or new per-tag pages; whether prev/next is
      wanted and skips archived posts; tag placement. Acceptance once decided:
      format check, checks and build pass; tagged posts show their tags;
      prev/next stays in-collection and points at built posts.
- [ ] Move to self hosted [Rybbit](https://rybbit.com/docs/self-hosting)
- [ ] Integrate turnstile in contact form (Need to revert d551ee9b3bf2631ba3790d005cb5efd3699b3534)
- [x] Add JSON feed for Derived Data blog (mirrors existing main blog JSON feed
      if present)

## Not ready

Blocked on explicit owner direction; the autonomous builder must not pick
these up.

- Tasker #49 — blocked: Write a response to https://jola.dev/posts/ai-antithetical-learning
