import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { useAlert } from '@cda/ui/components/Alert';

import type RolesServices from '@cda/services/roles';
import type { RoleConfig } from '@cda/services/roles';

export interface RolesContextConfig {
    loading: boolean;

    roles: RoleConfig[];

    getRoles: () => Promise<void>;

    deleteRole: (id: string) => Promise<void>;

    createRole: (data: Omit<RoleConfig, 'id'>) => Promise<void>;

    updateRole: (data: RoleConfig) => Promise<void>;
}

export const RolesContext = createContext<RolesContextConfig>({
    loading: false,

    roles: [],

    getRoles: () => Promise.resolve(),

    deleteRole: () => Promise.resolve(),

    createRole: () => Promise.resolve(),

    updateRole: () => Promise.resolve(),
});

export default function RolesProvider({ children, rolesServices }: PropsWithChildren<{
    rolesServices: RolesServices;
}>) {
    const { addAlert } = useAlert();

    const [roles, setRoles] = useState<RoleConfig[]>([]);
    const [loading, setLoading] = useState(true);

    const context = useMemo<RolesContextConfig>(() => ({
        loading,

        roles,

        getRoles: () => getRoles(),

        deleteRole: (id) => deleteRole(id),

        createRole: (data) => createRole(data),

        updateRole: (data) => updateRole(data),
    }), [roles]);

    const createRole = async (data: Omit<RoleConfig, 'id'>) => {
        return rolesServices.create(data)
            .then(res => setRoles((prev) => ([...prev, res])))
            .then(() => addAlert({ color: 'success', message: `A role "${data.name}" foi adicionada` }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível criar a role' }));
    };

    const getRoles = async () => {
        return rolesServices.list()
            .then(r => setRoles(r))
            .finally(() => setLoading(false));
    };

    const deleteRole = async (id: string) => {
        return rolesServices.delete(id)
            .then(() => setRoles(prev => prev.filter(r => r.id !== id)))
            .then(() => addAlert({ color: 'success', message: 'Role deletada com sucesso' }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível deletar a role' }));
    };

    const updateRole = async (data: RoleConfig) => {
        return rolesServices.update(data)
            .then(() => setRoles(prev => prev.map(r => r.id === data.id ? data : r)))
            .then(() => addAlert({ color: 'success', message: `A role "${data.name}" foi editada` }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível editar a role' }));
    };

    return (
        <RolesContext.Provider value={context}>
            {children}
        </RolesContext.Provider>
    );
}