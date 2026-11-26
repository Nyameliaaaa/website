import type { string } from 'astro:schema';

export interface PixelieEntry {
	img: string;
	url?: string;
	alt?: string;
	gif?: string;
}

export interface MediaGridItem {
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

export interface Playlist {
	name: string;
	content: string;
	image: string;
	url: string;
}

export interface PixelieSection {
	name: string;
	pixelies: PixelieEntry[];
}