export interface PixelieEntry {
	img: string;
	url?: string;
	alt?: string;
	gif?: string;
}

export interface PixelieSection {
	name: string;
	pixelies: PixelieEntry[];
}
