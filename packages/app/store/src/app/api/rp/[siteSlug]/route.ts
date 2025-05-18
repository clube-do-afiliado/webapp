import { NextRequest, NextResponse } from 'next/server';

import { removeEmptyProperties } from '@cda/toolkit/object';

import { TrackParams } from '@/services/trackService';
import { productsServices, sitesServices, integrationsServices, serverFunctions } from '@/services/core';

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

export async function POST(req: NextRequest) {
    const data = (await req.json()) as TrackParams;

    const res = await serverFunctions.getFunction('track', {
        name: 'rp_view',
        createdAt: new Date(),
        ...removeEmptyProperties(data)
    });

    return NextResponse.json(res, { status: 200 });
}
