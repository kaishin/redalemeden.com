---
name: new-post
description: Create a new blog post from a headline by running the repository's post generator script and reporting the created file path. Use when the user asks to create a new blog post or draft.
version: 1.0.0
user-invocable: true
argument-hint: "[headline]"
---

Create a new blog post draft using the provided headline.

## Workflow

1. Use the user's headline as the title.
2. Run `./scripts/new-post.mjs "{headline}"`.
3. Report the created file path.

## Resulting Post Shape

The script creates `src/content/blog/{year}/{slug}/index.md` with:

- the headline as `title`
- today's date as `pubDate`
- an empty `tags` list
- a YAML comment listing the optional fields (`description`, `audience`, `updatedDate`, `image`, `isArchived`)

The schema has no `draft` field, so the post is publishable as-is; there is no draft support.

## Guardrails

- If the user did not provide a headline, ask for one.
- Do not hand-write the file unless the script is missing or broken.
