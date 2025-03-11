import { uuid } from '@cda/toolkit/uuid';
import { decode } from '@cda/toolkit/jwt';
import { Cookies, local } from '@cda/toolkit/dom';

import db from '../db';
import type { UserData, FirebaseUser } from './interface';

export default class UserServices {
    private static PATH = 'users';
    private cookies = new Cookies();

    constructor(private db: db, private urlToRedirect: string) { }

    get currentByToken(): { email: string } {
        try {
            const data = decode<FirebaseUser>(this.cookies.get('access_token'));

            return { email: data.email };
        } catch {
            window.location.href = this.urlToRedirect;
            return { email: '' };
        }
    }

    get current(): UserData {
        const data = local.get<UserData>('user', true);

        return {
            id: data?.id,
            name: data?.name,
            email: data?.email,
            roles: data?.roles,
            status: data?.status,
            picture: data?.picture,
        };
    }

    set current(data: UserData) { local.set('user', data); }

    async list() {
        return this.db.getList<UserData>({
            path: UserServices.PATH,
            pathSegments: [],
            filters: []
        });
    }

    async getByEmail(email: string) {
        return this.db.getItem<UserData>({
            path: UserServices.PATH,
            pathSegments: [],
            filters: [{ field: 'email', operator: '==', value: email }],
        });
    }

    async createByAuth(user: Pick<UserData, 'email' | 'name' | 'id'>) {
        const { email } = user;

        const newUser: UserData = {
            ...user,
            roles: ['user'],
            status: 'active',
            picture: `https://robohash.org/${email}`
        };

        return this.db.setItem<UserData>({
            data: newUser,
            path: UserServices.PATH,
            pathSegments: [user.email],
        }).then(() => newUser);
    }

    async createByBackoffice(user: Pick<UserData, 'name' | 'email' | 'roles'>) {
        const newUser: UserData = {
            ...user,
            id: uuid(),
            picture: '',
            status: 'active',
        };

        return this.db.setItem<UserData>({
            data: newUser,
            path: UserServices.PATH,
            pathSegments: [user.email],
        }).then(() => newUser);
    }

    async delete(email: string) {
        return this.db.deleteItem({
            path: UserServices.PATH,
            pathSegments: [email],
        });
    }

    async update(user: UserData) {
        return this.db.setItem<UserData>({
            data: user,
            path: UserServices.PATH,
            pathSegments: [user.email],
        }).then(() => user);
    }
}