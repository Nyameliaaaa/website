import { statuses } from '@website/schema';
import { SerializedDate } from './helpers';

export type StatusRow = typeof statuses.$inferSelect;
export type GETStatusLatest = SerializedDate<StatusRow>;
export interface GETStatus {
	data: GETStatusLatest[];
}
