import { HTMLAttributes } from 'react';

import { getInitials } from '@cda/toolkit/string';

import Icon from '../../components/Icon';
import Ripple from '../../components/Ripple';
import joinClass from '../../utils/joinClass';
import createComponent from '../../core/createComponent';

import './Avatar.scss';

interface AvatarProps extends HTMLAttributes<HTMLElement> {
    alt?: string;
    src?: string;
    name?: string;
}
function Avatar({ src, alt, name, ...props }: AvatarProps) {
    const className = joinClass([
        'ui-avatar',
        src && 'ui-avatar--image',
        name && 'ui-avatar--name',
        !src && !name && 'ui-avatar--icon',
        props.onClick && 'ui-avatar--clickable',
        props.className
    ]);

    const content = () => {
        if (src) { return <img style={{ width: '100%' }} src={src} alt={alt} />; }
        if (name) { return <span>{getInitials(name)}</span>; }

        return (
            <Icon name="user" className="ui-avatar__icon" />
        );
    };

    return (
        <div {...props} className={className} style={{ ...props.style }}>
            {content()}
            {props.onClick && <Ripple />}
        </div>
    );
}

export default createComponent(Avatar);