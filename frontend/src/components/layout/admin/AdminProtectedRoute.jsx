import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAdminAuth } from '../../../context/AdminAuthContext';

const AdminProtectedRoute = () => {
    const { admin } = useAdminAuth();

    if (!admin) {
        // Redirect unauthorized attempts directly to the admin login portal
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
