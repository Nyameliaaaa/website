export interface LinkEntry {
	label: string;
	handle: string;
	url?: string;
}

export interface LinkWithComment {
	label: string;
	handle?: string;
	url: string;
	comment?: string;
	linksTo?: {
		proceeding?: string;
		url: string;
		label: string;
	};
}
