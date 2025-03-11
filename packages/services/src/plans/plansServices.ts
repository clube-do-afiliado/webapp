import db from '../db';
import type { Plan } from './interface';

export default class PlansServices {
    private static PATH = 'plans';

    constructor(private db: db) { }

    async list() {
        return this.db.getList<Plan>({
            path: PlansServices.PATH,
            pathSegments: [],
            filters: [],
        });
    }

    async details(id: string) {
        return this.db.getItem<Plan>({
            path: PlansServices.PATH,
            pathSegments: [],
            filters: [{ field: 'id', operator: '==', value: id }],
        });
    }
}