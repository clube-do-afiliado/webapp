import { slug } from '@cda/toolkit/string';

import db from '../db';
import type { Integration } from './interface';

export default class IntegrationsServices {
    private static PATH = 'integrations';

    constructor(private db: db) { }

    async list() {
        return this.db.getList<Integration>({
            path: IntegrationsServices.PATH,
            pathSegments: [],
            filters: [],
        });
    }

    async details(id: string) {
        return this.db.getItem<Integration>({
            path: IntegrationsServices.PATH,
            pathSegments: [],
            filters: [{ field: 'id', operator: '==', value: id }],
        });
    }

    async create(integration: Omit<Integration, 'id'>) {
        const id = slug(integration.name);

        const newIntegration = { ...integration, id };

        return this.db.setItem<Integration>({
            data: newIntegration,
            path: IntegrationsServices.PATH,
            pathSegments: [id],
        }).then(() => newIntegration);
    }

    async delete(id: string) {
        return this.db.deleteItem({
            path: IntegrationsServices.PATH,
            pathSegments: [id],
        });
    }

    async update(integration: Integration) {
        return this.db.setItem<Integration>({
            data: integration,
            path: IntegrationsServices.PATH,
            pathSegments: [integration.id],
        }).then(() => integration);
    }
}