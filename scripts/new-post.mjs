#!/usr/bin/env node

import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function createBlogPost(title) {
  if (!title) {
    console.error("Please provide a title for the blog post");
    process.exit(1);
  }

  const date = new Date();
  const year = date.getFullYear();
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!slug) {
    console.error("Title must contain at least one ASCII letter or digit");
    process.exit(1);
  }

  const postDir = join(
    __dirname,
    "..",
    "src",
    "content",
    "blog",
    year.toString(),
    slug,
  );

  const frontmatter = `---
title: ${JSON.stringify(title)}
tags: []
pubDate: ${date.toISOString().split("T")[0]}
# Optional fields: description, audience, updatedDate, image, isArchived
---

`;

  try {
    await mkdir(postDir, { recursive: true });
    await writeFile(join(postDir, "index.md"), frontmatter, { flag: "wx" });
    console.log(`Created new blog post: ${postDir}/index.md`);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.error(
        `A blog post already exists at ${postDir}/index.md; refusing to overwrite`,
      );
      process.exit(1);
    }
    console.error("Error creating blog post:", error);
    process.exit(1);
  }
}

createBlogPost(process.argv[2]);
