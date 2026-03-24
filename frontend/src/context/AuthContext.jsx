import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('learnx_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('learnx_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('learnx_user');
        }
    }, [user]);

    // ── User Login ──
    const login = async (email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            if (email && password) {
                const mockUser = {
                    id: 'usr_' + Math.random().toString(36).substr(2, 9),
                    name: 'Student User',
                    email: email,
                    initials: email.substring(0, 2).toUpperCase(),
                    role: 'user',
                    department: 'Computer Science',
                    joined: 'Joined Today'
                };
                setUser(mockUser);
                return mockUser;
            }
            throw new Error('Invalid email or password');
        } catch (err) {
            toast.error(err.message);
            throw err;
        }
    };

    // ── Admin Login (separate mock credentials) ──
    const loginAdmin = async (email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (email === 'admin@learnx.com' && password === 'admin123') {
                const mockAdmin = {
                    id: 'adm_master_001',
                    name: 'System Administrator',
                    email: email,
                    initials: 'SA',
                    role: 'admin',
                    token: 'mock-jwt-admin-token-987xyz',
                    lastLogin: new Date().toISOString()
                };
                setUser(mockAdmin);
                return mockAdmin;
            }
            throw new Error('Invalid admin credentials');
        } catch (err) {
            toast.error(err.message);
            throw err;
        }
    };

    // ── Register ──
    const register = async (fullName, email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (fullName && email && password) {
                const mockUser = {
                    id: 'usr_' + Math.random().toString(36).substr(2, 9),
                    name: fullName,
                    email: email,
                    initials: fullName.substring(0, 2).toUpperCase(),
                    role: 'user',
                    department: 'Engineering',
                    joined: 'Joined Today'
                };
                setUser(mockUser);
                return mockUser;
            }
            throw new Error('Please fill in all fields correctly');
        } catch (err) {
            toast.error(err.message);
            throw err;
        }
    };

    // ── Logout ──
    const logout = () => {
        const wasAdmin = user?.role === 'admin';
        setUser(null);
        toast.success(wasAdmin ? 'Admin logged out securely.' : 'Logged out successfully');
    };

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, setUser, login, loginAdmin, register, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
