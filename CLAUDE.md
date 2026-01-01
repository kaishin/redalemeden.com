# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a personal website built with Astro 5, using TypeScript, Tailwind CSS 4,
and MDX for content. The site includes a blog with content collections and is
statically generated.

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

- Blog posts are managed through Astro Content Collections in
  [src/content/blog/](src/content/blog/)
- Content schema is defined in [src/content/config.ts](src/content/config.ts)
  with Zod validation
- Required frontmatter fields: `title`, `pubDate`
- Optional frontmatter fields: `description`, `audience`, `tags`, `updatedDate`,
  `image`
- Blog posts use the `[...slug].astro` dynamic route pattern for rendering

### Routing & Layouts

- File-based routing in [src/pages/](src/pages/)
- Layout hierarchy: `BaseLayout` → `NavigationLayout` → page-specific layouts
  (e.g., `BlogPost`)
- Redirects are configured in [astro.config.mjs](astro.config.mjs) for legacy
  URLs

### Global Configuration

- Site metadata constants in [src/consts.ts](src/consts.ts) (site title,
  description, author info)
- Astro config in [astro.config.mjs](astro.config.mjs):
  - Markdown syntax highlighting uses Dracula theme with Shiki
  - MDX and Sitemap integrations enabled
  - Tailwind CSS integrated via Vite plugin

### Styling

- Tailwind CSS 4 with typography plugin
- Prettier configured with Astro and Tailwind plugins
- Code formatting:
  - 2 spaces for indentation
  - Semicolons are required
  - Single quotes for strings
  - Trailing commas in multi-line structures

## Project Structure

### Key Directories

- `src/pages/`: Contains all route pages and blog posts
- `src/components/`: Reusable UI components
- `src/layouts/`: Page layouts and templates
- `src/styles/`: Global styles and CSS modules
- `src/content/`: Content collections and data
- `src/assets/`: Static assets like images
- `public/`: Files served directly at root

## Content Guidelines

### Content Collections

- Content is managed through Astro's content collections in `src/content/`
- Each collection should have a proper schema defined
- Include all required metadata
- Use consistent frontmatter structure

### Blog Post Tags

Available tags for blog posts (choose the most appropriate):

- **AI** - Artificial intelligence, machine learning, LLMs
- **Programming** - Technical posts about coding, languages, frameworks
- **Design** - UI/UX, visual design, interface topics
- **Opinion** - Editorial pieces, commentary, personal perspectives
- **Journal** - Personal reflections, life updates, year-in-review posts
- **Guide** - How-to articles, tutorials, walkthroughs
- **Announcement** - Product launches, project releases
- **Productivity** - Workflow tips, tools, efficiency
- **Web** - Web standards, browsers, web development
- **HCI** - Human-computer interaction topics
- **Apple** - Apple platforms, technologies, ecosystem
- **Linklog** - Link posts with commentary
- **Privacy** - Privacy-related topics
- **Learning** - Educational content, learning experiences
- **Tips** - Quick tips and tricks
- **Swift** - Swift programming language
- **macOS** - macOS-specific content
- **Language** - Linguistics, translation, language evolution

### Markdown Best Practices

- Always leave an empty line below headings
- Use proper heading hierarchy
- Include alt text for all images
- Follow [.markdownlint.json](.markdownlint.json) rules if present
- Keep line length reasonable

### Asset Management

- Place optimized images in `src/assets/` for Astro's image optimization
- Use `public/` only for files needing direct URL access (favicons, robots.txt,
  etc.)
- Optimize images before adding to project

## TypeScript & Components

- Strict mode enabled in [tsconfig.json](tsconfig.json)
- All new code should be TypeScript
- Component props must be explicitly typed
- Follow existing type patterns in the codebase
- Use `.astro` for Astro components
- Use `.tsx` for React components
- Keep components focused and single-purpose

## Development

- Always update TODO.md before and after working on any given task that isn't a
  small typo or quick fix.
