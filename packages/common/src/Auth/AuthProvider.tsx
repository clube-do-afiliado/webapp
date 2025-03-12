
import { createContext, useEffect, useMemo, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import { useAlert } from '@cda/ui/components/Alert';

import { getParams } from '@cda/toolkit/url';
import logger from '@cda/toolkit/logger';
import { uuid } from '@cda/toolkit/uuid';

import type { UserData } from '@cda/services/user';
import type UserServices from '@cda/services/user';
import type AuthServices from '@cda/services/auth';

type BasicUser = { name: string; email: string; password: string }

export interface AuthContextConfig {
    user?: UserData;

    logout: () => Promise<void>;

    createByAuth: (data: BasicUser) => Promise<void>;
    createByBackoffice: (data: Pick<UserData, 'name' | 'email' | 'roles'>) => Promise<UserData>;

    loginWithPassword: (data: Pick<BasicUser, 'email' | 'password'>) => Promise<void>;

    confirmPassword: (password: string) => Promise<void>;

    sendMailToResetPassword: (email: string) => Promise<void>;
}

const FIREBASE = {
    'auth/email-already-in-use': 'Email já em uso',
    'auth/user-not-found': 'Email ou senha inválidos',
    'auth/wrong-password': 'Email ou senha inválidos',
    // eslint-disable-next-line max-len
    'auth/too-many-requests': 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.',
};

export const AuthContext = createContext<AuthContextConfig>({
    user: undefined,

    logout: () => Promise.resolve(),

    createByAuth: async () => Promise.resolve(),
    createByBackoffice: async () => Promise.resolve({} as UserData),

    loginWithPassword: async () => Promise.resolve(),

    confirmPassword: async () => Promise.resolve(),

    sendMailToResetPassword: async () => Promise.resolve(),
});

interface AuthProviderProps {
    shouldAuthenticate?: boolean;
    userServices: UserServices;
    authServices: AuthServices;
    children: React.JSX.Element;
    url: { admin: string; sso: string; backoffice: string; store: string; };
}
export default function AuthProvider({
    url,
    shouldAuthenticate = false,
    children,
    authServices,
    userServices,
}: AuthProviderProps) {
    const { addAlert } = useAlert();

    const [user, setUser] = useState<UserData>();

    const context = useMemo<AuthContextConfig>(() => ({
        user,

        logout: async () => logout(),

        loginWithPassword: async (data) => loginWithPassword(data),

        createByAuth: async (data) => createByAuth(data),
        createByBackoffice: async (data) => createByBackoffice(data),

        confirmPassword: async (password) => confirmPassword(password),

        sendMailToResetPassword: async (email) => sendMailToResetPassword(email),
    }), [user]);

    useEffect(() => {
        if (!shouldAuthenticate) { return; }

        getUser();
    }, []);

    const redirectToAdmin = (email: string) => {
        const adminUrl = `${url.admin}?token=${authServices.access_token}&email=${email}`;
        logger.info('Redirecting to admin page:', adminUrl);
        window.open(adminUrl, '_self');
    };

    const redirectToBackoffice = (email: string) => {
        const backofficeUrl = `${url.backoffice}?token=${authServices.access_token}&email=${email}`;
        logger.info('Redirecting to backoffice page:', backofficeUrl);
        window.open(backofficeUrl, '_self');
    };

    const redirect = (user: UserData) => {
        if (user.roles.includes('user')) { return redirectToAdmin(user.email); }
        if (user.roles.includes('admin')) { return redirectToBackoffice(user.email); }
    };

    const logout = () => {
        authServices.logout()
            .then(() => window.open(authServices.url, '_self'));
    };

    const getUser = () => {
        const params = getParams<{ email: string; }>();

        if (window.location.href.includes('error')) { return; }

        const email = params.email || userServices.currentByToken.email;

        return userServices.getByEmail(email)
            .then((user) => { setUser(user as UserData); })
            .catch(() => {
                authServices.logout()
                    .then(() => window.open(authServices.url, '_self'))
                    .then(() => logger.info('Usuário não encontrado'));
            });
    };

    const loginWithPassword = async ({ email, password }: Pick<BasicUser, 'email' | 'password'>) => {
        return authServices.loginWithPassword(email, password)
            .then(() => userServices.getByEmail(email))
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

    const createByAuth = async ({ email, name, password }: BasicUser) => {
        return authServices.createUserWithPassword(email, password, { persist: true })
            .then(user => {
                logger.info('usuário criado no autenticador!', user);
                return user;
            })
            .then(user => userServices.createByAuth({ id: user?.user_id as string, email, name }))
            .then(user => {
                logger.info('usuario criado!', user);
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

    const createByBackoffice = async ({ email, name, roles }: Pick<UserData, 'name' | 'email' | 'roles'>) => {
        return authServices.createUserWithPassword(email, uuid())
            .then(() => authServices.sendMailToResetPassword(email))
            .then(() => userServices.createByBackoffice({ email, name, roles }))
            .then(user => {
                addAlert({
                    color: 'success',
                    message: `Usuário criado! Um email de redefinição de senha foi enviado para: "${email}"`,
                    delay: 8000
                });

                return user;
            });
    };

    const confirmPassword = async (password: string) => {
        return authServices.confirmPasswordReset(password)
            .catch(err => console.error(err));
    };

    const sendMailToResetPassword = async (email: string) => {
        return authServices.sendMailToResetPassword(email)
            .then(() => addAlert({
                color: 'success',
                message: 'Email de redefinição de senha enviado com sucesso',
            }))
            .catch(() => addAlert({
                color: 'error',
                message: 'Erro ao enviar email de redefinição de senha',
            }));
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}