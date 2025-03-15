import { forwardRef, type HTMLAttributes } from 'react';

import Ripple from '../Ripple';
import joinClass from '../../utils/joinClass';
import createComponent from '../../core/createComponent';

import './Card.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> { onClick?: (e?: any) => void; }

const Card = forwardRef<HTMLDivElement, CardProps>(({
    onClick,
    children,
    ...props
}, ref) => {
    const cls = joinClass(['ui-card', onClick && 'ui-card--clickable', props.className]);

    return (
        <div {...props} className={cls} onMouseDown={onClick} ref={ref}>
            {children}
            {onClick && <Ripple />}
        </div>
    );
});

export default createComponent(Card);