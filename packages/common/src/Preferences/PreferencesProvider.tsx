import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { local } from '@cda/toolkit/dom';

type Tour = {
    home: boolean;
}

export interface PreferenceContextConfig {
    tour: Tour;

    updateTour: (data: Partial<Tour>) => void;
}

const TOUR_DEFAULT: Tour = { home: false };

export const PreferenceContext = createContext<PreferenceContextConfig>({
    tour: TOUR_DEFAULT,

    updateTour: () => undefined,
});

export default function Preferences({ children }: PropsWithChildren) {
    const [tour, setTour] = useState<Tour>(
        local.get<Tour>('tour', {
            parse: true
        }) || TOUR_DEFAULT
    );

    const context = useMemo<PreferenceContextConfig>(() => ({
        tour,

        updateTour: (data) => updateTour(data),
    }), [tour]);

    useEffect(() => { local.set('tour', tour); }, [tour]);

    const updateTour = (tour: Partial<Tour>) => {
        setTour(prev => ({ ...prev, ...tour }));
    };

    return (
        <PreferenceContext value={context}>
            {children}
        </PreferenceContext>
    );
}