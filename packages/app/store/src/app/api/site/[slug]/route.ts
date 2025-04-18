import { sitesServices } from '@/services/core';

export const runtime = 'edge';

export async function GET(_: Request, { params }) {
    const { slug } = await params;

    const site = await sitesServices.getUserStoresBySlug(slug);

    return Response.json(site);
}