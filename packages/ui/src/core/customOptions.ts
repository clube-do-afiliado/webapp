import { CSSProperties } from 'react';

import type { Color } from './defineColors';
import type { SpacingOptions } from './defineSpacing';

export type CustomOptions = Partial<
    & SpacingOptions
    & Color
>

export type Sx<T> = T & {
    sx?: CustomOptions;
    display?: CSSProperties['display'];
    alignItems?: CSSProperties['alignItems'];
    justifyContent?: CSSProperties['justifyContent'];
    textAlign?: CSSProperties['textAlign'];
};