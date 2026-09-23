# TODO

## Architecture Sync

Items are ordered; each is one focused pull request.

### 1. Run the project checks in CI

- [ ] **Gap.** The repo has no `.github/workflows/` directory at all. `check`,
      `format:check`, and `build` exist as scripts but nothing runs them on a
      pull request, so a type error, a formatting regression, or a broken build
      is only caught by whoever remembers to run them locally.
- [ ] **Scope.** Add a single workflow, `.github/workflows/ci.yml`, triggered on
      `pull_request` and `push` to `main`, with one `ubuntu-latest` job that
      checks out (`actions/checkout@v7`), sets up pnpm
      (`pnpm/action-setup@v6`), sets up Node with pnpm caching
      (`actions/setup-node@v7`, `cache: "pnpm"`), runs
      `pnpm install --frozen-lockfile`, then `pnpm format:check`, `pnpm check`,
      and `pnpm build` as separate steps. Guard each check step with
      `if: ${{ !cancelled() }}` so one run reports every failure instead of
      stopping at the first. No script, dependency, or source changes.
- [ ] **Version consistency.** Drive the Node version from `node-version-file:
.node-version` rather than a literal in the workflow, so CI, the deploy
      host, and `engines.node` (`>=22.12.0`) cannot drift apart. pnpm comes from
      `packageManager` (`pnpm@10.33.0`); do not pin a second, conflicting
      version in the workflow.
- [ ] **Dependencies.** None. `pnpm format:check`, `pnpm check`, and
      `pnpm build` are all green on `main` today, so the workflow lands green.
- [ ] **Acceptance.** The workflow runs on a pull request and all three checks
      pass on an unmodified `main`; deliberately introducing a type error in a
      scratch branch fails the `pnpm check` step; `pnpm install
--frozen-lockfile` succeeds, proving `pnpm-lock.yaml` is in sync with
      `package.json`.
- [ ] **Validation.** Open the PR that adds the workflow and confirm the run is
      green on the PR itself; check that the `format:check` and `check` steps
      both report even when the earlier one fails.

### 2. Upgrade TypeScript to 6 and drop `baseUrl`

- [ ] **Gap.** `typescript@^5.9.3` trails the rest of the toolchain, and
      `tsconfig.json` resolves its `paths` aliases through `baseUrl: "."`, a key
      newer TypeScript releases deprecate in favour of paths relative to the
      config file.
- [ ] **Scope.** Bump `typescript` to the 6.x line (`^6.0.3` or the newest 6.x
      at the time of the PR), remove `baseUrl`, and rewrite all six entries in
      `paths` as `./`-relative paths (`"@components/*": ["./src/components/*"]`,
      and likewise for `@assets`, `@images`, `@styles`, `@layouts`, and
      `"@consts": ["./src/consts.ts"]`). Keep `extends:
astro/tsconfigs/strict` and `strictNullChecks`. Fix only the type errors
      the new compiler surfaces; do not restructure code. Regenerate and commit
      `pnpm-lock.yaml` so the `--frozen-lockfile` install from item 1 keeps
      passing.
- [ ] **Same-PR tidy.** `@astrojs/check` sits in `dependencies` even though it
      is a type-checking tool that never ships to the site. Move it to
      `devDependencies` alongside the compiler bump so the whole type-check
      toolchain lands in one change; keep the version at `^0.9.10`, which drives
      the TypeScript 6 compiler fine, and `astro check` must still run from
      `pnpm check`.
- [ ] **Dependencies.** Item 1, so the bump lands against a pull request that
      already runs `pnpm check` and `pnpm build` automatically.
- [ ] **Acceptance.** All 34 alias references across 22 files in `src/` still
      resolve. They come in three kinds and each needs its own proof, because
      only the first is type-checked:
  - 16 `import` statements across 13 files (`src/layouts/*.astro`,
    `src/components/ProjectGrid.astro`, and the `.astro`/`.mdx` pages under
    `src/pages/`), covered by `pnpm check`.
  - 8 `layout: "@layouts/..."` strings, one each in the frontmatter of
    `src/pages/index.mdx`, `work/index.mdx`, `resume/mobile.mdx`,
    `collections/stable-diffusion.mdx`, `collections/swiftui-2022.mdx`, and
    `experiments/{frequent-typos,twil}/index.mdx` plus
    `experiments/microblog/index.md`. Only Vite resolves these at build time,
    so `pnpm build` must succeed and those pages must render with their
    layout chrome.
  - 10 `@images/...` URLs inside markdown image syntax across 3 files
    (`src/pages/experiments/microblog/index.md` has 8;
    `src/content/blog/2019/update-nope-syndicate/index.md` and
    `src/content/derived-data/2019/inset-grouped-lists-swiftui/index.md`
    have 1 each). These go through the markdown asset pipeline, not the
    compiler, so they need an output diff rather than a green type check.
- [ ] **Acceptance, cont.** If the compiler bump produces errors that are not
      mechanical, stop and split them out rather than widening this PR.
- [ ] **Validation.** `pnpm install`, `pnpm check`, `pnpm build`. Build `main`
      first and keep `dist/`, then diff it against the build from this branch:
      the two must be byte-identical, which is what proves the `baseUrl`
      removal changed no resolution behaviour for any of the three reference
      kinds. If the diff is non-empty, inspect the three markdown-image pages
      and the layout-by-string pages specifically before accepting it. Finish
      with editor-side confirmation that go-to-definition still follows an
      `@layouts/*` import.

### Shipped

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
