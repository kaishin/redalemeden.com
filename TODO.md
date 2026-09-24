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

### Shipped

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

- [ ] Move to self hosted [Rybbit](https://rybbit.com/docs/self-hosting)
- [ ] Integrate turnstile in contact form (Need to revert d551ee9b3bf2631ba3790d005cb5efd3699b3534)
- [ ] Add JSON feed for Derived Data blog (mirrors existing main blog JSON feed if present)
- [ ] Consider adding a cross-link from Derived Data posts back to the blog index
