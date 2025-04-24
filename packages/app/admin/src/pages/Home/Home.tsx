import { useEffect } from 'react';

import Page from '@cda/ui/layout/Page';
import Icon from '@cda/ui/components/Icon';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import { useSites } from '@cda/common/Sites';
import { useProducts } from '@cda/common/Products';

import { release } from '@/services/core';

import AnalyticCard from './components/AnalyticCard';

export default function Home() {
    const { userSites } = useSites();
    const { products, getStoreProducts } = useProducts();

    useEffect(() => {
        if (!userSites.length) { return; }

        getStoreProducts(userSites[0].id);
    }, [userSites]);

    return (
        <Page
            title="Seja bem vindo(a)"
            subtitle="Estamos felizes em ter você conosco!"
            release={release}
        >
            <Grid>
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
                        value={250}
                    />
                </GridItem>
                <GridItem xl={4} lg={4} md={12} sm={12}>
                    <AnalyticCard
                        icon={<Icon name="eye" />}
                        title="Visualizações"
                        tooltipLabel="teste"
                        value={650}
                    />
                </GridItem>
            </Grid>

        </Page >
    );
}