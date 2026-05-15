import { guestbookEntries } from '@website/schema';
import { SerializedDate } from './helpers';

export type GuestbookRow = typeof guestbookEntries.$inferSelect;
export type POSTGuestbook = Omit<typeof guestbookEntries.$inferInsert, 'ameliaReply' | 'id' | 'createdAt'>;
export type GETGuestbook = Omit<SerializedDate<typeof guestbookEntries.$inferSelect>, 'email'>;
export interface POSTGuestbookIDReport {
	message: string;
}
