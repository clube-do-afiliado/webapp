import { HtmlHTMLAttributes } from 'react';

import createComponent from '../../core/createComponent';

import './Drawer.scss';

interface DrawerContentProps extends HtmlHTMLAttributes<HTMLDivElement> { children: React.ReactNode; }
function DrawerContent({ children, ...props }: DrawerContentProps) {
    return (
        <div className="box" {...props}>
            {children}
        </div>
    );
}

export default createComponent(DrawerContent);