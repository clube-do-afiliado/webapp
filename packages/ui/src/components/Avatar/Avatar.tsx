import { HTMLAttributes } from 'react';

import { getInitials } from '@cda/toolkit/string';

import Icon from '../../components/Icon';
import Ripple from '../../components/Ripple';
import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';

import './Avatar.scss';

interface AvatarProps extends HTMLAttributes<HTMLElement> {
    alt?: string;
    src?: string;
    name?: string;
    variant?: 'rounded' | 'circular'
    icon?: React.JSX.Element;
}
function Avatar({ src, alt, name, variant = 'circular', icon, ...props }: AvatarProps) {
    const className = joinClass([
        'ui-avatar',
        `ui-avatar--${variant}`,
        src && 'ui-avatar--image',
        name && 'ui-avatar--name',
        (!src && !name) || icon && 'ui-avatar--icon',
        props.onClick && 'ui-avatar--clickable',
        props.className
    ]);

    const content = () => {
        if (src) {
            return (
                <img
                    src={src}
                    alt={alt}
                    width={40}
                    height={40}
                    sizes="100vw"
                    loading="lazy"
                    style={{ width: '100%', height: 'auto' }}
                />
            );
        }
        if (name) { return <span>{getInitials(name)}</span>; }
        if (icon) { return icon; }

        return (
            <Icon name="user" className="ui-avatar__icon" />
        );
    };

    return (
        <div {...props} className={className}>
            {content()}
            {props.onClick && <Ripple />}
        </div>
    );
}

export default createComponent(Avatar);