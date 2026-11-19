import { guestbookEntries } from '@website/schema';
import { GETArray, SerializedDate } from './helpers';

export type GuestbookRow = typeof guestbookEntries.$inferSelect;
export type GETGuestbookID = Omit<SerializedDate<GuestbookRow>, 'email'>;
export type GETGuestbook = GETArray<GETGuestbookID>;
