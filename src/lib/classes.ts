import { cva } from 'cva';

export const outline =
    'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-pink focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base';

export const text = cva('', {
    variants: {
        color: {
            accent: 'text-ctp-pink',
            primary: 'text-ctp-text',
            secondary: 'text-ctp-subtext1',
            tertiary: 'text-ctp-subtext0',
            error: 'text-ctp-red',
            success: 'text-ctp-green'
        },
        size: {
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            ['2xl']: 'text-2xl',
            ['4xl']: 'text-4xl'
        },
        font: {
            display: 'font-display',
            sans: 'font-sans',
            mono: 'font-mono'
        },
        weight: {
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold'
        },
        hover: {
            accent: 'hover:text-ctp-pink',
            groupAccent: 'group-hover:text-ctp-pink',
            underline: 'hover:underline hover:underline-offset-2',
            dim: 'hover:text-ctp-subtext1'
        },
        transition: {
            true: 'transition-all duration-300'
        },
        tracking: {
            tighest: 'tracking-tighter',
            tight: 'tracking-tight',
            normal: 'tracking-normal',
            wide: 'tracking-wide'
        },
        leading: {
            tight: 'leading-tight',
            snug: 'leading-snug',
            normal: 'leading-normal',
            relaxed: 'leading-relaxed'
        },
        customOutline: {
            true: outline
        }
    }
});

export const container = 'mx-auto md:max-w-6xl px-2 md:px-0';

export const headerName = text({
    font: 'display',
    weight: 'semibold',
    color: 'accent',
    size: '2xl',
    hover: 'underline',
    customOutline: true
});

export const pageTitle = text({
    font: 'display',
    weight: 'bold',
    size: '4xl',
    color: 'accent',
    tracking: 'tighest',
    leading: 'tight'
});

export const pageSubtitle = text({
    font: 'sans',
    weight: 'normal',
    size: '2xl',
    color: 'primary',
    tracking: 'tight',
    leading: 'relaxed'
});

export const heading = text({ font: 'display', weight: 'semibold', size: '2xl', color: 'accent' });
export const subHeading = text({
    font: 'display',
    weight: 'medium',
    size: 'lg',
    leading: 'snug',
    tracking: 'tight',
    color: 'secondary'
});

export const leadText = text({
    font: 'sans',
    weight: 'medium',
    size: 'lg',
    leading: 'relaxed',
    color: 'secondary'
});

export const body = text({ font: 'sans', weight: 'normal', size: 'base', leading: 'relaxed', color: 'primary' });
export const link = text({ hover: 'underline', customOutline: true });
export const caption = text({ size: 'sm', color: 'tertiary', weight: 'normal' });

export const formFieldLabel = text({ color: 'secondary', weight: 'medium' });
export const formFieldDesc = text({ size: 'sm', color: 'tertiary' });
export const formFieldRequired = text({ color: 'accent', weight: 'medium' });
export const formFieldOptional = text({ color: 'tertiary', weight: 'medium' });

export const iconButton = text({
    color: 'tertiary',
    weight: 'normal',
    transition: true,
    hover: 'groupAccent'
});
