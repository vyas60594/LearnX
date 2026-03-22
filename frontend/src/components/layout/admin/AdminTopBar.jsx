import React from 'react';
import { useAdminAuth } from '../../../context/AdminAuthContext';

const AdminTopBar = ({ onMenuClick }) => {
    const { admin } = useAdminAuth();

    return (
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/60 bg-white px-6">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                
                {/* Admin Quick Search */}
                <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2 w-72 transition-colors border border-transparent focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
                    <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input type="text" placeholder="Search users, courses..." className="bg-transparent border-none focus:outline-none text-sm font-medium text-slate-800 placeholder:text-slate-400 w-full" />
                </div>
            </div>

            {/* Admin Profile Details */}
            <div className="flex items-center gap-4">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors relative">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-100"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-sm font-extrabold text-slate-900">{admin?.name || 'Admin'}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">{admin?.role || 'Superuser'}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-md">
                        {admin?.name ? admin.name.substring(0, 2).toUpperCase() : 'AD'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminTopBar;
