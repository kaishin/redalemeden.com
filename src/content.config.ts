import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  audience: z.string().optional(),
  tags: z.array(z.string()).optional(),
  // Transform string to Date object
  pubDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  updatedDate: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined)),
  image: z.string().optional(),
  isArchived: z.boolean().optional().default(false),
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: postSchema,
});

const derivedData = defineCollection({
  loader: glob({
    base: "./src/content/derived-data",
    pattern: "**/*.{md,mdx}",
  }),
  schema: postSchema,
});

export const collections = { blog, "derived-data": derivedData };
