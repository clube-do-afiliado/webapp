import { Outlet } from 'react-router-dom';
import { PropsWithChildren, useEffect } from 'react';

import { AlertProvider } from '@cda/ui/components/Alert';
import { createTheme, ThemeProvider, useTheme } from '@cda/ui/theme';

import logger from '@cda/toolkit/logger';

import { UserData } from '@cda/services/user';

import { SitesProvider, useSites } from '@cda/common/Sites';
import { AuthProvider, useAuth } from '@cda/common/Auth';
import { PlansProvider, usePlans } from '@cda/common/Plans';
import { RolesProvider, useRoles } from '@cda/common/Roles';
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
    integrationsServices
} from '@/services/core';

import { UsersProvider } from './pages/Users';

function setFavicon(color: string) {
    let link = document.querySelector<HTMLLinkElement>('link[rel~=\'icon\']');

    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    fetch('https://cdn.clubedoafiliado.com/assets/favicon/favicon-reversed.svg')
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
    const { getRoles } = useRoles();
    const { getSites } = useSites();
    const { getIntegrations } = useIntegrations();

    useEffect(() => {
        setFavicon(palette.primary.main);

        Promise.all([getIntegrations(), getPlans(), getRoles(), getSites()])
            .then(() => logger.log('Informações base carregadas'));
    }, []);

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
        <RolesProvider rolesServices={rolesServices}>
            <PlansProvider plansServices={plansServices}>
                <IntegrationsProvider integrationsServices={integrationsServices}>
                    <UsersProvider>
                        <SitesProvider sitesServices={sitesServices}>
                            {children}
                        </SitesProvider>
                    </UsersProvider>
                </IntegrationsProvider>
            </PlansProvider>
        </RolesProvider>
    );
}

export default function App() {
    const handleAuthenticate = (user?: UserData) => {
        if (user) { return; }

        window.open(url.sso, '_self');
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <AlertProvider>
                <AuthProvider
                    authServices={authServices}
                    usersServices={userServices}
                    onAuthenticate={handleAuthenticate}
                >
                    <Providers>
                        <Content />
                    </Providers>
                </AuthProvider>
            </AlertProvider>
        </ThemeProvider>
    );
};