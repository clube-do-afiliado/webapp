import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { AlertProvider } from '@cda/ui/components/Alert';
import { GuideProvider } from '@cda/ui/components/Guide';
import { createTheme, ThemeProvider, useTheme } from '@cda/ui/theme';

import logger from '@cda/toolkit/logger';

import { UserData } from '@cda/services/user';

import { UserProvider } from '@cda/common/User';
import { EventProvider } from '@cda/common/Event';
import { ProductsProvider } from '@cda/common/Products';
import { PreferencesProvider } from '@cda/common/Preferences';
import { AccessControlProvider } from '@cda/common/AccessControl';
import { AuthProvider, useAuth } from '@cda/common/Auth';
import { SitesProvider, useSites } from '@cda/common/Sites';
import { PlansProvider, usePlans } from '@cda/common/Plans';
import { SignaturesProvider, useSignatures } from '@cda/common/Signatures';
import { IntegrationsProvider, useIntegrations } from '@cda/common/Integrations';
import { createProvider, defineProvider } from '@cda/common/Provider';

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
    eventsServices,
    signaturesServices,
} from '@/services/core';

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
    const navigate = useNavigate();

    const { theme: { palette } } = useTheme();

    const { user } = useAuth();

    const { getPlans } = usePlans();
    const { getUserSites } = useSites();
    const { getIntegrations } = useIntegrations();
    const { signature, getSignature } = useSignatures();

    useEffect(() => {
        setFavicon(palette.primary.main);

        if (!user) { return; }

        Promise.all([
            getIntegrations(),
            getPlans(),
            getSignature(user.id),
            getUserSites(user.id)
        ])
            .then(() => logger.log('Informações base carregadas'));
    }, [user]);

    useEffect(() => {
        if (!signature) { return; }

        if (signature.status === 'inactive') { navigate('plans'); }
    }, [signature]);

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

function handleAuthenticate(user?: UserData) {
    if (user) { return; }

    window.open(url.sso, '_self');
};

const Providers = createProvider([
    defineProvider([AuthProvider, {
        authServices,
        usersServices: userServices,
        onAuthenticate: handleAuthenticate
    }]),
    defineProvider([PreferencesProvider]),
    defineProvider([UserProvider, { userServices }]),
    defineProvider([PlansProvider, { plansServices }]),
    defineProvider([IntegrationsProvider, { integrationsServices }]),
    defineProvider([SignaturesProvider, { signaturesServices }]),
    defineProvider([SitesProvider, { sitesServices }]),
    defineProvider([ProductsProvider, { productsServices }]),
    defineProvider([EventProvider, { eventsServices }]),
]);

const UIProviders = createProvider([
    defineProvider([ThemeProvider, { theme: createTheme() }]),
    defineProvider([AlertProvider]),
    defineProvider([GuideProvider]),
]);

export default function App() {

    return (
        <UIProviders>
            <Providers>
                <Content />
            </Providers>
        </UIProviders>
    );
};