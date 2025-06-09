import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import App from '@/App';

const BioPage = lazy(() => import('@/pages/Bio'));
const HomePage = lazy(() => import('@/pages/Home'));
const SitePage = lazy(() => import('@/pages/Site'));
const PlansPage = lazy(() => import('@/pages/Plans'));
const StoresPage = lazy(() => import('@/pages/Stores'));
const ProfilePage = lazy(() => import('@/pages/Profile'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const TemplatesPage = lazy(() => import('@/pages/Templates'));

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
                path: 'plans',
                loader: () => document.title = 'Clube do afiliado - Planos',
                element: (
                    <PlansPage />
                ),
            },
            {
                path: 'templates',
                loader: () => document.title = 'Clube do afiliado - Template',
                element: (
                    <TemplatesPage />
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
                    <ProfilePage />
                ),
            },
            {
                path: '*',
                element: <Navigate to='/home' />,
            }
        ],
    }
]);
