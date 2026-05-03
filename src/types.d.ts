export interface PixelieEntry {
    img: string;
    url?: string;
    alt?: string;
}

export interface Recent {
    name: string;
    artist: string;
    album: string;
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

