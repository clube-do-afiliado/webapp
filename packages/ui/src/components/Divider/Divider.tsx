import { HTMLAttributes } from 'react';

import joinClass from '../../utils/joinClass';
import createComponent from '../../core/createComponent';

import './Divider.scss';

export type DividerProps = HTMLAttributes<HTMLElement>;
function Divider({ ...props }: DividerProps) {

    const clss = joinClass(['ui-divider', props.className]);

    return (
        <div {...props} className={clss} style={{ ...props.style }}></div>
    );
}

export default createComponent(Divider);