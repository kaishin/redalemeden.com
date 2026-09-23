# TODO

## Architecture Sync

Items are ordered; each is one focused pull request.

### 1. Upgrade the Prettier toolchain

- [ ] **Gap.** `devDependencies` pins `prettier@^3.6.2`,
      `prettier-plugin-astro@^0.14.1`, and `prettier-plugin-tailwindcss@^0.7.1`.
      Both plugins predate the Astro 7 compiler and Tailwind 4 that the repo now
      builds against, so `.astro` formatting and class sorting drift from what
      the installed toolchain produces, and `pnpm format:check` is only as
      trustworthy as those stale plugins.
- [ ] **Scope.** Bump `prettier` to its current 3.x, `prettier-plugin-astro` to
      its 1.x major, and `prettier-plugin-tailwindcss` to its current release,
      then run `pnpm format` and commit the resulting reformat in the same PR.
      Leave the `.prettierrc` options (`tabWidth`, `useTabs`, plugin list)
      unchanged unless the new plugin majors reject a key.
- [ ] **Risk to control.** `.prettierignore` excludes
      `src/pages/experiments/twil/index.mdx` because the old MDX formatter never
      converged on that file's inline `<ruby>` markup. After the bump, try
      removing the exclusion and run `pnpm format` twice: if the second run
      produces no diff, drop the entry and its comment; if it still oscillates,
      keep both untouched.
- [ ] **Acceptance.** `pnpm format:check` passes on a clean tree; the diff is
      formatting-only — no behavioural edits ride along; `pnpm build` emits the
      same route list as before.
- [ ] **Validation.** `pnpm install`, `pnpm format:check`, `pnpm check`,
      `pnpm build`, and a skim of the reformat diff for anything that is not
      whitespace or class reordering.

### 2. Upgrade TypeScript to 6 and drop `baseUrl`

- [ ] **Gap.** `typescript@^5.9.3` trails the rest of the toolchain, and
      `tsconfig.json` resolves its `paths` aliases through `baseUrl: "."`, a key
      newer TypeScript releases deprecate in favour of paths relative to the
      config file.
- [ ] **Scope.** Bump `typescript` to its 6.x major, remove `baseUrl`, and
      rewrite each entry in `paths` as a `./`-relative path (`"@components/*":
["./src/components/*"]` and so on for `@assets`, `@images`, `@styles`,
      `@layouts`, `@consts`). Keep `extends: astro/tsconfigs/strict` and
      `strictNullChecks`. Fix only the type errors the new compiler surfaces; do
      not restructure code.
- [ ] **Dependencies.** None — `@astrojs/check@^0.9.10` is already installed
      alongside Astro 7.
- [ ] **Acceptance.** Every `@`-prefixed import still resolves — `pnpm check`
      passes with no unresolved-module diagnostics — and `pnpm build` succeeds.
      If the compiler bump produces errors that are not mechanical, stop and
      split them out rather than widening this PR.
- [ ] **Validation.** `pnpm check`, `pnpm build`, and editor-side confirmation
      that go-to-definition still follows an `@layouts/*` import.

### 3. Run the project checks in CI

- [ ] **Gap.** The repo has no `.github/workflows/` directory at all. `check`,
      `format:check`, and `build` exist as scripts but nothing runs them on a
      pull request, so a type error, a formatting regression, or a broken build
      is only caught by whoever remembers to run them locally.
- [ ] **Scope.** Add a single workflow, `.github/workflows/ci.yml`, triggered on
      `pull_request` and `push` to `main`, with one `ubuntu-latest` job that
      checks out, sets up pnpm, sets up Node with pnpm caching, runs
      `pnpm install --frozen-lockfile`, then `pnpm format:check`, `pnpm check`,
      and `pnpm build` as separate steps. Guard each check step with
      `if: ${{ !cancelled() }}` so one run reports every failure instead of
      stopping at the first. No script, dependency, or source changes.
- [ ] **Version consistency.** The Node version the workflow installs must
      satisfy `engines.node` (`>=22.12.0`) and should match `.node-version`
      (`22.12.0`) rather than floating, so CI and the deploy host agree. pnpm
      comes from `packageManager` (`pnpm@10.33.0`); do not pin a second,
      conflicting version in the workflow.
- [ ] **Dependencies.** Item 1 — `pnpm format:check` must be green on `main`
      before it becomes a required step, or CI lands red.
- [ ] **Acceptance.** The workflow runs on a pull request and all three checks
      pass on an unmodified `main`; deliberately introducing a type error in a
      scratch branch fails the `pnpm check` step; `pnpm install
      --frozen-lockfile` succeeds, proving `pnpm-lock.yaml` is in sync with
      `package.json`.
- [ ] **Validation.** Open the PR that adds the workflow and confirm the run is
      green on the PR itself; check that the `format:check` and `check` steps
      both report even when the earlier one fails.

### Shipped

- [x] Add first-class `check` and `format:check` scripts, and switch the
      `README.md` / `CLAUDE.md` command tables to `pnpm`.
- [x] Migrate `blog` and `derived-data` to the Content Layer API
      (`src/content.config.ts`, `glob()` loader, `post.id`, `render(post)`).
- [x] Upgrade Astro 5 to Astro 7 with its `@astrojs/*` integrations, and raise
      `.node-version` plus `engines.node` to the runtime floor it requires.

## Tasks

- [ ] Move to self hosted [Rybbit](https://rybbit.com/docs/self-hosting)
- [ ] Integrate turnstile in contact form (Need to revert d551ee9b3bf2631ba3790d005cb5efd3699b3534)
- [ ] Add JSON feed for Derived Data blog (mirrors existing main blog JSON feed if present)
- [ ] Consider adding a cross-link from Derived Data posts back to the blog index
