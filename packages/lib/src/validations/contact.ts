import z from 'zod';

export const contactSchema = z.object({
	name: z.string().min(1, 'a name is required'),
	email: z.email("that doesn't look like a valid email"),
	message: z.string().min(1, 'a message is required'),
});

export type POSTMessage = z.infer<typeof contactSchema>;
