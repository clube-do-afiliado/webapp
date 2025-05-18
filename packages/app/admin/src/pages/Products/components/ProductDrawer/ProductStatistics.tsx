import { useEffect, useState } from 'react';

import { Grid, GridItem } from '@cda/ui/components/Grid';

import { subMonths } from '@cda/toolkit/date';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { EventFilter } from '@cda/services/events';

import { useEvent } from '@cda/common/Event';

import ResourceChart from '@/components/ResourceChart';
import { Filter, useEventsFilter } from '@/components/Filter';
import TotalSourcesChart from '@/components/TotalSourcesChart';

interface ProductStatisticsProps { product: Product; site: Site; }
export default function ProductStatistics({ product, site }: ProductStatisticsProps) {
    const { events, getProductEvents } = useEvent();

    const formGroup = useEventsFilter((options) => {
        fetchEvents(options);
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents({
            startDate: subMonths(new Date(), 2),
            endDate: new Date(),
            unique: false
        });
    }, []);

    const fetchEvents = async (options: EventFilter) => {
        setLoading(true);

        const result = await getProductEvents(site.id, product.id, options);

        setTimeout(() => { setLoading(false); }, 1000);

        return result;
    };

    return (
        <Grid>
            <GridItem xl={12} lg={12} md={12} sm={12}>
                <Filter formGroup={formGroup} compact />
            </GridItem>
            <GridItem xl={12} lg={12} md={12} sm={12}>
                <ResourceChart
                    title="Visualizações"
                    loading={loading}
                    interval={formGroup.values.interval}
                    events={events.visualizations}
                />
            </GridItem>
            <GridItem xl={12} lg={12} md={12} sm={12}>
                <ResourceChart
                    title="Impressões"
                    loading={loading}
                    interval={formGroup.values.interval}
                    events={events.impressions}
                />
            </GridItem>
            <GridItem xl={6} lg={6} md={6} sm={6}>
                <TotalSourcesChart
                    title="Visualizações"
                    loading={loading}
                    events={events.visualizations}
                />
            </GridItem>
            <GridItem xl={6} lg={6} md={6} sm={6}>
                <TotalSourcesChart
                    title="Impressões"
                    loading={loading}
                    events={events.impressions}
                />
            </GridItem>

        </Grid>
    );
}