import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

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
    const userRole = user.role?.toLowerCase() || 'user';
    const requiredRoleNorm = requiredRole?.toLowerCase();

    if (requiredRoleNorm && userRole !== requiredRoleNorm) {
        if (userRole === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
