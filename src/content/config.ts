import { defineCollection, z } from 'astro:content';

const chaptersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    chapter: z.number(),
    title: z.string(),
    accent: z.enum(['sky', 'blush', 'butter', 'leaf']),
    icon: z.string().optional(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  chapters: chaptersCollection,
};
