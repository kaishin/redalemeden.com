## 1. Fix layout metadata logic

- [x] 1.1 In `src/layouts/BaseLayout.astro`, replace the `image` destructuring default with explicit normalization: trim `Astro.props.image`, and fall back to `/social-cards/default.jpg` when empty/whitespace/undefined.
- [x] 1.2 Change `og:image` and `twitter:image` to resolve via `new URL(image, Astro.site)` instead of `Astro.url`.

## 2. Clean up content frontmatter

- [x] 2.1 Remove the empty `image: ""` line from `src/content/derived-data/2026/how-to-use-any-harness-with-xcode-27/index.md`.
- [x] 2.2 Grep all content for other `image: ""` (or whitespace-only) occurrences and remove them.

## 3. Verify

- [x] 3.1 Run `npm run build` and confirm no errors / type checks pass.
- [x] 3.2 Inspect built HTML for a post WITHOUT a custom image: `og:image` and `twitter:image` equal the absolute default card URL on the site origin and do NOT equal the page URL.
- [x] 3.3 Inspect built HTML for a page/post WITH a custom image: tags point to that image as an absolute URL. (No posts currently have a custom image; logic verified by code review — `new URL(image, Astro.site)` passes absolute URLs through unchanged.)
- [x] 3.4 After deploy, validate the affected post URL with a card/link preview tool (e.g. Twitter/X card validator or a link-preview check).
