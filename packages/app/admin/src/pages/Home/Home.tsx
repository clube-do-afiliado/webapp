import { useEffect, useMemo, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Tooltip from '@cda/ui/components/Tooltip';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import { subMonths } from '@cda/toolkit/date';

import type { EventFilter } from '@cda/services/events';

import { useSites } from '@cda/common/Sites';
import { useEvent } from '@cda/common/Event';
import { useProducts } from '@cda/common/Products';
import { EmptyContent } from '@cda/common/EmptyContent';

import { release } from '@/services/core';
import ResourceChart from '@/components/ResourceChart';
import { Filter, useEventsFilter } from '@/components/Filter';
import TotalSourcesChart from '@/components/TotalSourcesChart';
import AdminPage from '@/components/AdminPage';

import AnalyticCard from './components/AnalyticCard';

export default function Home() {
    const { userSites } = useSites();
    const { events, getEvents } = useEvent();
    const { products, getStoreProducts } = useProducts();

    const [params, setParams] = useState<EventFilter>({
        endDate: new Date(),
        startDate: subMonths(new Date(), 1),
        unique: false
    });

    const formGroup = useEventsFilter((options) => {
        setParams(options);
        fetchEvents(options);
    });

    const [loading, setLoading] = useState(true);

    const storeId = useMemo(() => {
        if (!userSites.length) { return ''; }

        return userSites[0].id;
    }, [userSites]);

    useEffect(() => {
        if (!userSites.length) { return; }

        setup();
    }, [userSites]);

    const fetchEvents = async (options: EventFilter) => {
        setLoading(true);

        getEvents(storeId, { ...options, endDate: new Date() })
            .finally(() => setTimeout(() => { setLoading(false); }, 1000));
    };

    const setup = async () => {
        return await Promise.all([
            fetchEvents(params),
            getStoreProducts(storeId),
        ]);
    };

    return (
        <AdminPage
            title="Seja bem vindo(a)"
            subtitle="Estamos felizes em ter você conosco!"
            action={
                <Button
                    variant="outlined"
                    startIcon={<Icon name="sync" />}
                    onClick={() => fetchEvents(params)}
                >
                    Atualizar
                </Button>
            }
            release={release}
        >
            <Stack>
                {
                    !events.impressions.length && !events.visualizations.length && (
                        <Stack justifyContent="center" alignItems="center">
                            <EmptyContent
                                icon="chart-pie-alt"
                                message="Nenhum evento por aqui"
                            />
                        </Stack>
                    )
                }
                {
                    Boolean(events.impressions.length || events.visualizations.length) && (
                        <Grid>
                            <GridItem xl={12} lg={12} md={12} sm={12}>
                                <Filter formGroup={formGroup} />
                            </GridItem>
                            <GridItem xl={4} lg={4} md={6} sm={12}>
                                <AnalyticCard
                                    loading={loading}
                                    title="N° de produtos"
                                    icon={<Icon name="shopping-basket" />}
                                    tooltip={
                                        <Tooltip label="teste">
                                            <Icon name="info-circle" color="text.secondary" />
                                        </Tooltip>
                                    }
                                    value={products.length}
                                />
                            </GridItem>
                            <GridItem xl={4} lg={4} md={6} sm={12}>
                                <AnalyticCard
                                    loading={loading}
                                    title="Visualizações"
                                    icon={<Icon name="eye" />}
                                    tooltip={
                                        <Tooltip label="teste">
                                            <Icon name="info-circle" color="text.secondary" />
                                        </Tooltip>
                                    }
                                    value={events.visualizations.length}
                                />
                            </GridItem>
                            <GridItem xl={4} lg={4} md={12} sm={12}>
                                <AnalyticCard
                                    loading={loading}
                                    title="Impressões"
                                    icon={<Icon name="bolt" />}
                                    tooltip={
                                        <Tooltip
                                            label="Número de impressões em produtos que levaram até a url da promoção"
                                        >
                                            <Icon name="info-circle" color="text.secondary" />
                                        </Tooltip>
                                    }
                                    value={events.impressions.length}
                                />
                            </GridItem>
                            <GridItem xl={8} lg={8} md={12} sm={12}>
                                <ResourceChart
                                    title="Visualizações"
                                    loading={loading}
                                    interval={formGroup.values.interval}
                                    events={events.visualizations}
                                />
                            </GridItem>
                            <GridItem xl={4} lg={4} md={6} sm={6}>
                                <TotalSourcesChart
                                    title="Visualizações"
                                    loading={loading}
                                    events={events.visualizations}
                                />
                            </GridItem>
                            <GridItem xl={4} lg={4} md={6} sm={6}>
                                <TotalSourcesChart
                                    title="Impressões"
                                    loading={loading}
                                    events={events.impressions}
                                />
                            </GridItem>
                            <GridItem xl={8} lg={8} md={12} sm={12}>
                                <ResourceChart
                                    title="Impressões"
                                    loading={loading}
                                    interval={formGroup.values.interval}
                                    events={events.impressions}
                                />
                            </GridItem>
                        </Grid>
                    )
                }
            </Stack>
        </AdminPage>
    );
}