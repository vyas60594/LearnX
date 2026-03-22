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

            <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto lg:pl-72 relative">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 bg-white px-4 pt-6 pb-20 sm:px-6 lg:px-10 lg:pt-8 w-full max-w-7xl mx-auto">
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

                    {/* Search and Filters - Premium Redesign */}
                    <div className="mb-10 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] p-4 lg:p-5 flex flex-col lg:flex-row items-center gap-5 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                        {/* 1. Search Bar */}
                        <div className="relative flex-1 w-full group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-transform group-focus-within:scale-110 group-focus-within:text-indigo-600">
                                <svg className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search practice tests..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 focus:border-indigo-500/30 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400 font-semibold text-slate-700 transition-all outline-none"
                            />
                        </div>

                        {/* Contains Selectors */}
                        <div className="flex flex-col md:flex-row w-full lg:w-auto items-center gap-4">

                            {/* 2. Category Filter (Pill Selector) */}
                            <div className="flex items-center p-1.5 bg-slate-50/80 border border-slate-100 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar shadow-inner">
                                <div className="pl-3 pr-2 border-r border-slate-200/60 hidden md:block text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </div>
                                <div className="flex gap-1 ml-1 sm:ml-2">
                                    {PRACTICE_TESTS_CATEGORIES.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 whitespace-nowrap overflow-hidden ${selectedCategory === category
                                                ? 'text-white shadow-md shadow-indigo-500/30 translate-y-[-1px]'
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                                                }`}
                                        >
                                            {selectedCategory === category && (
                                                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl -z-10" />
                                            )}
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Level Filter */}
                            <div className="flex gap-1 p-1.5 bg-slate-50/80 border border-slate-100 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar shadow-inner">
                                {PRACTICE_TESTS_LEVELS.map(level => {
                                    const isActive = selectedLevel === level;
                                    let activeBg = 'bg-teal-500';
                                    let activeShadow = 'shadow-teal-500/30';

                                    if (level === 'Intermediate') { activeBg = 'bg-amber-500'; activeShadow = 'shadow-amber-500/30'; }
                                    if (level === 'Advanced') { activeBg = 'bg-rose-500'; activeShadow = 'shadow-rose-500/30'; }
                                    if (level === 'All') { activeBg = 'bg-slate-700'; activeShadow = 'shadow-slate-700/30'; }

                                    return (
                                        <button
                                            key={level}
                                            onClick={() => setSelectedLevel(level)}
                                            className={`relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 whitespace-nowrap overflow-hidden ${isActive
                                                ? `text-white shadow-md ${activeShadow} translate-y-[-1px]`
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                                                }`}
                                        >
                                            {isActive && (
                                                <span className={`absolute inset-0 ${activeBg} rounded-xl -z-10 bg-opacity-90`} />
                                            )}
                                            {level}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 flex items-center justify-between text-sm">
                        <p className="text-slate-500 font-medium">
                            Showing <span className="text-slate-900 font-bold">{filteredTests.length}</span> practice tests
                        </p>
                    </div>

                    {/* Grid Layout */}
                    {filteredTests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-700 mb-1">No practice tests found</h3>
                            <p className="text-slate-400 text-sm font-medium max-w-xs">
                                Try adjusting your search or filters to find what you're looking for.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All'); }}
                                className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredTests.map((test) => (
                                <TestCard key={test.id} test={test} onStart={() => handleStartPractice(test.id)} />
                            ))}
                        </div>
                    )}
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
