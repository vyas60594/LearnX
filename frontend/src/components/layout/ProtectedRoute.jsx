import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requiredRole }) => {
    const { user } = useAuth();

    // Not logged in → redirect to appropriate login page
    if (!user) {
        if (requiredRole === 'admin') {
            return <Navigate to="/admin/login" replace />;
        }
        return <Navigate to="/login" replace />;
    }

    // Logged in but wrong role → redirect to their own dashboard
    if (requiredRole && user.role !== requiredRole) {
        if (user.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
