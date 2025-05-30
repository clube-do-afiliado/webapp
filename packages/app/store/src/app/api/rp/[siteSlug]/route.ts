import { NextRequest, NextResponse } from 'next/server';

import { removeEmptyProperties } from '@cda/toolkit/object';

import { TrackParams } from '@/services/trackService';
import { productsServices, sitesServices, integrationsServices, serverFunctions, url } from '@/services/core';

type RequestContext = {
    params: Promise<{
        [key: string]: string | string[];
    }>;
}

const ALLOWED_ORIGIN = url.store;

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
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

    const res = NextResponse.json({ integrations, site, products }, { status: 200 });

    res.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);

    return res;
}

export async function POST(req: NextRequest) {
    const data = (await req.json()) as TrackParams;

    const trackResponse = await serverFunctions.getFunction('track', {
        name: 'rp_view',
        createdAt: new Date(),
        ...removeEmptyProperties(data)
    });

    const res = NextResponse.json(trackResponse, { status: 200 });

    res.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
}
