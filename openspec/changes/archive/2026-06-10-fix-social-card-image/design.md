## Context

`BaseLayout.astro` builds social metadata for every page. It accepts an optional `image` prop, defaulting via a destructuring default:

```ts
let { ..., image = "/social-cards/default.jpg" } = Astro.props;
```

and renders:

```ts
<meta property="og:image" content={new URL(image, Astro.url)} />
<meta property="twitter:image" content={new URL(image, Astro.url)} />
```

`image` flows from post frontmatter → `BlogPost.astro` → `NavigationLayout.astro` → `BaseLayout.astro`. Frontmatter `image` is optional (`z.string().optional()`), but the affected post sets `image: ""`.

Two defects combine:

1. A destructuring default only applies when the value is `undefined`. `image: ""` passes through as an empty string.
2. `new URL("", Astro.url)` returns `Astro.url` — the current page URL. So `og:image`/`twitter:image` point at the page itself, which is not an image. Facebook tolerates this (falls back to inline `<img>`); Twitter/X and most others do not.

## Goals / Non-Goals

**Goals:**

- Empty/whitespace `image` values fall back to the default social card.
- `og:image` / `twitter:image` always resolve to an absolute, image-pointing URL on the site origin.
- Fix is robust regardless of which posts forget to set or blank out `image`.

**Non-Goals:**

- Generating per-post social card images.
- Changing the content schema (`image` stays an optional string).
- Redesigning the default social card asset.

## Decisions

**Decision: Normalize `image` instead of relying on the destructuring default.**
Replace the destructuring default with an explicit normalization that treats `undefined`, `null`, empty, and whitespace-only as unset:

```ts
const rawImage = (Astro.props.image ?? "").trim();
const image = rawImage === "" ? "/social-cards/default.jpg" : rawImage;
```

Alternative considered: clean up only the offending frontmatter. Rejected as the sole fix — it leaves the latent bug for the next post that blanks `image`. We do both (code guard + frontmatter cleanup).

**Decision: Resolve image URLs against `Astro.site`, not `Astro.url`.**
Use `new URL(image, Astro.site)` so a root-relative path like `/social-cards/default.jpg` always resolves to the origin and can never collapse to the page URL. Astro's `site` is configured (used already for `canonicalURL`). Absolute image URLs in frontmatter still pass through unchanged because the second arg is ignored when the first is absolute.

Alternative considered: keep `Astro.url` and only guard the empty string. Rejected — origin-rooting is the more correct base for a site-wide asset and removes the page-URL-collapse failure mode entirely.

## Risks / Trade-offs

- [A post intentionally used a page-relative image path] → Audit shows posts use either no image or root-/origin-absolute paths; root-relative against `Astro.site` resolves correctly. Mitigation: verify built output for posts that set a custom `image`.
- [`Astro.site` unset in some build context] → It is configured in `astro.config.mjs` and already relied upon by `canonicalURL`; no new dependency.

## Migration Plan

1. Update `BaseLayout.astro` (normalization + `Astro.site` base).
2. Remove `image: ""` from affected frontmatter; grep for other `image: ""` occurrences.
3. Build and inspect generated `<meta og:image>` / `<meta twitter:image>` for a post with and without a custom image.
4. Validate with a card/link preview tool after deploy.

Rollback: revert the layout edit; behaviour returns to prior (broken) state with no data loss.

## Open Questions

- None blocking. Optional follow-up: add a build-time check or schema refinement that rejects empty-string `image` so the failure can't recur silently.
