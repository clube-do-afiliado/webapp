import { NextRequest, NextResponse } from 'next/server';

import { removeEmptyProperties } from '@cda/toolkit/object';

import { Action, TrackParams } from '@/services/trackService';
import { productsServices, sitesServices, integrationsServices, serverFunctions } from '@/services/core';

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

export async function POST(req: NextRequest) {
    const body = (await req.json()) as { action: Action; data: TrackParams };
    const { action, data } = body;

    if (action === 'impression') { return trackLDPImpression(data); }
    if (action === 'visualization') { return trackLDPVisualization(data); }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
}

async function trackLDPVisualization(data: TrackParams) {
    const res = await serverFunctions.getFunction('track', {
        name: 'ldp_view',
        createdAt: new Date(),
        ...removeEmptyProperties(data)
    });

    return NextResponse.json(res, { status: 200 });
}

async function trackLDPImpression(data: TrackParams) {
    const res = await serverFunctions.getFunction('track', {
        name: 'ldp_cta',
        createdAt: new Date(),
        ...removeEmptyProperties(data)
    });

    return NextResponse.json(res, { status: 200 });
}