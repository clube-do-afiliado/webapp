import { HTMLAttributes } from 'react';

import joinClass from '../../utils/joinClass';
import createComponent from '../../core/createComponent';

interface BoxProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    tag?: React.ElementType;
}
function Box({ children, tag = 'div', ...props }: BoxProps) {
    const CustomTag = tag;

    const className = joinClass(['ui-box', props.className]);

    return (
        <CustomTag {...props} className={className}>
            {children}
        </CustomTag>
    );
}

export default createComponent(Box);