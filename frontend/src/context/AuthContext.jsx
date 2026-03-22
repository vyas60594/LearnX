import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Try to load user from local storage on initial render
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

    // Mock Login Function
    const login = async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock validation
                if (email && password) {
                    const mockUser = {
                        id: 'usr_' + Math.random().toString(36).substr(2, 9),
                        name: 'Student User',
                        email: email,
                        initials: email.substring(0, 2).toUpperCase(),
                        role: 'Student',
                        department: 'Computer Science',
                        joined: 'Joined Today'
                    };
                    setUser(mockUser);
                    resolve(mockUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000); // Simulate network delay
        });
    };

    // Mock Register Function
    const register = async (fullName, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (fullName && email && password) {
                    const mockUser = {
                        id: 'usr_' + Math.random().toString(36).substr(2, 9),
                        name: fullName,
                        email: email,
                        initials: fullName.substring(0, 2).toUpperCase(),
                        role: 'Student',
                        department: 'Engineering',
                        joined: 'Joined Today'
                    };
                    setUser(mockUser);
                    resolve(mockUser);
                } else {
                    reject(new Error('Missing fields'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
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
