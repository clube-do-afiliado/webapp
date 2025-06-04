import { uuid } from '@cda/toolkit/uuid';

import type DB from '../db';
import type { Site } from './interface';

export default class SitesServices {
    private static PATH = 'sites';

    constructor(private db: DB) { }

    async details(id: string) {
        return this.db.getItem<Site>({
            path: SitesServices.PATH,
            pathSegments: [],
            filters: [{ field: 'id', operator: '==', value: id }]
        });
    }

    async list() {
        return this.db.getList<Site>({
            path: SitesServices.PATH,
            pathSegments: [],
            filters: [],
        });
    }

    async getUserStores(ownerId: string) {
        return this.db.getList<Site>({
            path: SitesServices.PATH,
            pathSegments: [],
            filters: [{ field: 'ownerId', operator: '==', value: ownerId }],
        });
    }

    async getUserStoresBySlug(slug: string) {
        return this.db.getItem<Site>({
            path: SitesServices.PATH,
            pathSegments: [],
            filters: [{ field: 'slug', operator: '==', value: slug }],
        });
    }

    async create(site: Omit<Site, 'id'>) {
        const id = uuid();

        const newSite = { ...site, id };

        return this.db.setItem<Site>({
            data: newSite,
            path: SitesServices.PATH,
            pathSegments: [id],
        }).then(() => newSite);
    }

    async delete(id: string) {
        return this.db.deleteItem({
            path: SitesServices.PATH,
            pathSegments: [id],
        });
    }

    async update(site: Site) {
        return this.db.setItem<Site>({
            data: site,
            path: SitesServices.PATH,
            pathSegments: [site.id],
        }).then(() => site);
    }
}