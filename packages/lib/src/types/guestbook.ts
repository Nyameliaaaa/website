import { guestbookEntries } from '@website/schema';
import { SerializedDate } from './helpers';

export type GuestbookRow = typeof guestbookEntries.$inferSelect;
export type GETGuestbookID = Omit<SerializedDate<typeof guestbookEntries.$inferSelect>, 'email'>;
export interface GETGuestbook {
	data: GETGuestbookID[];
}
