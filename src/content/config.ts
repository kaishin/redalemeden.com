import { defineCollection, z } from "astro:content";

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

const blog = defineCollection({ schema: postSchema });
const derivedData = defineCollection({ schema: postSchema });

export const collections = { blog, "derived-data": derivedData };
