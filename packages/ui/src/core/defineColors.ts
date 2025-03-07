import type { CSSProperties } from 'react';

import { useTheme, type PaletteBuilded } from '../theme';

import { Plugin } from './plugin';
import type { CustomOptions } from './customOptions';

export type Color = {
    color: (palette: PaletteBuilded) => string;
    backgroundColor: (palette: PaletteBuilded) => string;
};

function defineBackgroundColor(options: CustomOptions): CSSProperties {
    const { theme: { palette } } = useTheme();

    if (!options.backgroundColor) { return {}; }

    return {
        backgroundColor: options.backgroundColor(palette)
    };
};

function defineColor(options: CustomOptions): CSSProperties {
    const { theme: { palette } } = useTheme();

    if (!options.color) { return {}; }

    return {
        color: options.color(palette)
    };
};

export default function defineColors(): Plugin[] {
    return [
        defineColor,
        defineBackgroundColor
    ];
}