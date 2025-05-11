import { NextRequest, NextResponse } from 'next/server';

import { productsServices, sitesServices, integrationsServices, serverFunctions } from '@/services/core';
import { TrackParams } from '@/services/trackService';

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
    const body = (await req.json()) as TrackParams;

    const res = await serverFunctions.getFunction('track', {
        name: 'ldp_view',
        createdAt: new Date(),
        storeId: body.storeId,
        utmSource: body.utmSource,
        utmCampaign: body.utmCampaign
    });

    return NextResponse.json(res, { status: 200 });
}
