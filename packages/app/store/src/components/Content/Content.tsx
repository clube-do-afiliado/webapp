import type { PropsWithChildren } from 'react';

import './Content.scss';

export default function Content({ children, title }: PropsWithChildren<{ title?: string; }>) {
    return (
        <main className="main">
            <div className="container">
                {title && <h1>{title}</h1>}
                {children}
            </div>
        </main>
    );
}