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
- [ ] Raise light-mode contrast of muted text and icons (Tasker #177)
      Nine light-mode elements use `text-stone-400` on cream (~2.5:1, failing
      WCAG AA): the Header tagline, the home intro span, the Navigation RSS
      icons, and the Footer social icons and copyright. Replace
      `text-stone-400 dark:text-[var(--muted-text)]` with
      `text-[var(--muted-text)]` and lower the light `--muted-text` in
      `global.css` to `oklch(52% 0.024 294)`. Dark mode and the contact
      placeholders stay as they are. Acceptance: format check, checks and
      build pass; no `text-stone-400` under `src`; light `--muted-text` is
      ≥4.5:1 against cream and the gradient top.
- [ ] Raise light-mode contrast of post dates on the blog and Derived Data indexes (Tasker #178)
      The date line under each post title in `src/pages/blog/index.astro` and
      `src/pages/derived-data/index.astro` uses `text-purple-500` on cream
      (~3.9:1 for small semibold text, failing WCAG AA). Replace it with
      `text-purple-600` (~5.3:1 on cream, ~5.0:1 on the gradient top) in both
      places, keeping the dark variant. Acceptance: format check, checks and
      build pass; no `text-purple-500` under `src`; dark mode unchanged.
- [ ] Move to self hosted [Rybbit](https://rybbit.com/docs/self-hosting)
- [ ] Integrate turnstile in contact form (Need to revert d551ee9b3bf2631ba3790d005cb5efd3699b3534)
- [x] Add JSON feed for Derived Data blog (mirrors existing main blog JSON feed
      if present)

## Not ready

Blocked on explicit owner direction; the autonomous builder must not pick
these up.

- Tasker #49 — blocked: Write a response to https://jola.dev/posts/ai-antithetical-learning
