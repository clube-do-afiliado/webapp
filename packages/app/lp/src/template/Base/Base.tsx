'use client';

import { PropsWithChildren, useEffect } from 'react';

import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';
import Avatar from '@cda/ui/components/Avatar';
import { Header } from '@cda/ui/layout/Header';
import { createTheme, ThemeProvider, useTheme } from '@cda/ui/theme';

import { AuthProvider, useAuth } from '@cda/common/Auth';

import Footer from '@/components/Footer';
import { authServices, url, userServices } from '@/services/core';

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

function Content({ children }: PropsWithChildren) {
    const { user, redirect } = useAuth();
    const { theme: { palette } } = useTheme();

    useEffect(() => { setFavicon(palette.primary.contrastText); }, []);

    const handleLogin = () => { window.open(`${url.sso}/signin`, '_blank'); };

    const handleRedirect = () => {
        if (!user) { return; }
        redirect(user);
    };

    return (
        <>
            <Header
                actions={
                    <>
                        {
                            !user && (
                                <Button
                                    startIcon={<Icon name="signin" />}
                                    onClick={handleLogin}
                                >
                                    Entrar
                                </Button>
                            )
                        }
                        {
                            user && (
                                <Avatar
                                    src={user.picture}
                                    alt="Meu perfil"
                                    onClick={handleRedirect}
                                />
                            )
                        }
                    </>
                }
            />
            {children}
            <Footer />
        </>
    );
}

export default function Base({ children }: PropsWithChildren) {
    return (
        <ThemeProvider theme={createTheme()}>
            <AuthProvider
                url={url}
                authServices={authServices}
                usersServices={userServices}
            >
                <Content>
                    {children}
                </Content>
            </AuthProvider>
        </ThemeProvider>
    );
}