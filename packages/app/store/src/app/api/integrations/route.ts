import { integrationsServices } from '@/services/core';

export const runtime = 'edge';

export async function GET() {
    const integrations = await integrationsServices.list();

    return Response.json(integrations);
}