---
description: Create a new blog post with today's date
allowed-tools: Bash
---

# Create New Blog Post

Create a new blog post using the provided headline as the title.

The post will be created in `src/content/blog/{year}/{slug}/index.md` with:

- Today's date as the `pubDate`
- A slug generated from the title
- Draft mode enabled by default
- Empty fields for description, audience, tags, and image

## Instructions

1. Take the headline argument provided by the user
2. Run the new post script: `./scripts/new-post.mjs "{headline}"`
3. Report the location of the created file to the user
