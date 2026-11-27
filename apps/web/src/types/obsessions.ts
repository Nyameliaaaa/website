export interface Obsession {
	name: string;
	url?: string;
	image?: string;
}

export interface ObsessionSection {
	label: string;
	obsessions: Obsession[];
}
