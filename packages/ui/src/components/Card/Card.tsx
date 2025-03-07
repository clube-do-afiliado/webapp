import { HTMLAttributes, PropsWithChildren } from 'react';

import joinClass from '../../utils/joinClass';
import createComponent from '../../core/createComponent';

import './Card.scss';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
function Card({ children, ...props }: CardProps) {

    const cls = joinClass(['ui-card', props.className]);

    return (
        <div {...props} className={cls}>
            {children}
        </div>
    );
}

export default createComponent(Card);