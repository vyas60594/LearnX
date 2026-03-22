import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth();

    // If no user is logged in, redirect to the login page immediately.
    // Replace will clear the history stack so they can't go back to the protected route.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render the child routes if authorized
    return <Outlet />;
};

export default ProtectedRoute;
