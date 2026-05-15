export interface GETLastFMRecent {
	name: string;
	artist: string;
	album: string;
	image: string;
	url: string;
}

export interface GETLastFMArtist {
	name: string;
	url: string;
	playcount: number;
}

export interface GETLastFMAlbum {
	name: string;
	image: string;
	url: string;
	artist: string;
	playcount: string;
}
