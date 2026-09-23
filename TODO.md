# TODO

## Architecture Sync

Items are ordered; each is one focused pull request. Items 1–3 are the Astro 7
upgrade path and must land in order.

### 1. Add first-class `check` and `format:check` scripts

- [x] **Gap.** `@astrojs/check` is a dependency but `package.json` exposes no
      script for it, so "run the project checks" has no entry point and every
      later item has to invent its own command. Prettier is configured but only
      runnable ad hoc.
- [x] **Scope.** In `package.json` add `"check": "astro check"` and
      `"format": "prettier --write ."` / `"format:check": "prettier --check ."`.
      Update the command tables in `README.md` and `CLAUDE.md` to list them and
      to use `pnpm` (the repo pins `packageManager: pnpm@10.33.0`, while both
      docs still say `npm`). No source or config changes.
- [x] **Acceptance.** `pnpm check` type-checks the project and `pnpm format:check`
      reports the current formatting state; both are documented.
- [x] **Validation.** `pnpm install`, `pnpm check`, `pnpm format:check`,
      `pnpm build`. If `pnpm format:check` fails on files untouched by this PR,
      run `pnpm format` in the same PR so the baseline is clean for later items.

### 2. Migrate content collections to the Content Layer API

- [x] **Gap.** `src/content/config.ts` declares `blog` and `derived-data` with
      `defineCollection({ schema })` and no loader, and the pages use
      `post.slug` and `await post.render()`. This is the legacy content
      collections API, which is removed in Astro 6 and later — it is the single
      blocking incompatibility for item 3. Astro 5 already supports the
      replacement, so this migration can land and be verified on the current
      version.
- [x] **Scope.** Move the config to `src/content.config.ts`; define both
      collections with `glob({ base: "./src/content/blog", pattern:
"**/*.{md,mdx}" })` (and the `derived-data` equivalent), keeping the
      existing Zod schema unchanged. Replace `post.slug` with `post.id` and
      `await post.render()` with `render(post)` imported from `astro:content`
      across the six `getCollection` call sites in `src/pages/` (`blog/index`,
      `blog/[...slug]`, `derived-data/index`, `derived-data/[...slug]`,
      `feed.xml.js`, `derived-data-feed.xml.js`). Content files stay where they
      are. Update the `src/content/config.ts` reference in `CLAUDE.md` and the
      `src/content/` description in `README.md`.
- [x] **Risk to control.** Every post lives at
      `src/content/<collection>/<year>/<name>/index.md`, and the published URLs
      are `/blog/<year>/<name>/`. The loader must produce ids that keep that
      shape — in particular the trailing `index` segment must not leak into the
      id. If the default id generation does not match, supply a `generateId`
      that reproduces the current slugs rather than adding redirects.
- [x] **Dependencies.** Item 1 (for `pnpm check`).
- [x] **Acceptance.** No `astro:content` legacy API remains (`grep` for
      `.render()` and `.slug` returns nothing in `src/`); `astro check` passes;
      the set of routes emitted under `dist/blog/` and `dist/derived-data/` is
      byte-identical to the pre-change build; `dist/feed.xml` and
      `dist/derived-data-feed.xml` keep the same `<link>` values and item
      ordering; `RSS` item bodies are still populated (`post.body` is optional
      under the loader, so guard the `sanitizeHtml(parser.render(...))` call).
- [x] **Validation.** Capture `find dist -name '*.html' | sort` and the two feed
      files before the change, re-run `pnpm build` after, and diff. Then
      `pnpm check` and a manual `pnpm dev` spot-check of one blog post and one
      Derived Data post.

### 3. Upgrade Astro 5 to Astro 7

- [x] **Gap.** The project is pinned to `astro@^5.15.5` with `.node-version`
      at `20.18.1`, which is below the runtime floor every Astro release after 5
      requires. Integrations (`@astrojs/mdx@^4`, `@astrojs/sitemap@^3`,
      `@astrojs/rss@^4`, `@astrojs/check@^0.9.5`) are on their Astro 5 majors.
- [x] **Scope.** One PR covering the whole toolchain hop: run
      `pnpm dlx @astrojs/upgrade` to move `astro` and the `@astrojs/*`
      integrations to their Astro 7 majors; work through the breaking changes in
      both the Astro 6 and Astro 7 upgrade guides (two majors are crossed at
      once); raise `.node-version` to satisfy `engines.node` in the installed
      `node_modules/astro/package.json` and add a matching `engines.node` field
      to `package.json` so the constraint is declared, not implied; confirm
      `@lucide/astro`, `@tailwindcss/vite`, and `tailwindcss` resolve against the
      new `astro`/Vite peer ranges and bump them if they do not. Update the
      "Astro 5" wording in `CLAUDE.md`. Keep behaviour changes out of this PR.
- [x] **Deployment note.** The site is static with no adapter; `.node-version`
      is what the host reads, so it must be bumped here and not left to a
      separate deploy chore.
- [x] **Dependencies.** Item 2 must be merged first — Astro 6+ removed the
      legacy collections API this repo still uses.
- [x] **Acceptance.** `astro` resolves to a 7.x release; `.node-version` and
      `engines.node` agree with Astro's declared `engines`; `pnpm check` passes
      with no new diagnostics; `pnpm build` succeeds; the emitted route list and
      both feeds are unchanged from the item 2 baseline; the `redirects` map and
      the Shiki light/dark theme config in `astro.config.mjs` still behave as
      before.
- [x] **Validation.** `pnpm install`, `pnpm check`, `pnpm build`,
      `pnpm preview` with a spot-check of the home page, a blog post, a Derived
      Data post, `/feed.xml`, and one configured redirect (e.g. `/blog/1`).

### 4. Upgrade the Prettier toolchain

- [ ] **Gap.** `prettier-plugin-astro@^0.14.1` and
      `prettier-plugin-tailwindcss@^0.7.1` predate the current Astro and
      Tailwind 4 majors, so formatting of `.astro` files and class sorting drift
      from what the installed compiler produces.
- [ ] **Scope.** Bump `prettier`, `prettier-plugin-astro` (to its 1.x release),
      and `prettier-plugin-tailwindcss` in `devDependencies`, then run
      `pnpm format` and commit the resulting reformat as part of the same PR.
      No `.prettierrc` option changes unless the new plugin majors reject an
      existing key.
- [ ] **Dependencies.** Item 3, so the reformat is applied to post-upgrade
      source.
- [ ] **Acceptance.** `pnpm format:check` passes on a clean tree; the diff is
      formatting-only — no behavioural edits ride along; `pnpm build` output is
      unchanged.
- [ ] **Validation.** `pnpm format:check`, `pnpm check`, `pnpm build`, and a
      skim of the reformat diff for anything that is not whitespace or class
      reordering.

### 5. Upgrade TypeScript to 6 and drop `baseUrl`

- [ ] **Gap.** `typescript@^5.9.3` trails the toolchain, and `tsconfig.json`
      resolves its `paths` aliases through `baseUrl: "."`, a key that newer
      TypeScript releases deprecate in favour of paths relative to the config
      file.
- [ ] **Scope.** Bump `typescript` to its 6.x major, remove `baseUrl`, and
      rewrite each entry in `paths` as a `./`-relative path (`"@components/*":
["./src/components/*"]` and so on for `@assets`, `@images`, `@styles`,
      `@layouts`, `@consts`). Keep `extends: astro/tsconfigs/strict` and
      `strictNullChecks`. Fix only the type errors the new compiler surfaces; do
      not restructure code.
- [ ] **Dependencies.** Item 3, so `@astrojs/check` is already on the release
      that supports this compiler.
- [ ] **Acceptance.** Every `@`-prefixed import still resolves — `pnpm check`
      passes with no unresolved-module diagnostics — and `pnpm build` succeeds.
      If the compiler bump produces errors that are not mechanical, stop and
      split them out rather than widening this PR.
- [ ] **Validation.** `pnpm check`, `pnpm build`, and editor-side confirmation
      that go-to-definition still follows an `@layouts/*` import.

## Tasks

- [ ] Move to self hosted [Rybbit](https://rybbit.com/docs/self-hosting)
- [ ] Integrate turnstile in contact form (Need to revert d551ee9b3bf2631ba3790d005cb5efd3699b3534)
- [ ] Add JSON feed for Derived Data blog (mirrors existing main blog JSON feed if present)
- [ ] Consider adding a cross-link from Derived Data posts back to the blog index
