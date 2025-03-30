'use server';

import { redirect } from 'next/navigation';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import Products from '@/components/Products';
import BaseProviders from '@/providers/BaseProviders';
import { sitesServices, productsServices, integrationsServices } from '@/services/core';

import './ProductsPage.scss';

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

    if (!site) { return redirect('/not-found'); }

    const products = await productsServices.getVisibleStoreProducts(site.id);
    const integrations = await integrationsServices.list();

    return (
        <BaseProviders site={site}>
            <div className="product-page">
                <Header site={site} />
                <Content title="Produtos">
                    <Products
                        site={site}
                        products={products}
                        integrations={integrations}
                    />
                </Content>
                <Footer site={site} />
            </div>
        </BaseProviders>
    );
}
