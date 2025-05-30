import { NextRequest, NextResponse } from 'next/server';

import { removeEmptyProperties } from '@cda/toolkit/object';

import { Action, TrackParams } from '@/services/trackService';
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
    const { siteSlug, productSlug } = params;

    const [site, integrations] = await Promise.all([
        sitesServices.getUserStoresBySlug(siteSlug as string),
        integrationsServices.list()
    ]);

    if (!site) { return; }

    const product = await productsServices.detailsBySlug(productSlug as string);

    const res = NextResponse.json({ integrations, site, product }, { status: 200 });

    res.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);

    return res;
}

export async function POST(req: NextRequest) {
    const body = (await req.json()) as { action: Action; data: TrackParams };
    const { action, data } = body;

    if (action === 'impression') { return trackLDPImpression(data); }
    if (action === 'visualization') { return trackLDPVisualization(data); }

    const res = NextResponse.json({ error: 'Ação inválida' }, { status: 400 });

    res.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);

    return res;
}

async function trackLDPVisualization(data: TrackParams) {
    const trackResponse = await serverFunctions.getFunction('track', {
        name: 'ldp_view',
        createdAt: new Date(),
        ...removeEmptyProperties(data)
    });

    const res = NextResponse.json(trackResponse, { status: 200 });

    res.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);

    return res;
}

async function trackLDPImpression(data: TrackParams) {
    const trackResponse = await serverFunctions.getFunction('track', {
        name: 'ldp_cta',
        createdAt: new Date(),
        ...removeEmptyProperties(data)
    });

    const res = NextResponse.json(trackResponse, { status: 200 });

    res.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);

    return res;
}