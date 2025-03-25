import Page from '@cda/ui/layout/Page';
import Slide from '@cda/ui/animations/Slide';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import { orderByIndex } from '@cda/toolkit/array';

import { planPriorityOrder } from '@cda/common/Plans';
import { AccessControl } from '@cda/common/AccessControl';
import { useIntegrations } from '@cda/common/Integrations';

import { release } from '@/services/core';

import StoreCard from './components/StoreCard';

export default function Stores() {
    const { integrations, loading } = useIntegrations();

    return (
        <Page
            title="Lojas"
            subtitle="Conheça nosso catálogo de lojas"
            loading={loading}
            release={release}
        >
            {
                !loading && Boolean(integrations.length) && (
                    <Grid xl={3} lg={4} md={6} sm={12}>
                        {
                            orderByIndex(integrations, 'plan', planPriorityOrder)
                                .map((integration, i) => (
                                    <GridItem key={integration.id}>
                                        <Slide enter direction="left" delay={(i + 1) * 100}>
                                            <AccessControl
                                                permissions={integration.permissions}
                                                component={(allowed) => (
                                                    <StoreCard
                                                        allowed={allowed}
                                                        integration={integration}
                                                    />
                                                )}
                                            />
                                        </Slide>
                                    </GridItem>
                                ))
                        }
                    </Grid>
                )
            }
        </Page>
    );
}