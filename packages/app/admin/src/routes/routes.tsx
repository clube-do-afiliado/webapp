import { createBrowserRouter, Navigate } from 'react-router-dom';

import ProfilePage from '@cda/common/Profile';

import App from '@/App';
import { BioPage } from '@/pages/Bio';
import { HomePage } from '@/pages/Home';
import { SitePage } from '@/pages/Site';
import { StoresPage } from '@/pages/Stores';
import { ProductsPage } from '@/pages/Products';
import { TemplatePage } from '@/pages/Templates';
import { storage, userServices } from '@/services/core';

export const router = createBrowserRouter([
    {
        path: '',
        element: (
            <App />
        ),
        children: [
            {
                path: '/',
                element: <Navigate to='/home' />,
            },
            {
                path: 'home',
                loader: () => document.title = 'Clube do afiliado - Home',
                element: (
                    <HomePage />
                ),
            },
            {
                path: 'site',
                loader: () => document.title = 'Clube do afiliado - Site',
                element: (
                    <SitePage />
                ),
            },
            {
                path: 'stores',
                loader: () => document.title = 'Clube do afiliado - Kojas',
                element: (
                    <StoresPage />
                ),
            },
            {
                path: 'products',
                loader: () => document.title = 'Clube do afiliado - Produtos',
                element: (
                    <ProductsPage />
                ),
            },
            {
                path: 'templates',
                loader: () => document.title = 'Clube do afiliado - Template',
                element: (
                    <TemplatePage />
                ),
            },
            {
                path: 'bio',
                loader: () => document.title = 'Clube do afiliado - Bio',
                element: (
                    <BioPage />
                ),
            },
            {
                path: '/profile',
                loader: () => document.title = 'Clube do afiliado - Meu perfil',
                element: (
                    <ProfilePage
                        storage={storage}
                        onUpdateUser={(user) => userServices.update(user)}
                    />
                ),
            },
            {
                path: '*',
                element: <Navigate to='/home' />,
            }
        ],
    }
]);
