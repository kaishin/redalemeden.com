## Why

Social card previews are broken on most platforms (Twitter/X, Slack, etc.) for blog and derived-data posts. The `og:image` and `twitter:image` tags resolve to the page's own URL instead of an image, so crawlers that require a valid image — like Twitter's `summary_large_image` card — fail to render a preview. The landing page works on Facebook only because Facebook falls back to the first inline `<img>`.

The root cause is two-fold: posts can carry an empty-string `image` frontmatter value, and the layout's image fallback only triggers on `undefined`, so the empty string passes through to `new URL("", Astro.url)`, which returns the page URL itself.

## What Changes

- Make the social-image fallback in `BaseLayout.astro` treat empty/whitespace-only `image` values as "not set", so the default social card is always used when a post does not specify a real image.
- Resolve the social image URL against the site origin (`Astro.site`) rather than the current page URL, so default and relative image paths always produce an absolute, image-pointing URL.
- Remove the empty `image: ""` frontmatter from the affected post(s) so the layout default applies cleanly.
- Verify the generated `og:image` / `twitter:image` tags point to a real image for posts with and without a custom image.

## Capabilities

### New Capabilities

- `social-card-metadata`: Generation of Open Graph and Twitter card metadata (image, title, description, URL) for pages, including the fallback behaviour when a page does not specify a custom social image.

### Modified Capabilities

<!-- None: no existing specs. -->

## Impact

- `src/layouts/BaseLayout.astro` — image fallback logic and `og:image` / `twitter:image` URL resolution.
- `src/content/derived-data/2026/how-to-use-any-harness-with-xcode-27/index.md` — remove empty `image` frontmatter.
- Any other content entry that sets `image: ""` (audit during implementation).
- No schema or dependency changes; `image` remains optional in `src/content/config.ts`.
