
import { createContext, useMemo } from 'react';

import { useAlert } from '@cda/ui/components/Alert';
import Icon from '@cda/ui/components/Icon';

import logger from '@cda/toolkit/logger';

import type { UserData } from '@cda/services/user';

import { authServices, userServices, url } from '@/services/core';

type BasicUser = { name: string; email: string; password: string }

interface AuthContextConfig {
    createUser: (data: BasicUser) => Promise<void>;
    loginWithPassword: (data: Pick<BasicUser, 'email' | 'password'>) => Promise<void>;
}

const FIREBASE = {
    'auth/email-already-in-use': 'Email já em uso',
    'auth/user-not-found': 'Email ou senha inválidos',
    'auth/wrong-password': 'Email ou senha inválidos',
    // eslint-disable-next-line max-len
    'auth/too-many-requests': 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.',
};

export const AuthContext = createContext<AuthContextConfig>({
    createUser: async () => Promise.resolve(),
    loginWithPassword: async () => Promise.resolve(),
});

interface AuthProviderProps { children: React.JSX.Element; }
export default function AuthProvider({ children }: AuthProviderProps) {
    const { addAlert } = useAlert();

    const context = useMemo<AuthContextConfig>(() => ({
        loginWithPassword: async (data) => loginWithPassword(data),
        createUser: async (data) => createUser(data),
    }), []);

    const redirectToAdmin = (email: string) => {
        const adminUrl = `${url.admin}?token=${authServices.access_token}&email=${email}`;
        logger.info('Redirecting to admin page:', adminUrl);
        window.open(adminUrl, '_self');
    };

    const redirect = (user: UserData) => {
        // redirectToAdmin(user.email);
    };

    const loginWithPassword = async ({ email, password }: Pick<BasicUser, 'email' | 'password'>) => {
        console.log('loginWithPassword');

        return authServices.loginWithPassword(email, password)
            .then(() => userServices.getUserByEmail(email))
            .then(user => { redirect(user as UserData); })
            .catch((e) => {
                const { code } = e;

                addAlert({
                    color: 'error',
                    message: FIREBASE[code] || 'Erro ao fazer login',
                    icon: <Icon name="error" />,
                });

                logger.info('Error on login:', { e });
            });
    };

    const createUser = async ({ email, name, password }: BasicUser) => {
        authServices.createUserWithPassword(email, password)
            .then(user => {
                logger.info('usuario criado no autenticador!', user);
                return user;
            })
            .then(user => userServices.createUser({
                ...user,
                ...{ name },
                ...{ picture: `https://robohash.org/${email}` }
            }))
            .then(user => {
                logger.info('usuario criado no firestore!', user);
                return user;
            })
            .then((user) => redirect(user))
            .catch((e) => {
                const { code } = e;

                addAlert({
                    color: 'error',
                    message: FIREBASE[code] || 'Erro ao criar usuário',
                    icon: <Icon name="error" />,
                });

                logger.error('Erro ao criar ususario, ', { e });
            });
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}