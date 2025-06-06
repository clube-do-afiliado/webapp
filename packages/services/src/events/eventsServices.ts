import { Timestamp } from 'firebase/firestore';

import type DB from '../db';
import type { EventData } from './interface';

interface GetListData {
    storeId: string;
    startDate: Date;
    endDate: Date;
}

interface GetProductListData {
    storeId: string;
    productId: string;
    startDate: Date;
    endDate: Date;
}

export default class EventsServices {
    private static PATH = 'events';

    constructor(private db: DB) { }

    async getVisualizations({ storeId, endDate, startDate }: GetListData) {
        return this.db.getList<EventData>({
            path: EventsServices.PATH,
            pathSegments: [],
            filters: [
                { field: 'name', operator: 'in', value: ['rp_view', 'ldp_view', 'rp_sl', 'ldp_sl'] },
                { field: 'storeId', operator: '==', value: storeId },
                { field: 'createdAt', operator: '>=', value: Timestamp.fromDate(startDate) },
                { field: 'createdAt', operator: '<=', value: Timestamp.fromDate(endDate) },
            ],
        });
    }

    async getImpressions({ storeId, endDate, startDate }: GetListData) {
        return this.db.getList<EventData>({
            path: EventsServices.PATH,
            pathSegments: [],
            filters: [
                { field: 'name', operator: 'in', value: ['ldp_cta', 'original_sl'] },
                { field: 'storeId', operator: '==', value: storeId },
                { field: 'createdAt', operator: '>=', value: Timestamp.fromDate(startDate) },
                { field: 'createdAt', operator: '<=', value: Timestamp.fromDate(endDate) },
            ],
        });
    }

    async getProductVisualizations({ storeId, productId, endDate, startDate }: GetProductListData) {
        return this.db.getList<EventData>({
            path: EventsServices.PATH,
            pathSegments: [],
            filters: [
                { field: 'name', operator: 'in', value: ['rp_view', 'ldp_view', 'rp_sl', 'ldp_sl'] },
                { field: 'storeId', operator: '==', value: storeId },
                { field: 'productId', operator: '==', value: productId },
                { field: 'createdAt', operator: '>=', value: Timestamp.fromDate(startDate) },
                { field: 'createdAt', operator: '<=', value: Timestamp.fromDate(endDate) },
            ],
        });
    }

    async getProductImpressions({ storeId, productId, endDate, startDate }: GetProductListData) {
        return this.db.getList<EventData>({
            path: EventsServices.PATH,
            pathSegments: [],
            filters: [
                { field: 'name', operator: 'in', value: ['ldp_cta', 'original_sl'] },
                { field: 'storeId', operator: '==', value: storeId },
                { field: 'productId', operator: '==', value: productId },
                { field: 'createdAt', operator: '>=', value: Timestamp.fromDate(startDate) },
                { field: 'createdAt', operator: '<=', value: Timestamp.fromDate(endDate) },
            ],
        });
    }
}