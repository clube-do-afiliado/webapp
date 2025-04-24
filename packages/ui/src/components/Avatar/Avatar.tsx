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
    icon?: React.JSX.Element;
}
function Avatar({ src, alt, name, icon, ...props }: AvatarProps) {
    const className = joinClass([
        'ui-avatar',
        src && 'ui-avatar--image',
        name && 'ui-avatar--name',
        (!src && !name) || icon && 'ui-avatar--icon',
        props.onClick && 'ui-avatar--clickable',
        props.className
    ]);

    const content = () => {
        if (src) { return <img loading="lazy" style={{ width: '100%' }} src={src} alt={alt} />; }
        if (name) { return <span>{getInitials(name)}</span>; }
        if (icon) { return icon; }

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