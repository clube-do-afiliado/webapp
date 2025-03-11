import { createBrowserRouter, Navigate } from 'react-router-dom';

import { RolesProvider } from '@cda/common/Roles';

import App from '@/App';
import { RolesPage } from '@/pages/Roles';
import { rolesServices } from '@/services/core';
import { UsersProvider, UsersPage } from '@/pages/Users';

export const router = createBrowserRouter([
    {
        path: '',
        element: (
            <App />
        ),
        children: [
            {
                path: '/',
                element: <Navigate to='/users' />,
            },
            {
                path: '/users',
                loader: () => document.title = 'Clube do afiliado - Usuários',
                element: (
                    <UsersProvider>
                        <RolesProvider rolesServices={rolesServices}>
                            <UsersPage />
                        </RolesProvider>
                    </UsersProvider>
                ),
            },
            {
                path: '/roles',
                loader: () => document.title = 'Clube do afiliado - Permissões',
                element: (
                    <RolesProvider rolesServices={rolesServices}>
                        <RolesPage />
                    </RolesProvider>
                ),
            },
            {
                path: '*',
                element: <Navigate to='/users' />,
            }
        ],
    }
]);
