# TODO

## Architecture Sync

Items are ordered; each is one focused pull request.

### 1. Fail `pnpm check` on warnings, not only errors

- [ ] **Gap.** `check` in `package.json` is a bare `astro check`, which exits 0
      whenever there are no errors. Warnings such as unused imports and
      variables, deprecated Astro APIs, and suspicious template expressions
      appear in the log but never turn CI's `Type check` step red, so they
      pile up unnoticed. Deprecations matter most here: they are the early
      notice for the next Astro major, and today nothing forces anyone to
      act on them.
- [ ] **Scope.** Change the script to
      `astro check --minimumSeverity warning`. Fix every warning it surfaces
      in the same PR, keeping each fix minimal (delete the unused binding,
      move to the non-deprecated API). Do not relax `tsconfig.json`, do not
      add `// @ts-ignore` or `// @ts-expect-error`, and do not add hint-level
      reporting. `.github/workflows/ci.yml` already runs `pnpm check`, so it
      needs no change.
- [ ] **Acceptance.** `pnpm check` reports 0 errors and 0 warnings and exits 0.
      Record the warnings the first run found in the PR description, grouped
      by file. If they amount to more than a small, mechanical set (say about
      15, or any fix that changes rendered output), only change the script and
      fix the mechanical ones. Leave the rest as a separate backlog item and
      explain why in the PR, rather than growing this PR.
- [ ] **Validation.** `pnpm check`, `pnpm format:check`, `pnpm build`. Add a
      throwaway unused import to a `.astro` file and confirm `pnpm check` now
      exits non-zero, then revert it. `dist/` should not change apart from
      build-stamped values such as `<lastBuildDate>` in the two feeds.

### 2. Upgrade pnpm to 11 and check peer dependencies in CI

- [ ] **Gap.** `packageManager` pins `pnpm@10.33.0`, and nothing in CI notices
      when an installed package's peer range stops matching its host. That
      matters most during major upgrades like the Astro 7 move: an
      `@astrojs/*` integration or `@astrojs/check` can peer-require a
      `typescript` or `astro` range that the lockfile no longer satisfies.
      pnpm only warns about this during `pnpm install`, where nobody reads the
      output. pnpm 11 adds `pnpm peers check`, which exits non-zero on
      unmet or invalid peers. The repo also has no `pnpm-workspace.yaml`, so
      nothing records which dependencies may run install scripts (`sharp`,
      `esbuild`, `@tailwindcss/oxide`).
- [ ] **Scope, one toolchain change.**
  - Bump `packageManager` to the current `pnpm@11.x` release.
  - pnpm 11 refuses to run below Node `22.13.0`. Raise `.node-version` and
    `engines.node` from `22.12.0` / `>=22.12.0` to `22.13.0` / `>=22.13.0`,
    together. CI reads `.node-version`, so without this bump CI would break
    as soon as the pin moves. Astro 7's own floor is `>=22.12.0`, so the
    higher pnpm floor wins.
  - Add `pnpm-workspace.yaml` with `packages: ["."]` and an `allowBuilds` map
    listing each dependency that `pnpm install` reports as having an
    unapproved build script. Expect `sharp`, `esbuild`, and
    `@tailwindcss/oxide`. Set each to `true` only if the build needs it and
    `false` otherwise, and give the reason in the PR description.
  - Regenerate `pnpm-lock.yaml` with the new pnpm, then run `pnpm format` so
    the lockfile keeps the Prettier formatting it already has.
  - Add a `Check peer dependencies` step running `pnpm peers check` to
    `.github/workflows/ci.yml` before `Check formatting`, with
    `if: ${{ !cancelled() }}` like the other steps.
- [ ] **Acceptance.** Delete `node_modules`, then run
      `pnpm install --frozen-lockfile`. It must exit 0 with no warnings about
      unapproved build scripts. `pnpm peers check` exits 0. If it reports real
      peer mismatches, fix them by moving the offending range in this PR. If a
      fix would need a major upgrade, stop and record it as its own backlog
      item instead of widening this PR. Update any Node or pnpm version
      mentioned in `README.md` or `CLAUDE.md`.
- [ ] **Validation.** Run `pnpm peers check`, `pnpm format:check`,
      `pnpm check`, and `pnpm build` locally on Node 22.13.0. CI must pass
      with the new step, and the `Setup pnpm` log must show the 11.x version.

### Shipped

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

- [ ] Move to self hosted [Rybbit](https://rybbit.com/docs/self-hosting)
- [ ] Integrate turnstile in contact form (Need to revert d551ee9b3bf2631ba3790d005cb5efd3699b3534)
- [ ] Add JSON feed for Derived Data blog (mirrors existing main blog JSON feed if present)
- [ ] Consider adding a cross-link from Derived Data posts back to the blog index
