import React, { useState } from 'react';
import toast from 'react-hot-toast';

// Mock large dataset for datatable demonstration
const MOCK_USERS = Array.from({ length: 45 }).map((_, i) => ({
    id: `usr_${i + 100}`,
    name: [
        'Arjun Kumar', 'Priya Sharma', 'Rahul Verma', 'Sneha Patel', 
        'Anjali Singh', 'Vikram Mehta', 'Neha Gupta', 'Rohan Das'
    ][i % 8] + ` ${i}`,
    email: `student${i}@example.com`,
    role: i % 15 === 0 ? 'Admin' : 'Student',
    status: i % 7 === 0 ? 'Suspended' : 'Active',
    joined: `2026-01-${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}`,
    progress: Math.floor(Math.random() * 100)
}));

const AdminUsers = () => {
    const [users, setUsers] = useState(MOCK_USERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Modals State
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('Student');

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editRole, setEditRole] = useState('');
    const [editStatus, setEditStatus] = useState('');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleInvite = (e) => {
        e.preventDefault();
        // Mock add logic
        const newUser = {
            id: `usr_${Date.now()}`,
            name: inviteEmail.split('@')[0],
            email: inviteEmail,
            role: inviteRole,
            status: 'Active',
            joined: 'Just now',
            progress: 0
        };
        setUsers([newUser, ...users]);
        toast.success(`Invitation sent to ${inviteEmail}`);
        setIsInviteOpen(false);
        setInviteEmail('');
    };

    const handleEditSave = (e) => {
        e.preventDefault();
        setUsers(users.map(u => 
            u.id === editingUser.id ? { ...u, role: editRole, status: editStatus } : u
        ));
        toast.success(`Updated ${editingUser.name}`);
        setIsEditOpen(false);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setEditRole(user.role);
        setEditStatus(user.status);
        setIsEditOpen(true);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">User Management</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage platform members, track progress, and update roles.</p>
                </div>
                <button 
                    onClick={() => setIsInviteOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    Invite User
                </button>
            </div>

            {/* Datatable Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-t-2xl border border-slate-200/60 border-b-0">
                <div className="relative w-full sm:w-80">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                        type="text" 
                        placeholder="Search users by name or email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
            </div>

            {/* Premium Datatable */}
            <div className="bg-white border border-slate-200/60 rounded-b-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200/60">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.slice(0, 10).map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                                                {user.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm">{user.name}</div>
                                                <div className="text-slate-500 text-xs font-medium">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                                            user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-slate-700">{user.role}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-slate-100 rounded-full h-2 w-24">
                                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${user.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-600">{user.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                                        {user.joined}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => openEditModal(user)}
                                            className="text-indigo-600 hover:text-indigo-900 font-bold transition-colors"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500 font-medium">
                                        No users found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-slate-200/60 bg-slate-50 flex items-center justify-between">
                    <span className="text-sm text-slate-500 font-medium">Showing 1 to 10 of {filteredUsers.length} entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Invite User Modal */}
            {isInviteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-black text-slate-800">Invite New User</h3>
                            <p className="text-sm text-slate-500 font-medium">Send an email invitation to join LearnX.</p>
                        </div>
                        <form onSubmit={handleInvite} className="p-6 space-y-4 bg-slate-50/50">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                <input 
                                    required
                                    type="email" 
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="student@university.edu"
                                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assign Role</label>
                                <select 
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                                >
                                    <option value="Student">Student (Default)</option>
                                    <option value="Admin">Administrator</option>
                                </select>
                            </div>
                            <div className="flex gap-3 justify-end pt-4">
                                <button type="button" onClick={() => setIsInviteOpen(false)} className="px-5 py-2.5 rounded-xl font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all">Send Invite</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditOpen && editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-black text-slate-800">Edit User Profile</h3>
                            <p className="text-sm text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Update settings for <strong>{editingUser.name}</strong></p>
                        </div>
                        <form onSubmit={handleEditSave} className="p-6 space-y-4 bg-slate-50/50">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Role</label>
                                <select 
                                    value={editRole}
                                    onChange={(e) => setEditRole(e.target.value)}
                                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                                >
                                    <option value="Student">Student</option>
                                    <option value="Admin">Administrator</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Status</label>
                                <select 
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Suspended">Suspended</option>
                                </select>
                            </div>
                            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mt-2">
                                <p className="text-xs font-bold text-rose-700 uppercase mb-1">Danger Zone</p>
                                <button type="button" className="text-sm font-bold text-rose-600 hover:text-rose-800">Delete Account Permanently...</button>
                            </div>
                            <div className="flex gap-3 justify-end pt-4">
                                <button type="button" onClick={() => setIsEditOpen(false)} className="px-5 py-2.5 rounded-xl font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
