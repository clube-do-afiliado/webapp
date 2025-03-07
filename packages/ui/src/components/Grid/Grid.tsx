import { Children, cloneElement, ReactElement } from 'react';

import joinClass from '../../utils/joinClass';
import createComponent from '../../core/createComponent';

import type { GridBaseProps } from './interface';
import type { GridItemProps } from './GridItem';

import './Grid.scss';

interface GridProps extends GridBaseProps { children: React.ReactNode; gap?: number; }
function Grid({ children, sm, md, lg, gap = 15, ...props }: Readonly<GridProps>) {
    const arrayChildren = Children.toArray(children) as ReactElement<GridItemProps>[];

    const renderChildren = () => {
        return arrayChildren.map((child) => {
            const sizes = { sm, md, lg };

            return cloneElement(child, { ...sizes, ...child.props });
        });
    };

    return (
        <div
            {...props}
            className={joinClass(['grid', props.className])}
            style={{ gap }}
        >
            {renderChildren()}
        </div>
    );
}

export default createComponent(Grid);