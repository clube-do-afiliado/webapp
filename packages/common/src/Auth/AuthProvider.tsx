
import { createContext, useEffect, useMemo, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import { useAlert } from '@cda/ui/components/Alert';

import logger from '@cda/toolkit/logger';
import { uuid } from '@cda/toolkit/uuid';
import { getParams } from '@cda/toolkit/url';

import type { UserData } from '@cda/services/user';
import type UserServices from '@cda/services/user';
import type AuthServices from '@cda/services/auth';
import type SitesServices from '@cda/services/sites';
import type SignaruteServices from '@cda/services/signatures';

import generateDefaultSite from '../Sites/defaultSite';

type BasicUser = { name: string; email: string; password: string }

export interface AuthContextConfig {
    user?: UserData;

    redirect: (user: UserData) => Promise<void>;

    logout: () => Promise<void>;

    createByAuth: (data: BasicUser) => Promise<void>;
    createByBackoffice: (data: Pick<UserData, 'name' | 'email' | 'roles'>) => Promise<UserData>;

    loginWithGoogle: () => Promise<void>;
    loginWithPassword: (data: Pick<BasicUser, 'email' | 'password'>) => Promise<void>;

    confirmPassword: (password: string) => Promise<void>;

    sendMailToResetPassword: (email: string) => Promise<void>;

    updateAuthenticatedUser: (user: UserData) => Promise<void>;
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

    redirect: () => Promise.resolve(),

    logout: () => Promise.resolve(),

    createByAuth: async () => Promise.resolve(),
    createByBackoffice: async () => Promise.resolve({} as UserData),

    loginWithPassword: async () => Promise.resolve(),
    loginWithGoogle: async () => Promise.resolve(),

    confirmPassword: async () => Promise.resolve(),

    sendMailToResetPassword: async () => Promise.resolve(),

    updateAuthenticatedUser: async () => Promise.resolve(),
});

interface AuthProviderProps {
    authServices: AuthServices;
    usersServices: UserServices;
    sitesServices?: SitesServices;
    signatureServices?: SignaruteServices;
    children: React.JSX.Element;
    url: { admin: string; sso: string; backoffice: string; store: string; };
    onAuthenticate?: (user?: UserData) => void;
}
export default function AuthProvider({
    url,
    children,
    authServices,
    usersServices,
    sitesServices,
    signatureServices,
    onAuthenticate = () => { },
}: AuthProviderProps) {
    const { addAlert } = useAlert();

    const [user, setUser] = useState<UserData>();

    const context = useMemo<AuthContextConfig>(() => ({
        user,

        redirect: async (user) => redirect(user),

        logout: async () => logout(),

        loginWithPassword: async (data) => loginWithPassword(data),
        loginWithGoogle: async () => loginWithGoogle(),

        createByAuth: async (data) => createByAuth(data),
        createByBackoffice: async (data) => createByBackoffice(data),

        confirmPassword: async (password) => confirmPassword(password),

        sendMailToResetPassword: async (email) => sendMailToResetPassword(email),

        updateAuthenticatedUser: async (user) => setUser(user)
    }), [user]);

    useEffect(() => { getUser(); }, []);

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

    const logout = () => { authServices.logout(); };

    const getUser = () => {
        const params = getParams<{ email: string; }>();

        if (window.location.href.includes('error')) { return; }

        const email = params.email || usersServices.currentByToken.email;

        if (!email) {
            onAuthenticate();
            return;
        }

        return usersServices.getByEmail(email)
            .then((user) => {
                setUser(user as UserData);
                return user;
            })
            .then((user) => onAuthenticate(user as UserData))
            .catch(() => {
                authServices.logout()
                    .then(() => onAuthenticate())
                    .then(() => logger.info('Usuário não encontrado'));
            });
    };

    const loginWithPassword = async ({ email, password }: Pick<BasicUser, 'email' | 'password'>) => {
        return authServices.loginWithPassword(email, password)
            .then(() => usersServices.getByEmail(email))
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

    const loginWithGoogle = async () => {
        try {
            if (!sitesServices) { throw new Error('sitesServices is not defined'); }
            if (!signatureServices) { throw new Error('signatureServices is not defined'); }

            const googleUser = await authServices.loginWithGoogle();

            if (!googleUser) { throw new Error('Erro ao autenticar'); }

            logger.info('usuário criado no autenticador!', googleUser);

            const userByEmail = await usersServices.getByEmail(googleUser.email);

            if (userByEmail) {
                redirect(userByEmail as UserData);

                return;
            }

            const createdUser = await usersServices.createByAuth({
                id: googleUser?.user_id as string,
                email: googleUser?.email || '',
                name: ''
            });

            logger.info('usuario criado!', createdUser);

            await sitesServices.create(
                generateDefaultSite(`Loja ${createdUser.name || createdUser.email}`, createdUser.id)
            );

            logger.log('loja criada!');

            await signatureServices.create(createdUser.id);

            logger.log('assinatura criada!');

            redirect(createdUser as UserData);
        } catch (error: any) {
            addAlert({
                color: 'error',
                message: FIREBASE[error?.code] || 'Erro ao fazer login',
                icon: <Icon name="error" />,
            });

            logger.info('Error on login:', { error });
        }
    };

    const createByAuth = async ({ email, name, password }: BasicUser) => {
        try {
            if (!sitesServices) { throw new Error('sitesServices is not defined'); }
            if (!signatureServices) { throw new Error('signaruteServices is not defined'); }

            const firebaseUser = await authServices.createUserWithPassword(email, password, { persist: true });

            logger.info('usuário criado no autenticador!', firebaseUser);

            const user = await usersServices.createByAuth({ id: firebaseUser?.user_id as string, email, name });

            logger.info('usuario criado!', user);

            await sitesServices.create(generateDefaultSite(`Loja ${user.name}`, user.id));

            logger.log('loja criada!');

            await signatureServices.create(user.id);

            logger.log('assinatura criada!');

            redirect(user);
        } catch (error: any) {
            const { code } = error;

            addAlert({
                color: 'error',
                message: FIREBASE[code] || 'Erro ao criar usuário',
                icon: <Icon name="error" />,
            });

            logger.error('Erro ao criar ususario, ', { error });
        }
    };

    const createByBackoffice = async ({ email, name, roles }: Pick<UserData, 'name' | 'email' | 'roles'>) => {
        return authServices.createUserWithPassword(email, uuid())
            .then(() => authServices.sendMailToResetPassword(email))
            .then(() => usersServices.createByBackoffice({ email, name, roles }))
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