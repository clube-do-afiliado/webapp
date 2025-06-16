import { useEffect, useMemo, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Tooltip from '@cda/ui/components/Tooltip';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Step } from '@cda/ui/components/Guide';
import ButtonIcon from '@cda/ui/components/ButtonIcon';

import { subMonths } from '@cda/toolkit/date';

import type { EventFilter } from '@cda/services/events';

import { useSites } from '@cda/common/Sites';
import { useEvent } from '@cda/common/Event';
import { useProducts } from '@cda/common/Products';
import { EmptyContent } from '@cda/common/EmptyContent';
import { usePreferences } from '@cda/common/Preferences';
import { useSignatures } from '@cda/common/Signatures';

import { release } from '@/services/core';
import ResourceChart from '@/components/ResourceChart';
import { Filter, useEventsFilter } from '@/components/Filter';
import TotalSourcesChart from '@/components/TotalSourcesChart';
import AdminPage from '@/components/AdminPage';

import AnalyticCard from './components/AnalyticCard';
import useHomeGuide from './useHomeGuide';

export default function Home() {
    const { start } = useHomeGuide();

    const { tour } = usePreferences();
    const { isActive } = useSignatures();
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
        if (tour.home || !isActive) { return; }

        setTimeout(() => { start(); }, 500);
    }, []);

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
                isActive && (
                    <Button
                        variant="outlined"
                        startIcon={<Icon name="sync" />}
                        onClick={() => fetchEvents(params)}
                    >
                        Atualizar
                    </Button>
                )
            }
            release={release}
        >
            <Stack>
                {
                    // !events.impressions.length && !events.visualizations.length && (
                    !isActive && (
                        <Stack justifyContent="center" alignItems="center">
                            <EmptyContent
                                image="chart"
                                // icon="chart-pie-alt"
                                message="Nenhum evento por aqui"
                            />
                        </Stack>
                    )
                }
                {
                    // Boolean(events.impressions.length || events.visualizations.length) && (
                    isActive && (
                        <Step name="dashboard">
                            <Grid>
                                <GridItem xl={12} lg={12} md={12} sm={12}>
                                    <Step name="filters">
                                        <Filter formGroup={formGroup} />
                                    </Step>
                                </GridItem>
                                <GridItem xl={12}>
                                    <Step name="summary">
                                        <Grid>
                                            <GridItem xl={4} lg={4} md={6} sm={12}>
                                                <AnalyticCard
                                                    loading={loading}
                                                    title="N° de produtos"
                                                    icon={<Icon name="shopping-basket" />}
                                                    tooltip={
                                                        <Tooltip
                                                            // eslint-disable-next-line
                                                            label="Este número representa quantas vezes sua página foi visualizada por outras pessoas"
                                                            direction="right"
                                                            width={350}
                                                        >
                                                            <ButtonIcon color="text.secondary">
                                                                <Icon name="info-circle" color="text.secondary" />
                                                            </ButtonIcon>
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
                                                        <Tooltip
                                                            // eslint-disable-next-line
                                                            label="Este número representa quantas vezes sua página foi visualizada por outras pessoas"
                                                            width={350}
                                                        >
                                                            <ButtonIcon color="text.secondary">
                                                                <Icon name="info-circle" color="text.secondary" />
                                                            </ButtonIcon>
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
                                                    value={events.impressions.length}
                                                    tooltip={
                                                        <Tooltip
                                                            // eslint-disable-next-line
                                                            label="Quantidade de vezes que sua página redirecionou para a URL original."
                                                            direction="left"
                                                            width={350}
                                                        >
                                                            <ButtonIcon color="text.secondary">
                                                                <Icon name="info-circle" color="text.secondary" />
                                                            </ButtonIcon>
                                                        </Tooltip>
                                                    }
                                                />
                                            </GridItem>
                                        </Grid>
                                    </Step>
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
                        </Step>
                    )
                }
            </Stack>
        </AdminPage>
    );
}