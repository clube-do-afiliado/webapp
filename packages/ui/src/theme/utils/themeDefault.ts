import type { Theme } from '../Theme';

export const defaultSpacing: Theme['spacing'] = 8;
export const defaultShape: Theme['shape'] = { radius: 4 };

export const themeDefaultLight: Theme = {
    palette: {
        mode: 'light',
        info: '#6E5BAA',
        error: '#f83a54',
        warning: '#ff9800',
        success: '#2ECC71',
        primary: '#174F62',
        secondary: '#F87315',
        grey: '#F4F4F4',
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)'
        },
        background: {
            paper: '#f1f1f1',
            default: '#f9f9f9',
        },
        divider: 'rgba(0, 0, 0, 0.12)'
    },
    spacing: defaultSpacing,
    shape: defaultShape
};

export const themeDefaultDark: Theme = {
    palette: {
        mode: 'dark',
        info: '#8C7DD1',
        error: '#FF5C72',
        warning: '#FFA726',
        success: '#48C78E',
        primary: '#4962b5',
        secondary: '#FF857A',
        grey: '#2A2A2A',
        text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.6)',
            disabled: 'rgba(255, 255, 255, 0.38)'
        },
        background: {
            paper: '#242424',
            default: '#181818',
        },
        divider: 'rgba(255, 255, 255, 0.12)'
    },
    spacing: defaultSpacing,
    shape: defaultShape
};