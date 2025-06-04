import { slug } from '@cda/toolkit/string';

import type DB from '../db';
import type { Plan } from './interface';

export default class PlansServices {
    private static PATH = 'plans';

    constructor(private db: DB) { }

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

    async create(plan: Omit<Plan, 'id'>) {
        const id = slug(plan.name);

        const newPlan = { ...plan, id };

        return this.db.setItem<Plan>({
            data: newPlan,
            path: PlansServices.PATH,
            pathSegments: [id],
        }).then(() => newPlan);
    }

    async delete(id: string) {
        return this.db.deleteItem({
            path: PlansServices.PATH,
            pathSegments: [id],
        });
    }

    async update(plan: Plan) {
        return this.db.setItem<Plan>({
            data: plan,
            path: PlansServices.PATH,
            pathSegments: [plan.id],
        }).then(() => plan);
    }
}