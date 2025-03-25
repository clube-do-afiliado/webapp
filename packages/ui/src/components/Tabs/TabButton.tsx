import { cloneElement, HTMLAttributes } from 'react';

import { joinClass } from '../../utils';
import type { IconProps } from '../Icon';
import type { Colors } from '../../theme';
import type { Variant } from './interface';

import './Tabs.scss';

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
    label: string;
    color?: Colors;
    variant?: Variant;
    icon?: React.JSX.Element;
}
export default function Tab({ icon, label, variant = 'line', color = 'primary', ...props }: TabProps) {
    const { 'aria-checked': checked } = props;

    const className = joinClass([
        'ui-tabs__button',
        `ui-tabs__button--${variant}`,
        checked && `ui-tabs__button--active-${color}`,
        props.className
    ]);

    const renderIcon = () => {
        const shouldOmitIcon = variant === 'rounded' && checked;

        return icon && cloneElement<IconProps>(icon, {
            className: joinClass([
                'ui-tabs__button__icon',
                shouldOmitIcon && 'ui-tabs__button__icon--omit'
            ]),
            color: checked ? 'primary.main' : 'text.secondary'
        });
    };

    return (
        <button
            type="button"
            {...props}
            className={className}
        >
            {renderIcon()}
            {label}
        </button>
    );
}