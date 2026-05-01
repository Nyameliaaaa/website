import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const ramblings = defineCollection({
    loader: glob({ base: './src/content/ramblings', pattern: '**/*.{md,mdx}' }),
    schema: () =>
        z.object({
            title: z.string(),
            description: z.string(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            tags: z.array(z.string()).optional()
        })
});

export const collections = { ramblings };
