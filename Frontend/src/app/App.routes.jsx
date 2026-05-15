import { createBrowserRouter } from 'react-router';
import Login from '../features/auth/pages/login';
export const router = createBrowserRouter([
    {
        path: '/',
        element:<Login/>
    }
])