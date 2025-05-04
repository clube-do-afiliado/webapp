import { createContext, PropsWithChildren, useMemo } from 'react';

import { useAlert } from '@cda/ui/components/Alert';

import type { UserData } from '@cda/services/user';
import UserServices from '@cda/services/user';

export interface UserProviderConfig {
    updateUser: (user: UserData) => Promise<void>;
}

export const UserContext = createContext<UserProviderConfig>({
    updateUser: () => Promise.resolve(),
});

export default function UserProvider({ userServices, children }: PropsWithChildren<{
    userServices: UserServices
}>) {
    const { addAlert } = useAlert();

    const context = useMemo<UserProviderConfig>(() => ({
        updateUser: (user) => updateUser(user)
    }), []);

    const updateUser = async (user: UserData) => {
        return userServices.update(user)
            .then(() => addAlert({
                color: 'success',
                message: 'Usuário atualizado',
            }));
    };

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
}