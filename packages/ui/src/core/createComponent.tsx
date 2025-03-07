import React, { ComponentType } from 'react';

import type { Sx } from './customOptions';
import defineColors from './defineColors';
import defineOptions from './defineOptions';
import defineSpacing from './defineSpacing';

export default function createComponent<P>(WrappedComponent: ComponentType<P>) {
    const EnhancedComponent: React.FC<Sx<P>> = ({
        sx,
        display,
        textAlign,
        alignItems,
        justifyContent,
        ...props
    }) => {
        const options = sx && defineOptions(sx,
            ...defineSpacing(),
            ...defineColors()
        );

        return (
            <WrappedComponent
                {...(props as P)}
                style={{
                    display,
                    textAlign,
                    alignItems,
                    justifyContent,
                    ...options,
                    ...props['style'],
                }}
            />
        );
    };

    return EnhancedComponent;
}