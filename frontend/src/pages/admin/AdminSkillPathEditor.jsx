import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const mockPathData = {
    title: "Frontend Developer",
    status: "Published",
    modules: [
        { id: 1, title: 'HTML & CSS Fundamentals', lessons: 5 },
        { id: 2, title: 'JavaScript Basics', lessons: 8 },
        { id: 3, title: 'React Core Concepts', lessons: 12 },
    ]
};

const AdminSkillPathEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // In a real app we'd fetch the path data based on the ID.
    const [path, setPath] = useState(mockPathData);
    const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState('');

    const handleAddModule = (e) => {
        e.preventDefault();
        const newModule = {
            id: Date.now(),
            title: newModuleTitle,
            lessons: 0
        };
        setPath({ ...path, modules: [...path.modules, newModule] });
        toast.success(`Module "${newModuleTitle}" added`);
        setNewModuleTitle('');
        setIsAddModuleOpen(false);
    };

    const handleDeleteModule = (moduleId) => {
        setPath({ ...path, modules: path.modules.filter(m => m.id !== moduleId) });
        toast.success('Module removed');
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header & Breadcrumbs */}
            <div>
                <button onClick={() => navigate('/admin/skill-paths')} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1 mb-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Skill Paths
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{path.title}</h1>
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${path.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {path.status}
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium mt-1">Editing path ID: {id}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all">
                            Path Settings
                        </button>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                            Save Draft
                        </button>
                    </div>
                </div>
            </div>

            {/* Curriculum Builder */}
            <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        Curriculum Modules
                    </h2>
                    <button 
                        onClick={() => setIsAddModuleOpen(true)}
                        className="text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        Add Module
                    </button>
                </div>

                <div className="space-y-3">
                    {path.modules.map((module, index) => (
                        <div key={module.id} className="group flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-indigo-500/30 hover:bg-slate-50/50 transition-all">
                            <div className="flex flex-col items-center justify-center text-slate-300 group-hover:text-indigo-300">
                                <svg className="w-5 h-5 mb-1 cursor-grab active:cursor-grabbing" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" /></svg>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs">
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800">{module.title}</h3>
                                <p className="text-xs text-slate-500 font-medium">{module.lessons} Lessons inside</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </button>
                                <button 
                                    onClick={() => handleDeleteModule(module.id)}
                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                    {path.modules.length === 0 && (
                        <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl">
                            <p className="text-slate-500 font-medium">This Skill Path is currently empty.</p>
                            <button onClick={() => setIsAddModuleOpen(true)} className="mt-2 text-indigo-600 font-bold hover:underline">Add the first module</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Module Modal */}
            {isAddModuleOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-black text-slate-800">Add New Module</h3>
                        </div>
                        <form onSubmit={handleAddModule} className="p-6 space-y-4 bg-slate-50/50">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Module Title</label>
                                <input 
                                    required
                                    type="text" 
                                    value={newModuleTitle}
                                    onChange={(e) => setNewModuleTitle(e.target.value)}
                                    placeholder="e.g. Advanced State Management"
                                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                            </div>
                            <div className="flex gap-3 justify-end pt-4">
                                <button type="button" onClick={() => setIsAddModuleOpen(false)} className="px-5 py-2.5 rounded-xl font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all">Add Module</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSkillPathEditor;
