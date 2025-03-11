import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

import createComponent from '../../core/createComponent';

import './Drawer.scss';

type DrawerContentProps = PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>
function DrawerContent({ children, ...props }: DrawerContentProps) {
    return (
        <div className="box" {...props}>
            {children}
        </div>
    );
}

export default createComponent(DrawerContent);