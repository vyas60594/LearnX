import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 glass border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary">LearnX</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Login</Link>
                        <button className="bg-navy text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
