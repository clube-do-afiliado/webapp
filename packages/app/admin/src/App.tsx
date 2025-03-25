import { Outlet } from 'react-router-dom';
import { PropsWithChildren, useEffect } from 'react';

import { AlertProvider } from '@cda/ui/components/Alert';
import { createTheme, ThemeProvider, useTheme } from '@cda/ui/theme';

import logger from '@cda/toolkit/logger';

import { ProductsProvider } from '@cda/common/Products';
import { AuthProvider, useAuth } from '@cda/common/Auth';
import { SitesProvider, useSites } from '@cda/common/Sites';
import { PlansProvider, usePlans } from '@cda/common/Plans';
import { AccessControlProvider } from '@cda/common/AccessControl';
import { IntegrationsProvider, useIntegrations } from '@cda/common/Integrations';

import Layout from '@/layout';
import {
    url,
    authServices,
    userServices,
    rolesServices,
    plansServices,
    sitesServices,
    productsServices,
    integrationsServices,
} from '@/services/core';

function setFavicon(color: string) {
    let link = document.querySelector<HTMLLinkElement>('link[rel~=\'icon\']');

    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    fetch('https://cdn.clubedoafiliado.com/assets/favicon/favicon.svg')
        .then((response) => response.text())
        .then((svgText) => {
            const updatedSVG = svgText.replace(/fill="[^"]*"/, `color="${color}"`);

            const blob = new Blob([updatedSVG], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            link.href = url;
        });
}

function Content() {
    const { theme: { palette } } = useTheme();

    const { user } = useAuth();

    const { getPlans } = usePlans();
    const { getUserSites } = useSites();
    const { getIntegrations } = useIntegrations();

    useEffect(() => {
        setFavicon(palette.primary.main);

        if (!user) { return; }

        Promise.all([getIntegrations(), getPlans(), getUserSites(user.id)])
            .then(() => logger.log('Informações base carregadas'));
    }, [user]);

    return (
        <AccessControlProvider
            user={user}
            rolesServices={rolesServices}
            plansServices={plansServices}
        >
            <Layout>
                <Outlet />
            </Layout>
        </AccessControlProvider>
    );
}

function Providers({ children }: PropsWithChildren) {
    return (
        <PlansProvider plansServices={plansServices}>
            <IntegrationsProvider integrationsServices={integrationsServices}>
                <SitesProvider sitesServices={sitesServices}>
                    <ProductsProvider productsServices={productsServices}>
                        {children}
                    </ProductsProvider>
                </SitesProvider>
            </IntegrationsProvider>
        </PlansProvider>
    );
}

export default function App() {
    return (
        <ThemeProvider theme={createTheme()}>
            <AlertProvider>
                <AuthProvider
                    shouldAuthenticate
                    url={url}
                    authServices={authServices}
                    usersServices={userServices}
                >
                    <Providers>
                        <Content />
                    </Providers>
                </AuthProvider>
            </AlertProvider>
        </ThemeProvider>
    );
};