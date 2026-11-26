import { socialLinks } from '@/data/links/about';
import { gitForgeLinks, reachMeLinks } from '@/data/links/contact';

export const getProfile = (profileName: string, searchBy: 'url' | 'label' = 'label') => {
	const allProfiles = [...reachMeLinks, ...gitForgeLinks, ...socialLinks];
	let profile;

	if (searchBy === 'url') {
		profile = allProfiles.filter(profile => profile.url?.includes(profileName))[0];
	} else {
		profile = allProfiles.filter(profile => profile.label?.includes(profileName))[0];
	}

	return {
		url: profile.url,
		name: profile.label,
		handle: profile.handle,
	};
};
