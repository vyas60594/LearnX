import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/api';

export const AuthContext = createContext(null);


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
            localStorage.removeItem('learnx_token');
        }
    }, [user]);

    // ── Check if user is already logged in ──
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('learnx_token');
            if (token) {
                try {
                    const response = await authService.verify();
                    const userData = {
                        ...response,
                        initials: (response.username || 'U').substring(0, 2).toUpperCase(),
                        name: response.username,
                        role: response.role || 'user',
                        joined: 'Member'
                    };
                    setUser(userData);
                } catch (err) {
                    console.error('Session verification failed', err);
                    setUser(null);
                }
            }
        };
        checkAuth();
    }, []);

    // ── User Login ──
    const login = async (email, password) => {
        try {
            const response = await authService.login({ email, password });

            const userData = {
                ...response.user,
                initials: response.user.username.substring(0, 2).toUpperCase(),
                name: response.user.username,
                role: (email === 'admin@learnx.com') ? 'admin' : (response.user.role || 'user'),
                joined: 'Member'
            };

            localStorage.setItem('learnx_token', response.token);
            setUser(userData);
            return userData;
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'Login failed';
            toast.error(errorMessage);
            throw new Error(errorMessage);
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

                // IMPORTANT: Save the token so the API interceptor can find it!
                localStorage.setItem('learnx_token', mockAdmin.token);
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
            const response = await authService.register({ username: fullName, email, password });

            const userData = {
                ...response.user,
                initials: response.user.username.substring(0, 2).toUpperCase(),
                name: response.user.username,
                role: response.user.role || 'user',
                joined: 'New Member'
            };

            localStorage.setItem('learnx_token', response.token);
            setUser(userData);
            return userData;
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'Registration failed';
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // ── Logout ──
    const logout = () => {
        const wasAdmin = user?.role?.toLowerCase() === 'admin';
        setUser(null);
        toast.success(wasAdmin ? 'Admin logged out securely.' : 'Logged out successfully');
    };

    const isAdmin = user?.role?.toLowerCase() === 'admin';

    return (
        <AuthContext.Provider value={{ user, setUser, login, loginAdmin, register, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
