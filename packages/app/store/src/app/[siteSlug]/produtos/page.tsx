import { Metadata } from 'next';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { Integration } from '@cda/services/integrations';

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

async function getData(siteSlug: string): Promise<{
    site: Site,
    products: Product[],
    integrations: Integration[],
}> {
    const res = await fetch(`${baseUrl}/api/rp/${siteSlug}`);
    return await res.json();
}

export async function generateMetadata({ params }: NextPageProps<{ siteSlug: string }>): Promise<Metadata> {
    const { siteSlug } = await params;

    const { site } = await getData(siteSlug);

    console.log('SITE', site);

    return {
        title: site.information.title,
        description: site.information.description,
        icons: site.theme.favicon,
        openGraph: {
            images: site.theme.favicon,
        },
    };
}

export default async function Page({ params }: NextPageProps<{ siteSlug: string }>) {
    const { siteSlug } = await params;

    const {
        site,
        integrations,
        products
    } = await getData(siteSlug);

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
