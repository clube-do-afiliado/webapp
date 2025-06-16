import { Timestamp } from 'firebase/firestore';

import { uuid } from '@cda/toolkit/uuid';
import { addDays } from '@cda/toolkit/date';

import type DB from '../db';
import type { Signature } from './interface';

export default class SignatureServices {
    private static PATH = 'signatures';

    constructor(private db: DB) { }

    async details(userId: string) {
        return this.db.getItem<Signature>({
            path: SignatureServices.PATH,
            pathSegments: [],
            filters: [
                { field: 'ownerId', operator: '==', value: userId },
            ],
        });
    }

    async create(userId: string) {
        const id = uuid();

        const newSignature: Signature = {
            id,
            ownerId: userId,
            status: 'inactive',
            updatedAt: Timestamp.fromDate(new Date()),
            expiresIn: Timestamp.fromDate(addDays(new Date(), 15)),
        };

        return this.db.setItem<Signature>({
            data: newSignature,
            path: SignatureServices.PATH,
            pathSegments: [id]
        });
    }

    async update(data: Signature) {
        return this.db.setItem<Signature>({
            data: data,
            path: SignatureServices.PATH,
            pathSegments: [data.id],
        }).then(() => data);
    }
}