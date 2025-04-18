'use server';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import Products from '@/components/Products';
import BaseProviders from '@/providers/BaseProviders';
import { baseUrl } from '@/services/core';

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

    const siteRes = await fetch(`${baseUrl}/api/site/${slug}`);
    const site = await siteRes.json();

    if (!site) { return; }

    const productsRes = await fetch(`${baseUrl}/api/products/${site.id}`);
    const products = await productsRes.json();

    const integrationsRes = await fetch(`${baseUrl}/api/integrations`);
    const integrations = await integrationsRes.json();

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
