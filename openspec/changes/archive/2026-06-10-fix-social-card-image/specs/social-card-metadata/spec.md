## ADDED Requirements

### Requirement: Social image fallback for unset values

The site SHALL render `og:image` and `twitter:image` using the default social card whenever a page does not provide a usable custom image. An `image` value that is missing, `undefined`, an empty string, or whitespace-only MUST be treated as unset.

#### Scenario: Post without an image

- **WHEN** a post has no `image` frontmatter field
- **THEN** `og:image` and `twitter:image` point to the default social card image

#### Scenario: Post with an empty-string image

- **WHEN** a post sets `image: ""` (or a whitespace-only value)
- **THEN** the value is treated as unset
- **AND** `og:image` and `twitter:image` point to the default social card image

#### Scenario: Post with a custom image

- **WHEN** a post sets `image` to a non-empty path or URL
- **THEN** `og:image` and `twitter:image` point to that image

### Requirement: Social image URLs are absolute and origin-rooted

The site SHALL emit absolute `og:image` and `twitter:image` URLs that resolve against the site origin, never against the current page URL. A relative or root-relative image path MUST NOT resolve to the page's own URL.

#### Scenario: Default image on a deep post URL

- **WHEN** the default or a root-relative image is rendered on a deeply nested post URL (e.g. `/derived-data/2026/<slug>/`)
- **THEN** the resulting `og:image` / `twitter:image` is an absolute URL on the site origin that points to the image file
- **AND** it does NOT equal the page URL

#### Scenario: Valid large-image card for crawlers

- **WHEN** a platform requiring a valid `twitter:image` (e.g. Twitter/X `summary_large_image`) crawls a post
- **THEN** the `twitter:image` resolves to a real image and the preview renders
