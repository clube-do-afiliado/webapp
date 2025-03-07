import { decode } from '@cda/toolkit/jwt';
import { Cookies, local } from '@cda/toolkit/dom';

import db from '../db';
import type { UserData } from './interface';

export default class UserServices {
    private static PATH = 'users';
    private cookies = new Cookies();

    constructor(private db: db, private urlToRedirect: string) { }

    get currentByToken() {
        try {
            const data = decode<UserData>(this.cookies.get('access_token'));

            return {
                name: data.name,
                email: data.email,
                picture: data.picture,
                user_id: data.user_id,
            };
        } catch {
            window.location.href = this.urlToRedirect;
            return { name: '', email: '', picture: '', user_id: '' };
        }
    }

    get current(): UserData {
        const data = local.get<UserData>('user', true);

        return {
            name: data?.name,
            email: data?.email,
            picture: data?.picture,
            user_id: data?.user_id,
        };
    }

    set current(data: UserData) { local.set('user', data); }

    async list() {
        return this.db.getItem<UserData>({
            path: UserServices.PATH,
            pathSegments: [],
            filters: [],
        });
    }

    async getUserByEmail(email: string) {
        return this.db.getItem<UserData>({
            path: UserServices.PATH,
            pathSegments: [],
            filters: [{ field: 'email', operator: '==', value: email }],
        });
    }

    async createUser(user: UserData) {
        return this.db.setItem<UserData>({
            data: user,
            path: UserServices.PATH,
            pathSegments: [this.currentByToken.email],
        }).then(() => user);
    }
}