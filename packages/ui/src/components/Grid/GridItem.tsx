import { useState } from 'react';

import joinClass from '../../utils/joinClass/joinClass';
import useResize from '../../hooks/useResize';
import type { GridBaseProps, Size } from './interface';
import createComponent from '../../core/createComponent';

import './Grid.scss';

export interface GridItemProps extends GridBaseProps { children: React.ReactNode; }
function GridItem({ children, xl = 1, lg, md, sm, ...props }: Readonly<GridItemProps>) {
    const [size, setSize] = useState<keyof Size>('md');

    const MAP = {
        xl,
        lg: lg || xl,
        md: md || lg || xl,
        sm: sm || md || lg || xl,
    };

    useResize({
        onXs: () => setSize('sm'),
        onSm: () => setSize('md'),
        onMd: () => setSize('lg'),
        onLg: () => setSize('lg'),
        onXl: () => setSize('xl'),
    });

    return (
        <div
            {...props}
            className={joinClass([
                'grid__item',
                `grid__item-${MAP[size]}`,
                props.className,
            ])}
        >
            {children}
        </div>
    );
}

export default createComponent(GridItem);