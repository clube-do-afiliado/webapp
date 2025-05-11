import { useEffect, useMemo } from 'react';

import Page from '@cda/ui/layout/Page';
import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Card, CardContent } from '@cda/ui/components/Card';
import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';
import Avatar from '@cda/ui/components/Avatar';

import { useSites } from '@cda/common/Sites';
import { useProducts } from '@cda/common/Products';
import { useEvent } from '@cda/common/Event';

import { release } from '@/services/core';

import AnalyticCard from './components/AnalyticCard';

export default function Home() {
    const { userSites } = useSites();
    const { events, getEvents } = useEvent();
    const { products, getStoreProducts } = useProducts();

    const storeId = useMemo(() => {
        if (!userSites.length) { return ''; }

        return userSites[0].id;
    }, [userSites]);

    useEffect(() => {
        if (!userSites.length) { return; }

        setup();
    }, [userSites]);

    const fetchEvents = () => { return getEvents(storeId); };

    const setup = async () => {
        return await Promise.all([
            fetchEvents(),
            getStoreProducts(storeId),
        ]);
    };

    return (
        <Page
            title="Seja bem vindo(a)"
            subtitle="Estamos felizes em ter você conosco!"
            action={
                <Button
                    variant="outlined"
                    startIcon={<Icon name="sync" />}
                    onClick={fetchEvents}
                >
                    Atualizar
                </Button>
            }
            release={release}
        >
            <Grid>
                <GridItem xl={12} lg={12} md={12} sm={12}>
                    <Card sx={{ background: ({ secondary }) => secondary.main }}>
                        <CardContent>
                            <Stack orientation="row" alignItems="center">
                                <Avatar
                                    icon={<Icon name="rocket" />}
                                />
                                <Stack spacing="small">
                                    <Typography noMargin variant="h5" color="primary.main">
                                        Desbloqueie todo o potencial!
                                    </Typography>
                                    <Typography noMargin variant="body2" color="secondary.contrastText">
                                        Atualize para o plano premium e aproveite recursos
                                        exclusivos que vão turbinar sua experiência.
                                    </Typography>
                                </Stack>
                                <Button style={{ width: 280, minWidth: 280 }}>Conhecer o plano premium</Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </GridItem>
                <GridItem xl={4} lg={4} md={6} sm={12}>
                    <AnalyticCard
                        icon={<Icon name="shopping-basket" />}
                        title="N° de produtos"
                        tooltipLabel="Número de produtos cadastrados"
                        value={products.length}
                    />
                </GridItem>
                <GridItem xl={4} lg={4} md={6} sm={12}>
                    <AnalyticCard
                        icon={<Icon name="bolt" />}
                        title="Impressões"
                        tooltipLabel="Número de impressões em produtos que levaram até a url da promoção"
                        value={events.impressions.length}
                    />
                </GridItem>
                <GridItem xl={4} lg={4} md={12} sm={12}>
                    <AnalyticCard
                        icon={<Icon name="eye" />}
                        title="Visualizações"
                        tooltipLabel="teste"
                        value={events.visualizations.length}
                    />
                </GridItem>
            </Grid>
        </Page>
    );
}