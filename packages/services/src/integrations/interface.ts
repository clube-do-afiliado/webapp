import type { Permissions } from '../permissions';

export interface Integration {
    id: string;
    name: string;
    plan: string;
    image: string;
    permissions: Permissions[];
}