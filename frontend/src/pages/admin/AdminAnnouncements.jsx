import React, { useState } from 'react';
import { ANNOUNCEMENTS as INITIAL_DATA } from '../../data/dashboardData';

const AdminAnnouncements = () => {
    const [announcements, setAnnouncements] = useState(INITIAL_DATA);
    const [isCreating, setIsCreating] = useState(false);
    
    // New Form State
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newType, setNewType] = useState('info');

    const handleCreate = (e) => {
        e.preventDefault();
        const newAnn = {
            id: `ann_${Date.now()}`,
            title: newTitle,
            description: newDesc,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            type: newType,
            isNew: true
        };
        setAnnouncements([newAnn, ...announcements]);
        setIsCreating(false);
        setNewTitle('');
        setNewDesc('');
        setNewType('info');
    };

    const handleDelete = (id) => {
        setAnnouncements(announcements.filter(a => a.id !== id));
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Announcements</h1>
                    <p className="text-slate-500 font-medium mt-1">Broadcast important updates to student dashboards.</p>
                </div>
                {!isCreating && (
                    <button 
                        onClick={() => setIsCreating(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        New Broadcast
                    </button>
                )}
            </div>

            {/* Creation Form */}
            {isCreating && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Compose Broadcast</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</label>
                                <input 
                                    required
                                    type="text" 
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="e.g. System Maintenance"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
                                <select 
                                    value={newType}
                                    onChange={(e) => setNewType(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                                >
                                    <option value="info">Information (Blue)</option>
                                    <option value="success">Success / Event (Green)</option>
                                    <option value="warning">Alert / Important (Red)</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message Content</label>
                            <textarea 
                                required
                                rows="3"
                                value={newDesc}
                                onChange={(e) => setNewDesc(e.target.value)}
                                placeholder="Explain the details of the announcement here..."
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                            ></textarea>
                        </div>
                        <div className="flex gap-3 justify-end pt-2">
                            <button 
                                type="button" 
                                onClick={() => setIsCreating(false)}
                                className="px-5 py-2.5 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className="px-6 py-2.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
                            >
                                Publish Broadcast
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Announcement List */}
            <div className="space-y-4">
                {announcements.map((ann) => (
                    <div key={ann.id} className="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                ann.type === 'warning' ? 'bg-rose-100 text-rose-500' : 
                                ann.type === 'success' ? 'bg-emerald-100 text-emerald-500' : 
                                'bg-blue-100 text-blue-500'
                            }`}>
                                {ann.type === 'warning' ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                ) : ann.type === 'success' ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-base font-bold text-slate-900">{ann.title}</h3>
                                    {ann.isNew && <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold tracking-wider">Draft / New</span>}
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-2">{ann.description}</p>
                                <span className="text-xs font-bold text-slate-400">{ann.date}</span>
                            </div>
                        </div>
                        <div className="flex sm:flex-col gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">Edit</button>
                            <button 
                                onClick={() => handleDelete(ann.id)}
                                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                
                {announcements.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                        <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                        <h3 className="text-lg font-bold text-slate-500">No Announcements</h3>
                        <p className="text-slate-400 text-sm mt-1">Create your first broadcast to engage your students.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAnnouncements;
