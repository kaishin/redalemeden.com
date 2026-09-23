# TODO

## Architecture Sync

Items are ordered; each is one focused pull request.

### 1. Type the RSS endpoints and extract their shared feed builder

- [x] **Gap.** `src/pages/feed.xml.js` and `src/pages/derived-data-feed.xml.js`
      are the only two `.js` files under `src/`; everything else is `.astro` or
      `.ts`. Being untyped JavaScript, they are invisible to `pnpm check`, and
      they are near-identical 37-line copies differing only in the collection
      they read (`blog` vs `derived-data`), the two `consts` they import, and
      the `link` prefix. The duplication already hides a defect: both sort with
      `new Date(b.data.pubDate) - new Date(a.data.pubDate)`, arithmetic on
      `Date` objects that a type-checked file rejects. `postSchema` in
      `src/content.config.ts` already transforms `pubDate` into a `Date`, so
      the `new Date(...)` wrappers are redundant as well.
- [x] **Scope.** Rename both files to `.ts` (`src/pages/feed.xml.ts`,
      `src/pages/derived-data-feed.xml.ts` — the route URLs are unchanged) and
      move the shared body into one `src/lib/feed.ts` helper parameterized by
      collection name, feed title, feed description, and link prefix, returning
      the `rss()` response. Type the `GET` parameter as Astro's `APIContext`
      and the items as `@astrojs/rss`'s own item type. Replace the sort with
      `b.data.pubDate.getTime() - a.data.pubDate.getTime()`. Add
      `"@lib/*": ["./src/lib/*"]` to `paths` in `tsconfig.json`, import the
      helper through it, and switch the endpoints' relative `../consts` import
      to `@consts` so all of `src/` uses one import style. No behaviour change:
      still the 10 most recent non-archived posts, still the sanitized rendered
      body, still the same `customData` block.
- [x] **Dependencies.** None left. The TypeScript 6 upgrade has shipped, so
      `paths` is already `./`-relative with no `baseUrl` (append the new alias
      in the same style), and the new `.ts` files are checked by the
      TypeScript 6 compiler under CI's `pnpm check`.
- [x] **Acceptance.** `pnpm check` must now cover both endpoints and the
      helper. Two type errors are expected to surface, and both must be
      resolved in this PR rather than silenced:
  - `items` currently spreads `...post.data`, which carries `audience`,
    `tags`, `image`, `updatedDate`, and `isArchived` into every feed item. If
    the item type rejects them, pass `title`, `description`, `pubDate`,
    `link`, and `content` explicitly instead of casting the spread.
  - `context.site` is `URL | undefined` under `strictNullChecks`. Handle the
    undefined case by throwing with a clear message; do not use `!`.
- [x] **Acceptance, cont.** The feed URLs must not move. `/feed.xml` is linked
      from `src/layouts/BaseLayout.astro`, `src/components/Navigation.astro`,
      and `src/pages/blog/index.astro`; `/derived-data-feed.xml` from
      `src/components/Navigation.astro` and
      `src/pages/derived-data/index.astro`. Those five hrefs stay as they are,
      and `dist/feed.xml` plus `dist/derived-data-feed.xml` must still be
      emitted.
- [x] **Validation.** `pnpm check`, `pnpm build`. Build `main` first, keep its
      `dist/`, then diff both feed files against the build from this branch.
      The only permitted difference is the `<lastBuildDate>` value, which is
      stamped at build time; item order, `<link>` values, the escaped HTML in
      each item's content, and both `<image>` blocks must match byte for byte.
      Any other diff means the item shape changed and the PR is not ready.

### Shipped

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

- [ ] Move to self hosted [Rybbit](https://rybbit.com/docs/self-hosting)
- [ ] Integrate turnstile in contact form (Need to revert d551ee9b3bf2631ba3790d005cb5efd3699b3534)
- [ ] Add JSON feed for Derived Data blog (mirrors existing main blog JSON feed if present)
- [ ] Consider adding a cross-link from Derived Data posts back to the blog index
