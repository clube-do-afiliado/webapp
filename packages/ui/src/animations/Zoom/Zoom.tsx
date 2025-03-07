import React, { useEffect, useState } from 'react';

type Style = React.HTMLAttributes<HTMLDivElement>['style'];

const styledShow = (timeout: number): Style => ({
    transform: 'scale(1)',
    transition: `all ${timeout}s cubic-bezier(1, 0.01, 0, 0.99)`,
});

const styledHide = (timeout: number): Style => ({
    transform: 'scale(0)',
    transition: `all ${timeout}s cubic-bezier(1, 0.01, 0, 0.99)`,
});

interface ZoomProps { enter: boolean, delay?: number; timeout?: number; children: React.ReactNode; }
export default function Zoom({ children, enter, delay = 0, timeout = .2 }: Readonly<ZoomProps>) {
    const [style, setStyle] = useState<Style>(styledHide(timeout));

    useEffect(() => {
        setTimeout(() => {
            setStyle(enter ? styledShow(timeout) : styledHide(timeout));
        }, delay);
    }, [enter]);

    return (
        <div style={{ ...style }}>
            {children}
        </div>
    );
}