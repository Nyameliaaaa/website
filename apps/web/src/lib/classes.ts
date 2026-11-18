import { cva } from 'cva';

export const outlineLg = `rounded-lg baseAccentOutline`;
export const outlineMd = `rounded-md baseAccentOutline`;

export const text = cva('', {
	variants: {
		color: {
			accent: 'text-ctp-pink',
			primary: 'text-ctp-text',
			secondary: 'text-ctp-subtext1',
			tertiary: 'text-ctp-subtext0',
			error: 'text-ctp-red',
			success: 'text-ctp-green',
			link: 'text-ctp-blue',
		},
		size: {
			sm: 'text-sm',
			base: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl',
			['2xl']: 'text-2xl',
			['4xl']: 'text-4xl',
		},
		font: {
			display: 'font-display',
			sans: 'font-sans',
			mono: 'font-mono',
		},
		weight: {
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
		},
		hover: {
			accent: 'hover:text-ctp-pink',
			groupAccent: 'group-hover:text-ctp-pink',
			underline: 'hover:underline hover:underline-offset-2',
			dim: 'hover:text-ctp-subtext1',
		},
		transition: {
			true: 'transition-all duration-300',
		},
		tracking: {
			tightest: 'tracking-tighter',
			tight: 'tracking-tight',
			normal: 'tracking-normal',
			wide: 'tracking-wide',
		},
		leading: {
			tight: 'leading-tight',
			snug: 'leading-snug',
			normal: 'leading-normal',
			relaxed: 'leading-relaxed',
		},
		accentOutline: {
			true: outlineLg,
			md: outlineMd,
		},
	},
});

export const websiteTitle = text({
	font: 'display',
	weight: 'semibold',
	color: 'accent',
	size: '2xl',
	hover: 'underline',
	accentOutline: true,
});

export const pageTitle = text({
	font: 'display',
	weight: 'bold',
	size: '4xl',
	color: 'accent',
	tracking: 'tightest',
	leading: 'tight',
});

export const pageSubtitle = text({
	font: 'sans',
	weight: 'normal',
	size: '2xl',
	color: 'primary',
	tracking: 'tight',
	leading: 'relaxed',
});

export const heading = text({ font: 'display', weight: 'semibold', size: '2xl', color: 'accent' });
export const subHeading = text({
	font: 'display',
	weight: 'medium',
	size: 'lg',
	leading: 'snug',
	tracking: 'tight',
	color: 'secondary',
});

export const leadText = text({
	font: 'sans',
	weight: 'medium',
	size: 'lg',
	leading: 'relaxed',
	color: 'secondary',
});

export const body = text({ font: 'sans', weight: 'normal', size: 'base', leading: 'relaxed', color: 'primary' });
export const link = text({ color: 'link', hover: 'underline', accentOutline: 'md' });
export const caption = text({ size: 'sm', color: 'tertiary', weight: 'normal' });

export const formFieldLabel = text({ color: 'secondary', weight: 'medium' });
export const formFieldDesc = text({ size: 'sm', color: 'tertiary' });
export const formFieldRequired = text({ color: 'accent', weight: 'medium' });
export const formFieldOptional = text({ color: 'tertiary', weight: 'medium' });

export const iconButton = text({
	color: 'tertiary',
	weight: 'normal',
	transition: true,
	hover: 'groupAccent',
});
