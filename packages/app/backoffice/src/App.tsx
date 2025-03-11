import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import AlertProvider from '@cda/ui/components/Alert';
import { createTheme, ThemeProvider, useTheme } from '@cda/ui/theme';

import { AuthProvider } from '@cda/common/Auth';

import Layout from '@/layout';
import { authServices, userServices, url } from '@/services/core';

function setFavicon(color: string) {
    let link = document.querySelector<HTMLLinkElement>('link[rel~=\'icon\']');

    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    fetch('https://cdn-web-80894.web.app/assets/favicon/favicon.svg')
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

    useEffect(() => { setFavicon(palette.primary.main); }, []);

    return (
        <Layout>
            <Outlet />
        </Layout>
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
                    userServices={userServices}
                >
                    <Content />
                </AuthProvider>
            </AlertProvider>
        </ThemeProvider>
    );
};