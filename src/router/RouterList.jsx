import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import DashUser from '../pages/DashUser';
import Users from '../pages/User';
import DataKelas from '../pages/dataKelas';
import DataGuru from '../pages/guru';
import PermintaanIzin from '../pages/permintaanIzin';
import History from '../pages/History';
import SiswaPage from '../pages/SiswaPage';
import Profil from '../pages/Profil';

const AuthRoute = ({ children, guruOnly }) => {
    const token = localStorage.getItem('token');
    const guru = localStorage.getItem('guru') === 'true';

    if (!token) {
        return <Navigate to="/login" />;
    }

    // If route is for guru only, redirect non-guru users to dashuser
    if (guruOnly && !guru) {
        return <Navigate to="/dashuser" />;
    }

    // Allow access to the route if it’s unrestricted or user is a guru
    return children;
};

const RedirectToLogin = () => {
    const token = localStorage.getItem('token');
    const guru = localStorage.getItem('guru') === 'true';

    if (!token) {
        return <Navigate to="/login" />;
    }

    return guru ? <Navigate to="/dashboard" /> : <Navigate to="/dashuser" />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <RedirectToLogin />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: (
            <AuthRoute guruOnly={true}>
                <Dashboard />
            </AuthRoute>
        ),
    },
    {
        path: '/datakelas',
        element: (
            <AuthRoute guruOnly={true}>
                <DataKelas />
            </AuthRoute>
        ),
    },
    {
        path: '/siswa',
        element: (
            <AuthRoute guruOnly={true}>
                <SiswaPage />
            </AuthRoute>
        ),
    },
    {
        path: '/permintaanIzin',
        element: (
            <AuthRoute guruOnly={true}>
                <PermintaanIzin />
            </AuthRoute>
        ),
    },
    {
        path: '/dashuser',
        element: (
            <AuthRoute>
                <DashUser />
            </AuthRoute>
        ),
    },
    {
        path: '/history',
        element: (
            <AuthRoute>
                <History />
            </AuthRoute>
        ),
    },
    {
        path: '/profil',
        element: (
            <AuthRoute>
                <Profil />
            </AuthRoute>
        ),
    },
    {
        path: '/user',
        element: (
            <AuthRoute guruOnly={true}>
                <Users />
            </AuthRoute>
        ),
    },
    {
        path: '/guru',
        element: (
            <AuthRoute guruOnly={true}>
                <DataGuru />
            </AuthRoute>
        ),
    }
]);

export default router;
