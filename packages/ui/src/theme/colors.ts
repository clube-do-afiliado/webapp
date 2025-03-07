import type { Color, PaletteBuilded } from './Theme';

const getColorsVariations = (color: Color) => {
    const arr = ['main', 'dark', 'light'];

    return arr.map(i => color[i]);
};

export const COLORS = (palette: PaletteBuilded) => [
    ...getColorsVariations(palette.primary),
    ...getColorsVariations(palette.secondary),
    ...getColorsVariations(palette.info),
    ...getColorsVariations(palette.warning),
    ...getColorsVariations(palette.error),
    ...getColorsVariations(palette.success),
];