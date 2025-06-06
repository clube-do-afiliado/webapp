import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import Signin from '@/pages/Signin';
import Signup from '@/pages/Signup';
import CreatePassword from '@/pages/CreatePassword';

export const router = createBrowserRouter([
    {
        path: '',
        element: (
            <App />
        ),
        children: [
            {
                path: '/',
                element: <Navigate to='/signin' />,
            },
            {
                path: '/signin',
                loader: () => document.title = 'Clube do afiliado - Login',
                element: <Signin />,
            },
            {
                path: '/signup',
                loader: () => document.title = 'Clube do afiliado - Criar conta',
                element: <Signup />,
            },
            {
                path: '*',
                element: <Navigate to='/signin' />,
            }
        ]
    },
]);
