
import { local } from '@cda/toolkit/dom/local';
import type { Cookies } from '@cda/toolkit/dom/cookies';

import Auth, { AuthConfig } from './authServices';

jest.mock('@cda/toolkit/dom/local', () => ({
    local: {
        remove: jest.fn(),
    },
}));

jest.mock('@cda/toolkit/dom/cookies', () => {
    return {
        Cookies: jest.fn().mockImplementation(() => ({
            get: jest.fn(),
            set: jest.fn(),
            remove: jest.fn(),
        })),
    };
});

describe('Auth', () => {
    let auth: Auth;
    let cookiesMock: jest.Mocked<Cookies<any>>;
    const mockAuthMethods: AuthConfig = {
        signOut: jest.fn(),
        googleAuth: jest.fn(),
        signInWithPassword: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
    };

    beforeEach(() => {
        auth = new Auth(mockAuthMethods, '');
        cookiesMock = auth['cookies'] as jest.Mocked<Cookies<any>>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set access_token in cookies', () => {
        auth.access_token = 'it_token';
        expect(cookiesMock.set).toHaveBeenCalledWith('access_token', 'it_token');
    });

    it('should get access_token from cookies', () => {
        cookiesMock.get.mockReturnValue('it_token');
        expect(auth.access_token).toBe('it_token');
        expect(cookiesMock.get).toHaveBeenCalledWith('access_token');
    });

    it('should call googleAuth and set access_token on login', async () => {
        mockAuthMethods.googleAuth = jest.fn().mockResolvedValue({ user: { accessToken: 'mock_token' } });

        await auth.login();

        expect(mockAuthMethods.googleAuth).toHaveBeenCalled();
        expect(cookiesMock.set).toHaveBeenCalledWith('access_token', 'mock_token');
    });

    it('should call signout, remove access_token, and call redirect on logout', async () => {
        const mockRedirect = jest.fn();
        mockAuthMethods.signOut = jest.fn().mockResolvedValue(undefined);

        await auth.logout(mockRedirect);

        expect(mockAuthMethods.signOut).toHaveBeenCalled();
        expect(local.remove).toHaveBeenCalledWith('user');
        expect(cookiesMock.remove).toHaveBeenCalledWith('access_token');
        expect(mockRedirect).toHaveBeenCalled();
    });
});