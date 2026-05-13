import type { string } from 'astro:schema';

export interface PixelieEntry {
    img: string;
    url?: string;
    alt?: string;
    gif?: string;
}

export interface MusicGridItem {
    name: string;
    image: string;
    url: string;
    secondaryText: string;
    tertiaryText?: string;
    cardItem?: {
        alt?: string;
        aria?: string;
    };
}

export interface Recent {
    name: string;
    artist: string;
    album: string;
    image: string;
    url: string;
}

export interface Playlist {
    name: string;
    content: string;
    image: string;
    url: string;
}

export interface Artist {
    name: string;
    url: string;
    playcount: number;
}

export interface Album {
    name: string;
    image: string;
    url: string;
    artist: string;
    playcount: string;
}

export interface StatusItem {
    id?: number;
    text: string;
    createdAt: string;
}

export interface GuestbookItem {
    id?: number;
    name: string;
    message: string;
    createdAt: string;
    borderColor?: string;
    url?: string;
    ameliaReply?: string;
}

export interface GuestbookPayload extends Omit<GuestbookItem, 'createdAt' | 'id' | 'ameliaReply'> {
    email?: string;
}

export interface MessagePayload {
    message: string;
    name: string;
    email: string;
}

export interface Gallery {
    name: string;
    pixelies: PixelieEntry[];
}

export interface LinkEntry {
    label: string;
    handle: string;
    url?: string;
}

export interface LinkSection {
    name: string;
    links: LinkEntry[];
}
