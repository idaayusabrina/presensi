import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import DashUser from '../pages/DashUser';
import DataKelas from '../pages/dataKelas';
import PermintaanIzin from '../pages/permintaanIzin';
import History from '../pages/History';
import SiswaPage from '../pages/SiswaPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
       
    {
        path: '/datakelas',
        element: <DataKelas />,
    },
    {
        path: '/siswa',
        element: <SiswaPage />,
    },
    {
        path: '/permintaanIzin',
        element: <PermintaanIzin />,
    },    
    {
        path: '/dashuser',
        element: <DashUser />,
    },
    {
        path: '/history',
        element: <History />,
    }
]);

export default router;
