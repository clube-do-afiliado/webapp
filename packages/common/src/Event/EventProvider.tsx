import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { groupBy } from '@cda/toolkit/array';

import EventsServices, { type EventFilter, EventData } from '@cda/services/events';

export type Events = {
    impressions: EventData[];
    visualizations: EventData[];
}

export interface EventContextConfig {
    events: Events;

    getEvents: (storeId: string, dates: EventFilter) => Promise<void>;
    getProductEvents: (storeId: string, productId: string, options: EventFilter) => Promise<void>;
}

const EVENT_DEFAULT: Events = { impressions: [], visualizations: [] };

export const EventContext = createContext<EventContextConfig>({
    events: EVENT_DEFAULT,

    getEvents: () => Promise.resolve(),
    getProductEvents: () => Promise.resolve(),
});

type EventProviderProps = PropsWithChildren<{
    eventsServices: EventsServices,
}>

export default function EventProvider({ eventsServices, children }: EventProviderProps) {
    const [events, setEvents] = useState<Events>(EVENT_DEFAULT);

    const context = useMemo<EventContextConfig>(() => ({
        events,

        getEvents: (storeId, dates) => getEvents(storeId, dates),

        getProductEvents: (storeId, productId, options) => getProductEvents(storeId, productId, options)
    }), [events]);

    const getEvents = async (storeId: string, options: EventFilter) => {
        console.log('getEvents', options);

        const [impressions, visualizations] = await Promise.all([
            getImpressions(storeId, options),
            getVisualizations(storeId, options),
        ]);

        if (options.unique) {
            setEvents({
                impressions: groupBy(impressions, ['anonymousId', 'utmSource', 'utmCampaign']),
                visualizations: groupBy(visualizations, ['anonymousId', 'utmSource', 'utmCampaign']),
            });
            return;
        }

        setEvents({ impressions, visualizations });
    };

    const getImpressions = async (storeId: string, dates: EventFilter) => {
        return eventsServices.getImpressions({ storeId, ...dates });
    };

    const getVisualizations = async (storeId: string, dates: EventFilter) => {
        return eventsServices.getVisualizations({ storeId, ...dates });
    };

    const getProductEvents = async (storeId: string, productId: string, options: EventFilter) => {
        const [impressions, visualizations] = await Promise.all([
            getProductImpressions(storeId, productId, options),
            getProductVisualizations(storeId, productId, options),
        ]);

        if (options.unique) {
            setEvents({
                impressions: groupBy(impressions, ['anonymousId', 'utmSource', 'utmCampaign']),
                visualizations: groupBy(visualizations, ['anonymousId', 'utmSource', 'utmCampaign']),
            });
            return;
        }

        setEvents({ impressions, visualizations });
    };

    const getProductImpressions = async (storeId: string, productId: string, dates: EventFilter) => {
        return eventsServices.getProductImpressions({ storeId, productId, ...dates });
    };

    const getProductVisualizations = async (storeId: string, productId: string, dates: EventFilter) => {
        return eventsServices.getProductVisualizations({ storeId, productId, ...dates });
    };

    return (
        <EventContext.Provider value={context}>
            {children}
        </EventContext.Provider>
    );
}