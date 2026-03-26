import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// ISO 时间格式，如 '2019-05-14T09:11:29.000000Z'
			time: z.string(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			heroImageAlt: z.string().optional(),
			// Tags are required, at least one tag must be provided
			tags: z.array(z.string()).min(1, "At least one tag is required"),
			// AI创作标识等级 (0-4)，对应 HAND, VOICE, POLISH, DUET, AUTO
			ai_label: z.number().min(0).max(4).optional().default(0),
		}),
});

export const collections = { blog };
