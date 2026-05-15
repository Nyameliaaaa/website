import { statuses } from '@website/schema';
import { SerializedDate } from './helpers';

export type StatusRow = typeof statuses.$inferSelect;
export type GETStatus = SerializedDate<StatusRow>;
