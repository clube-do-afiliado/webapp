import type { Permissions } from '../permissions';

export interface RoleConfig {
    id: string;
    name: string;
    description: string;
    permissions: Permissions[];
}