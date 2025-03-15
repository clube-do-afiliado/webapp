import type { Permissions } from '../permissions';

export interface Plan {
    id: string;
    name: string;
    price: number;
    color: string;
    description: string;
    permissions: Permissions[];
}