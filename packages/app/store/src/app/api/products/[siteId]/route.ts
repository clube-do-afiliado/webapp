import { productsServices } from '@/services/core';

export const runtime = 'edge';

export async function GET(_: Request, { params }) {
    const { siteId } = await params;

    const products = await productsServices.getVisibleStoreProducts(siteId);

    return Response.json(products);
}