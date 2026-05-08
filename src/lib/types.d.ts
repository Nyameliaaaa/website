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

export interface GuestbookItem {
    name: string;
    message: string;
    createdAt: string;
    borderColor?: string;
    url?: string;
}

export interface GuestbookPayload extends Omit<GuestbookItem, 'createdAt'> {
    email?: string;
}
