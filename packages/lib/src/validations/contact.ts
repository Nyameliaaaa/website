import z from 'zod';

export const contactSchema = z.object({
	name: z.string().nonempty('a name is required'),
	email: z.email("that doesn't look like a valid email"),
	subject: z.string().nonempty('a subject is required'),
	message: z.string().nonempty('a message is required'),
});

export type POSTMessage = z.infer<typeof contactSchema>;
