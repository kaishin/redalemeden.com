# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Astro 5, using TypeScript, Tailwind CSS 4, and MDX for content. The site includes a blog with content collections and is statically generated.

## Development Commands

```bash
# Development server (runs on localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run astro check

# Create new blog post
./scripts/new-post.mjs "Post Title"
```

## Architecture

### Content Management

- Blog posts are managed through Astro Content Collections in [src/content/blog/](src/content/blog/)
- Content schema is defined in [src/content/config.ts](src/content/config.ts) with Zod validation
- Required frontmatter fields: `title`, `pubDate`
- Optional frontmatter fields: `description`, `audience`, `tags`, `updatedDate`, `image`
- Blog posts use the `[...slug].astro` dynamic route pattern for rendering

### Routing & Layouts

- File-based routing in [src/pages/](src/pages/)
- Layout hierarchy: `BaseLayout` → `NavigationLayout` → page-specific layouts (e.g., `BlogPost`)
- Redirects are configured in [astro.config.mjs](astro.config.mjs) for legacy URLs

### Global Configuration

- Site metadata constants in [src/consts.ts](src/consts.ts) (site title, description, author info)
- Astro config in [astro.config.mjs](astro.config.mjs):
  - Markdown syntax highlighting uses Dracula theme with Shiki
  - MDX and Sitemap integrations enabled
  - Tailwind CSS integrated via Vite plugin

### Styling

- Tailwind CSS 4 with typography plugin
- Prettier configured with Astro and Tailwind plugins
- Code formatting: 2 spaces, no semicolons (handled by Prettier defaults)

## Content Guidelines

### Markdown Best Practices

- Always leave an empty line below headings
- Use proper heading hierarchy
- Include alt text for all images
- Follow [.markdownlint.json](.markdownlint.json) rules if present

### Asset Management

- Place optimized images in `src/assets/` for Astro's image optimization
- Use `public/` only for files needing direct URL access (favicons, robots.txt, etc.)
- Optimize images before adding to project

## TypeScript

- Strict mode enabled in [tsconfig.json](tsconfig.json)
- All new code should be TypeScript
- Component props must be explicitly typed
- Follow existing type patterns in the codebase

## Development

- Always update TODO.md before and after working on any given task that isn't a small typo or quick fix.
