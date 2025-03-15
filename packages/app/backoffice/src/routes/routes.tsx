import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import { RolesPage } from '@/pages/Roles';
import { PlansPage } from '@/pages/Plans';
import { UsersPage } from '@/pages/Users';
import { IntegrationsPage } from '@/pages/Integrations';

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
                    <UsersPage />
                ),
            },
            {
                path: '/roles',
                loader: () => document.title = 'Clube do afiliado - Permissões',
                element: (
                    <RolesPage />
                ),
            },
            {
                path: '/plans',
                loader: () => document.title = 'Clube do afiliado - Planos',
                element: (
                    <PlansPage />
                ),
            },
            {
                path: '/integrations',
                loader: () => document.title = 'Clube do afiliado - Integrações',
                element: (
                    <IntegrationsPage />
                ),
            },
            {
                path: '*',
                element: <Navigate to='/users' />,
            }
        ],
    }
]);
