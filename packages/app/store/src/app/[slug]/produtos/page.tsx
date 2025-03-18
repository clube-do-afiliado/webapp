'use server';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { sitesServices } from '@/services/core';
import BaseProviders from '@/providers/BaseProviders';
import Content from '@/components/Content';
import Products from '@/components/Products';

interface NextPageProps<
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TSearchParams extends Record<string, unknown> = Record<string, unknown>
> {
    params: Promise<TParams>;
    searchParams: Promise<TSearchParams>;
}

export default async function Page({ params }: NextPageProps<{ slug: string }>) {
    const { slug } = await params;

    const site = await sitesServices.getUserStoresBySlug(slug);

    if (!site) { throw new Error(`A loja "${slug}" não foi encontrada`); }

    return (
        <BaseProviders site={site}>
            <Header site={site} />
            <Content title="Produtos">
                <Products site={site} />
            </Content>
            <Footer site={site} />
        </BaseProviders>
    );
}
