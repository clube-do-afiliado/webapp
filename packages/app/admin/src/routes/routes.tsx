import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import { BioPage } from '@/pages/Bio';
import { HomePage } from '@/pages/Home';
import { StoresPage } from '@/pages/Stores';
import { ProductsPage } from '@/pages/Products';
import { TemplatePage } from '@/pages/Templates';
import { SitePage, SiteDetailsPage } from '@/pages/Site';

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
                children: [
                    {
                        path: ':slug',
                        loader: () => document.title = 'Clube do afiliado - Site',
                        element: (
                            <SiteDetailsPage />
                        ),
                    },
                ]
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
                path: '*',
                element: <Navigate to='/home' />,
            }
        ],
    }
]);
