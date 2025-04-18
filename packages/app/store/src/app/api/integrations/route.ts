import { integrationsServices } from '@/services/core';

export async function GET() {
    const integrations = await integrationsServices.list();

    return Response.json(integrations);
}