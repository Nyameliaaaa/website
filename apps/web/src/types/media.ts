export interface MediaGridItem {
	name: string;
	imageSet: string[];
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
