import { NextRequest, NextResponse } from 'next/server';

import { productsServices, sitesServices, integrationsServices } from '@/services/core';

type RequestContext = {
    params: Promise<{
        [key: string]: string | string[];
    }>;
}

export async function GET(_: NextRequest, context: RequestContext) {
    const params = await context.params;
    const { siteSlug, productSlug } = params;

    const [site, integrations] = await Promise.all([
        sitesServices.getUserStoresBySlug(siteSlug as string),
        integrationsServices.list()
    ]);

    if (!site) { return; }

    const product = await productsServices.detailsBySlug(productSlug as string);

    return NextResponse.json({ integrations, site, product }, { status: 200 });
}