import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import { HomePage } from '@/pages/Home';

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
                path: '*',
                element: <Navigate to='/home' />,
            }
        ],
    }
]);
