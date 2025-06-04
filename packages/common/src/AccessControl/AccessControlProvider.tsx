import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { flatten, removeDuplicate } from '@cda/toolkit/array';

import { UserData } from '@cda/services/user';
import type RolesServices from '@cda/services/roles';
import type PlansServices from '@cda/services/plans';
import { Permissions } from '@cda/services/permissions';

export interface AccessControlContextConfig {
    permissions: Permissions[];
}

export const AccessControlContext = createContext<AccessControlContextConfig>({
    permissions: []
});

interface AccessControlProps { user?: UserData; rolesServices: RolesServices; plansServices: PlansServices; }
export default function AccessControlProvider({
    children,
    user,
    rolesServices,
    plansServices
}: PropsWithChildren<AccessControlProps>) {
    const [permissions, setPermissions] = useState<Permissions[]>([]);

    const context = useMemo<AccessControlContextConfig>(() => ({
        permissions
    }), [permissions]);

    useEffect(() => {
        if (!user) { return; }

        getPermissions();
    }, [user]);

    const getPermissions = async () => {
        if (!user) { return; }

        return Promise.all([
            ...user.roles.map(role => rolesServices.details(role)),
            ...(user.plans ? user.plans.map(plan => plansServices.details(plan)) : [])
        ]).then(res => {
            return setPermissions(prev => ([
                ...prev,
                ...removeDuplicate(
                    flatten(
                        res.map(r => r?.permissions)
                    )
                )
            ]));
        });
    };

    return (
        <AccessControlContext.Provider value={context}>
            {children}
        </AccessControlContext.Provider>
    );
}