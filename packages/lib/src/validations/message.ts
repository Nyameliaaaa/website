import z from 'zod';

export const messageSchema = z.object({
	name: z.string().nonempty('a name is required'),
	email: z.email("that doesn't look like a valid email"),
	subject: z.string().nonempty('a subject is required'),
	message: z.string().nonempty('a message is required'),
});

export const mailToSchema = z.object({
	to: z.email("that doesn't look like a valid email"),
	subject: z.string().optional(),
});

export type POSTMessage = z.infer<typeof messageSchema>;
