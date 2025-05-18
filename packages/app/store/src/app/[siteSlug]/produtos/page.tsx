'use server';

import type { Metadata } from 'next';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { EventSource } from '@cda/services/events';
import type { Integration } from '@cda/services/integrations';

import RP from '@/template/RP';
import { baseUrl } from '@/services/core';

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

    return (
        <RP
            site={site}
            products={products}
            integrations={integrations}
            params={{
                utmSource,
                utmCampaign,
                storeId: site.id
            }}
        />
    );
}
