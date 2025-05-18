'use server';

import type { Metadata } from 'next';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { EventSource } from '@cda/services/events';
import type { Integration } from '@cda/services/integrations';

import LDP from '@/template/LDP';
import { baseUrl } from '@/services/core';

interface NextPageProps<
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TSearchParams extends Record<string, unknown> = Record<string, unknown>
> {
    params: Promise<TParams>;
    searchParams: Promise<TSearchParams>;
}

async function getData(siteSlug: string, productSlug: string): Promise<{
    site: Site,
    product: Product,
    integrations: Integration[],
}> {
    const res = await fetch(`${baseUrl}/api/ldp/${siteSlug}/${productSlug}`);
    return await res.json();
}

export async function generateMetadata({ params, }: NextPageProps<{
    siteSlug: string;
    productSlug: string;
}>): Promise<Metadata> {
    const { siteSlug, productSlug } = await params;

    const { site } = await getData(siteSlug, productSlug);

    return {
        title: site.information.title,
        description: site.information.description,
        icons: site.theme.favicon,
        openGraph: {
            images: site.theme.favicon,
        },
    };
}

export default async function Page({ params, searchParams }: NextPageProps<{ siteSlug: string; productSlug: string }>) {
    const { siteSlug, productSlug } = await params;
    const queryParams = await searchParams ?? {};

    const utmSource = queryParams.utm_source as EventSource;
    const utmCampaign = queryParams.utm_campaign as string;

    const {
        site,
        integrations,
        product
    } = await getData(siteSlug, productSlug);

    const integration = integrations.find(i => i.id === product.integration) as Integration;

    return (
        <LDP
            site={site}
            product={product}
            integration={integration}
            trackParams={{
                storeId: site.id,
                productId: product.id,
                utmSource,
                utmCampaign
            }}
        />
    );
}
