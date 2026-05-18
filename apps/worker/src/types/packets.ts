import { GuestbookRow, POSTGuestbookIDReport, POSTMessage } from '@website/lib';

export enum PacketType {
	Report,
	GuestbookEntry,
	Message,
}

export interface PacketBase<T extends PacketType, D> {
	type: PacketType;
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

export const isGuestbookEntry = (data: Packet): data is GuestbookEntryPacket => {
	return data.type === PacketType.GuestbookEntry;
};

export const isReport = (data: Packet): data is ReportPacket => {
	return data.type === PacketType.Report;
};

export const isMessage = (data: Packet): data is MessagePacket => {
	return data.type === PacketType.Message;
};
