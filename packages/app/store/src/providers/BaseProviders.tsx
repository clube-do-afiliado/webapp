'use client';

import { PropsWithChildren } from 'react';

import { Site } from '@cda/services/sites';

import PageProvider from '@/providers/PageProvider';

import ThemeProvider from './ThemeProvider';

export default function BaseProviders({ site, children }: PropsWithChildren<{
    site: Site
}>) {
    return (
        <PageProvider site={site}>
            <ThemeProvider site={site} />
            {children}
        </PageProvider>
    );
}