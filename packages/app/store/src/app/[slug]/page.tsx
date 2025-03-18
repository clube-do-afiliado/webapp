'use server';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import { sitesServices } from '@/services/core';
import BaseProviders from '@/providers/BaseProviders';

interface NextPageProps<
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TSearchParams extends Record<string, unknown> = Record<string, unknown>
> {
    params: Promise<TParams>;
    searchParams: Promise<TSearchParams>;
}

export default async function Store({ params }: NextPageProps<{ slug: string }>) {
    const { slug } = await params;

    const site = await sitesServices.getUserStoresBySlug(slug);

    if (!site) { throw new Error(`A loja "${slug}" não foi encontrada`); }

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
