import { NextRequest, NextResponse } from 'next/server';

import { productsServices, sitesServices, integrationsServices } from '@/services/core';

type RequestContext = {
    params: Promise<{
        [key: string]: string | string[];
    }>;
}

export async function GET(_: NextRequest, context: RequestContext) {
    const params = await context.params;
    const siteSlug = params.siteSlug as string;

    const [site, integrations] = await Promise.all([
        sitesServices.getUserStoresBySlug(siteSlug),
        integrationsServices.list()
    ]);

    if (!site) { return; }

    const products = await productsServices.getVisibleStoreProducts(site.id);

    return NextResponse.json({ integrations, site, products }, { status: 200 });
}