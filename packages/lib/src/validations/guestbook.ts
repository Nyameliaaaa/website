import { createInsertSchema } from 'drizzle-zod';
import { guestbookEntries } from '@website/schema';
import z from 'zod';
import { CATPPUCCIN_MACCHIATO_COLORS } from '../consts';

export const postGuestbookSchema = createInsertSchema(guestbookEntries, {
	name: z.string().nonempty("sure but what's ur name buddy pal?"),
	email: z.email("doesn't look like an email to me :p").or(z.literal('')),
	message: z
		.string()
		.min(1, 'say something :p')
		.max(500, 'woah! thats way too long. sorry but there can only be one charmony dove'),
	url: z.url('are you sure thats a website?').or(z.literal('')),
	borderColor: z.enum(CATPPUCCIN_MACCHIATO_COLORS, 'not a valid border color name!'),
}).omit({
	ameliaReply: true,
	id: true,
	createdAt: true,
});

export const postGuestbookReportSchema = z.object({
	message: z.string().nonempty('a message is required!'),
});

export type POSTGuestbook = z.infer<typeof postGuestbookSchema>;
export type POSTGuestbookIDReport = z.infer<typeof postGuestbookReportSchema>;
