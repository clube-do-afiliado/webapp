import type { Permission } from '../permissions';

export interface RoleConfig {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
}