import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
    // Separate localStorage key to prevent token mixing with student users
    const [admin, setAdmin] = useState(() => {
        const savedAuth = localStorage.getItem('learnx_admin_auth');
        return savedAuth ? JSON.parse(savedAuth) : null;
    });

    useEffect(() => {
        if (admin) {
            localStorage.setItem('learnx_admin_auth', JSON.stringify(admin));
        } else {
            localStorage.removeItem('learnx_admin_auth');
        }
    }, [admin]);

    const loginAdmin = async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock robust admin authentication (only accept mock valid admin)
                if (email === 'admin@learnx.com' && password === 'admin123') {
                    const mockAdmin = {
                        id: 'adm_master_001',
                        name: 'System Administrator',
                        email: email,
                        role: 'superadmin',
                        token: 'mock-jwt-admin-token-987xyz',
                        lastLogin: new Date().toISOString()
                    };
                    setAdmin(mockAdmin);
                    resolve(mockAdmin);
                } else {
                    reject(new Error('Invalid admin credentials'));
                }
            }, 1200);
        });
    };

    const logoutAdmin = () => {
        setAdmin(null);
        toast.success('Admin logged out securely.');
    };

    return (
        <AdminAuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
};
