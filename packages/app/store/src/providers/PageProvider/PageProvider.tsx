import type { PropsWithChildren } from 'react';

import type { Site } from '@cda/services/sites';

export default function PageProvider({ children }: PropsWithChildren<{ site: Site }>) {
    return (
        <div>
            {children}
        </div>
    );
}