import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { subDays } from '@cda/toolkit/date';

import EventsServices, { type EventData } from '@cda/services/events';

type Events = {
    impressions: EventData[];
    visualizations: EventData[];
}

export interface EventContextConfig {
    events: Events;

    getEvents: (storeId: string) => Promise<void>;
}

const EVENT_DEFAULT: Events = { impressions: [], visualizations: [] };

export const EventContext = createContext<EventContextConfig>({
    events: EVENT_DEFAULT,

    getEvents: () => Promise.resolve(),
});

type EventProviderProps = PropsWithChildren<{
    eventsServices: EventsServices,
}>

export default function EventProvider({ eventsServices, children }: EventProviderProps) {
    const [events, setEvents] = useState<Events>(EVENT_DEFAULT);

    const context = useMemo<EventContextConfig>(() => ({
        events,

        getEvents: (storeId) => getEvents(storeId),
    }), [events]);

    const getEvents = async (storeId: string) => {
        const [impressions, visualizations] = await Promise.all([
            getImpressions(storeId),
            getVisualizations(storeId),
        ]);

        setEvents({ impressions, visualizations });
    };

    const getImpressions = async (storeId: string) => {
        return eventsServices.getImpressions({
            storeId: storeId,
            startDate: subDays(new Date(), 10),
            endDate: new Date()
        });
    };

    const getVisualizations = async (storeId: string) => {
        return eventsServices.getVisualizations({
            storeId: storeId,
            startDate: subDays(new Date(), 10),
            endDate: new Date()
        });
    };

    return (
        <EventContext.Provider value={context}>
            {children}
        </EventContext.Provider>
    );
}