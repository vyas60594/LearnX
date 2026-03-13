import { useState } from 'react';
import { useNavigate } from 'react-router';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';
import { PRACTICE_TESTS, PRACTICE_TESTS_CATEGORIES, PRACTICE_TESTS_LEVELS } from '../data/practiceTestsData';

export default function PracticeTests() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const navigate = useNavigate();

    const handleStartPractice = (id) => {
        navigate(`/practice-test/${id}`);
    };

    const filteredTests = PRACTICE_TESTS.filter(test => {
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
        const matchesLevel = selectedLevel === 'All' || test.level === selectedLevel;
        return matchesSearch && matchesCategory && matchesLevel;
    });

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="practice-tests" />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto lg:pl-64">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 bg-white px-4 py-8 sm:px-6 lg:px-10">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-teal-600">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 3h6M9 3v7.5L5.5 17A2 2 0 007.3 20h9.4a2 2 0 001.8-3L15 10.5V3" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Practice Tests</h1>
                        </div>
                        <p className="text-slate-500 text-lg">
                            Practice mode — results do not affect your mastery progression.
                        </p>
                    </div>

                    {/* Practice Mode Banner */}
                    <div className="mb-8 p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-4">
                        <div className="mt-0.5 p-2 bg-white rounded-lg shadow-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 3h6M9 3v7.5L5.5 17A2 2 0 007.3 20h9.4a2 2 0 001.8-3L15 10.5V3" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-slate-800">Practice Mode Active</span>
                                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded">PRACTICE</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                These tests are for practice only. Your scores here will <span className="font-semibold text-slate-900">not</span> affect your skill path mastery progression or unlock any levels.
                            </p>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-10 p-2 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col md:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search practice tests..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-slate-100">
                            <div className="px-3 border-r border-slate-100">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </div>
                            <div className="flex gap-1">
                                {PRACTICE_TESTS_CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedCategory === category
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                            : 'text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-1 p-1 bg-white rounded-xl border border-slate-100">
                            {PRACTICE_TESTS_LEVELS.map(level => (
                                <button
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedLevel === level
                                        ? 'bg-teal-600 text-white shadow-md shadow-teal-200'
                                        : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6 flex items-center justify-between text-sm">
                        <p className="text-slate-500 font-medium">
                            Showing <span className="text-slate-900 font-bold">{filteredTests.length}</span> practice tests
                        </p>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredTests.map((test) => (
                            <TestCard key={test.id} test={test} onStart={() => handleStartPractice(test.id)} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

function TestCard({ test, onStart }) {
    const categoryColors = {
        'Python': 'bg-indigo-50 text-indigo-600',
        'SQL': 'bg-cyan-50 text-cyan-600',
        'DSA': 'bg-fuchsia-100 text-fuchsia-700',
        'Aptitude': 'bg-amber-50 text-amber-600'
    };

    const levelColors = {
        'Beginner': 'bg-emerald-50 text-emerald-600',
        'Intermediate': 'bg-orange-50 text-orange-600',
        'Advanced': 'bg-rose-50 text-rose-600'
    };

    return (
        <div className="group bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${categoryColors[test.category] || 'bg-slate-100 text-slate-600'}`}>
                        {test.category}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${levelColors[test.level] || 'bg-slate-100 text-slate-600'}`}>
                        {test.level}
                    </span>
                </div>
                <span className="text-[10px] font-extrabold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full">
                    PRACTICE
                </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {test.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 h-10 overflow-hidden text-ellipsis line-clamp-2">
                {test.description}
            </p>

            <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2.5 text-slate-600">
                    <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold tracking-tight">{test.questions?.length || 0} Questions</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                    <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold tracking-tight">{test.duration}</span>
                </div>
            </div>

            <button
                onClick={onStart}
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg shadow-teal-100 active:scale-[0.98]"
            >
                <div className="p-1.5 bg-white/20 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="2" />
                    </svg>
                </div>
                Start Practice
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </div>
    );
}
