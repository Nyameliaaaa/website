import { GuestbookRow, POSTGuestbookIDReport, POSTMessage } from '@website/lib';

export enum PacketType {
	Report,
	GuestbookEntry,
	Message,
}

export interface PacketBase<T extends PacketType, D> {
	type: T;
	workerUrl?: string;
	data: D;
}

export type GuestbookEntryPacket = PacketBase<PacketType.GuestbookEntry, GuestbookRow>;
export type ReportPacket = PacketBase<
	PacketType.Report,
	{
		report: POSTGuestbookIDReport;
		offendingEntry: GuestbookRow;
	}
>;

export type MessagePacket = PacketBase<PacketType.Message, POSTMessage>;

export type Packet = GuestbookEntryPacket | ReportPacket | MessagePacket;
