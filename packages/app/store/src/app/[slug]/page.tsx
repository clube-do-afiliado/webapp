'use server';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import BaseProviders from '@/providers/BaseProviders';
import { baseUrl } from '@/services/core';

interface NextPageProps<
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TSearchParams extends Record<string, unknown> = Record<string, unknown>
> {
    params: Promise<TParams>;
    searchParams: Promise<TSearchParams>;
}

export default async function Store({ params }: NextPageProps<{ slug: string }>) {
    const { slug } = await params;

    const res = await fetch(`${baseUrl}/api/site/${slug}`);
    const site = await res.json();

    if (!site) { return; }

    return (
        <BaseProviders site={site}>
            <Header site={site} />
            <Content title="Home">
                <div>home</div>
            </Content>
            <Footer site={site} />
        </BaseProviders>
    );
}
