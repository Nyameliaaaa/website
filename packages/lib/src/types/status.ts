import { statuses } from '@website/schema';
import { GETArray, SerializedDate } from './helpers';

export type StatusRow = typeof statuses.$inferSelect;
export type GETStatusLatest = SerializedDate<StatusRow>;
export type GETStatus = GETArray<GETStatusLatest>