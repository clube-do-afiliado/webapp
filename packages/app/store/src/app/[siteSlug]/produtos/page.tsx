'use server';

import type { Metadata } from 'next';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { Integration } from '@cda/services/integrations';
import type { EventSource } from '@cda/services/events';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import Products from '@/components/Products';
import BaseProviders from '@/providers/BaseProviders';
import { baseUrl } from '@/services/core';
import { trackRP } from '@/services/trackService';

import './ProductsPage.scss';

interface NextPageProps<
    Params extends Record<string, unknown> = Record<string, unknown>,
    SearchParams extends Record<string, unknown> = Record<string, unknown>
> {
    params: Promise<Params>;
    searchParams: Promise<SearchParams>;
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

    return {
        title: site.information.title,
        description: site.information.description,
        icons: site.theme.favicon,
        openGraph: {
            images: site.theme.favicon,
        },
    };
}

export default async function Page({ params, searchParams }: NextPageProps<{ siteSlug: string; }>) {
    const { siteSlug } = await params;
    const queryParams = await searchParams ?? {};

    const utmSource = queryParams.utm_source as EventSource;
    const utmCampaign = queryParams.utm_campaign as string;

    const {
        site,
        integrations,
        products
    } = await getData(siteSlug);

    await trackRP(siteSlug, { storeId: site.id, utmSource, utmCampaign });

    return (
        <BaseProviders site={site}>
            <div className="products-page">
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
