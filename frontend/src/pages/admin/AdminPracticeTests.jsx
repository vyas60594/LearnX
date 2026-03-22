import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// Mock Data
const MOCK_TESTS = [
    { id: 'pt_1', title: 'React Core Concepts Assessment', type: 'Subject Mock', questions: 25, duration: '30 mins', attempts: 1420 },
    { id: 'pt_2', title: 'Fullstack Interview Preparation', type: 'Full Mock', questions: 50, duration: '60 mins', attempts: 850 },
    { id: 'pt_3', title: 'JavaScript Advanced Patterns', type: 'Subject Mock', questions: 15, duration: '20 mins', attempts: 2100 },
];

const AdminPracticeTests = () => {
    const navigate = useNavigate();
    const [tests, setTests] = useState(MOCK_TESTS);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newType, setNewType] = useState('Subject Mock');
    const [newDuration, setNewDuration] = useState('30 mins');

    const handleCreate = (e) => {
        e.preventDefault();
        const newTest = {
            id: `pt_${Date.now()}`,
            title: newTitle,
            type: newType,
            questions: 0,
            duration: newDuration,
            attempts: 0
        };
        setTests([newTest, ...tests]);
        setIsCreateOpen(false);
        setNewTitle('');
        setNewDuration('30 mins');
        toast.success(`Practice Test "${newTitle}" created successfully!`);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Practice Tests</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage mock exams, assessment questionnaires, and performance metrics.</p>
                </div>
                <button 
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    Create New Test
                </button>
            </div>

            {/* List View */}
            <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative w-full sm:w-80">
                        <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input type="text" placeholder="Search tests..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200/60">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Test Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Questions</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Attempts</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {tests.map((test) => (
                                <tr key={test.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{test.title}</div>
                                        <div className="text-slate-400 text-xs font-medium">ID: {test.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                                            {test.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 font-bold text-sm">
                                        {test.questions} Qs
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium text-sm">
                                        {test.duration}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 font-medium text-sm">
                                        {test.attempts.toLocaleString()} takes
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => navigate(`/admin/practice-tests/${test.id}`)}
                                            className="text-emerald-600 hover:text-emerald-900 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            Edit Questions
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Test Modal */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-black text-slate-800">Create Practice Test</h3>
                            <p className="text-sm text-slate-500 font-medium">Initialize a new mock exam or assessment.</p>
                        </div>
                        <form onSubmit={handleCreate} className="p-6 space-y-4 bg-slate-50/50">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Test Title</label>
                                <input 
                                    required
                                    type="text" 
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="e.g. JavaScript Final Exam"
                                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
                                    <select 
                                        value={newType}
                                        onChange={(e) => setNewType(e.target.value)}
                                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                                    >
                                        <option value="Subject Mock">Subject Mock</option>
                                        <option value="Full Mock">Full Mock</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={newDuration}
                                        onChange={(e) => setNewDuration(e.target.value)}
                                        placeholder="e.g. 60 mins"
                                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end pt-4">
                                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-5 py-2.5 rounded-xl font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all">Create Test</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPracticeTests;
