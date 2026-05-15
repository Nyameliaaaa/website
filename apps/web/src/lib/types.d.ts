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

export interface LinkEntry {
	label: string;
	handle: string;
	url?: string;
}

export interface LinkSection {
	name: string;
	links: LinkEntry[];
}
