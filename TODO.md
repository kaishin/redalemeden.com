# TODO

## Architecture Sync

Items are ordered; each is one focused pull request.

### Shipped

- [x] Fail `pnpm check` on warnings, not only errors: `check` now runs
      `astro check --minimumSeverity warning` (matching the reference
      toolchain). The current tree is clean — 0 errors and 0 warnings. Note:
      the planned throwaway unused-import probe exits 0, because
      `astro/tsconfigs/strict` does not enable `noUnusedLocals`, so unused
      imports are not reported as diagnostics at all; the flag now guards
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

- [ ] Move to self hosted [Rybbit](https://rybbit.com/docs/self-hosting)
- [ ] Integrate turnstile in contact form (Need to revert d551ee9b3bf2631ba3790d005cb5efd3699b3534)
- [ ] Add JSON feed for Derived Data blog (mirrors existing main blog JSON feed if present)
- [ ] Consider adding a cross-link from Derived Data posts back to the blog index
