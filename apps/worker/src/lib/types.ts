import { GuestbookRow, POSTGuestbookIDReport, POSTMessage } from '@website/lib';

export enum PacketType {
	Report,
	GuestbookEntry,
	Message,
}

export interface Packet {
	type: PacketType;
	workerUrl?: string;
}

export type GuestbookEntryPacket = Packet & GuestbookRow;
export type ReportPacket = Packet &
	POSTGuestbookIDReport & {
		offendingEntry: GuestbookRow;
	};

export type MessagePacket = Packet & POSTMessage;

export const isGuestbookEntry = (data: Packet): data is GuestbookEntryPacket => {
	return data.type === PacketType.GuestbookEntry;
};

export const isReport = (data: Packet): data is ReportPacket => {
	return data.type === PacketType.Report;
};

export const isMessage = (data: Packet): data is MessagePacket => {
	return data.type === PacketType.Message;
};
