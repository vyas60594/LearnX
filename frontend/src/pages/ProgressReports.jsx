import { useState } from 'react';
import achievement from '../assets/achievement.png';
import frontend_developer from '../assets/frontend_developer.png';
import sql_developer from '../assets/sql_developer.png';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';

function ProgressReports() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">

            {/* SIDEBAR */}
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="progress-reports" />

            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* MAIN SCROLL AREA */}
            <div className="flex-1 flex flex-col lg:pl-64 overflow-y-auto no-scrollbar">

                {/* Top bar */}
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Page content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">

                    {/* ── PAGE TITLE ── */}
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Learning Progress</h1>
                        <p className="text-sm text-slate-400 font-medium mt-1">Track your achievements and performance</p>
                    </div>

                    {/* ── TOP STAT CARDS (2 cards) ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl">

                        {/* Card: Total Tests Passed */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Total Tests Passed</p>
                                <h3 className="text-4xl font-black text-slate-900 mt-2 leading-none">5</h3>
                            </div>
                            {/* Trophy icon - green */}
                            <svg className="w-8 h-8 text-green-500 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0012 0V2z" />
                            </svg>
                        </div>

                        {/* Card: Current Level */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Current Level</p>
                                <h3 className="text-2xl font-black text-slate-900 mt-2 leading-none uppercase">Intermediate</h3>
                            </div>
                            {/* Target icon - orange */}
                            <svg className="w-8 h-8 text-amber-500 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                            </svg>
                        </div>

                    </div>

                    {/* ── TWO-COLUMN: Skill Paths (left) + Recent Tests (right) ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                        {/* ═══ LEFT COLUMN: Skill Path Progress ═══ */}
                        <div className="lg:col-span-2 space-y-5">
                            <h2 className="text-lg sm:text-xl font-black text-slate-900">Skill Path Progress</h2>

                            {/* ── COURSE CARD: SQL Developer ── */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">

                                    {/* Left: text content */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xl font-black text-slate-900 mb-1">SQL Developer</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-5">
                                            Master database management and SQL queries for backend development roles
                                        </p>

                                        {/* Progress bar */}
                                        <div className="mb-5">
                                            <div className="flex justify-between text-xs font-semibold mb-1.5">
                                                <span className="text-slate-500">Overall Progress</span>
                                                <span className="text-slate-700 font-bold">45%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full w-[45%] bg-slate-800 rounded-full" />
                                            </div>
                                        </div>

                                        {/* Three level boxes: Beginner | Intermediate | Advanced */}
                                        <div className="grid grid-cols-3 gap-3">

                                            {/* Beginner - Completed (green border) */}
                                            <div className="border border-green-200 bg-green-50 rounded-xl p-3 text-center">
                                                <p className="text-[11px] font-bold text-green-600 mb-1">Beginner</p>
                                                <p className="text-xs text-slate-500 mb-2">Completed</p>
                                                {/* Green checkmark */}
                                                <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>

                                            {/* Intermediate - In Progress (orange/yellow border) */}
                                            <div className="border border-amber-200 bg-amber-50 rounded-xl p-3 text-center">
                                                <p className="text-[11px] font-bold text-amber-500 mb-1">Intermediate</p>
                                                <p className="text-xs text-slate-500 mb-1">In Progress</p>
                                                <p className="text-sm font-black text-amber-500">65%</p>
                                            </div>

                                            {/* Advanced - Locked (gray, no border color) */}
                                            <div className="border border-slate-200 bg-slate-50 rounded-xl p-3 text-center">
                                                <p className="text-[11px] font-bold text-purple-400 mb-1">Advanced</p>
                                                <p className="text-xs text-slate-400 mb-2">Locked</p>
                                                {/* Lock icon */}
                                                <svg className="w-4 h-4 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                                                </svg>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Right: course image */}
                                    <div className="w-full sm:w-36 h-36 shrink-0 rounded-xl overflow-hidden border border-slate-100 shadow-sm self-start">
                                        <img src={sql_developer} alt="SQL Developer" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            {/* ── COURSE CARD: Frontend Developer ── */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xl font-black text-slate-900 mb-1">Frontend Developer</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-5">
                                            Build modern web applications with HTML, CSS, JavaScript, and React
                                        </p>

                                        {/* Progress bar */}
                                        <div className="mb-5">
                                            <div className="flex justify-between text-xs font-semibold mb-1.5">
                                                <span className="text-slate-500">Overall Progress</span>
                                                <span className="text-slate-700 font-bold">45%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full w-[45%] bg-slate-800 rounded-full" />
                                            </div>
                                        </div>

                                        {/* Three level boxes */}
                                        <div className="grid grid-cols-3 gap-3">

                                            {/* Beginner - Completed */}
                                            <div className="border border-green-200 bg-green-50 rounded-xl p-3 text-center">
                                                <p className="text-[11px] font-bold text-green-600 mb-1">Beginner</p>
                                                <p className="text-xs text-slate-500 mb-2">Completed</p>
                                                <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>

                                            {/* Intermediate - In Progress */}
                                            <div className="border border-amber-200 bg-amber-50 rounded-xl p-3 text-center">
                                                <p className="text-[11px] font-bold text-amber-500 mb-1">Intermediate</p>
                                                <p className="text-xs text-slate-500 mb-1">In Progress</p>
                                                <p className="text-sm font-black text-amber-500">65%</p>
                                            </div>

                                            {/* Advanced - Locked */}
                                            <div className="border border-slate-200 bg-slate-50 rounded-xl p-3 text-center">
                                                <p className="text-[11px] font-bold text-purple-400 mb-1">Advanced</p>
                                                <p className="text-xs text-slate-400 mb-2">Locked</p>
                                                <svg className="w-4 h-4 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                                                </svg>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="w-full sm:w-36 h-36 shrink-0 rounded-xl overflow-hidden border border-slate-100 shadow-sm self-start">
                                        <img src={frontend_developer} alt="Frontend Developer" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ═══ RIGHT COLUMN: Recent Tests + Badge ═══ */}
                        <div className="space-y-4">
                            <h2 className="text-lg sm:text-xl font-black text-slate-900">Recent Tests</h2>

                            {/* Test 1: SQL Fundamentals - Passed */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-black text-slate-800">SQL Fundamentals</span>
                                    {/* Green "Passed" badge */}
                                    <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Passed</span>
                                </div>
                                {/* Level tag */}
                                <span className="inline-block px-2.5 py-0.5 bg-slate-800 text-white text-[10px] font-bold rounded-full mb-3">Beginner</span>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-medium">Score:</span>
                                    <span className="text-green-600 font-black text-base">95%</span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1">1/15/2024</p>
                            </div>

                            {/* Test 2: SQL Fundamentals - Failed */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-black text-slate-800">SQL Fundamentals</span>
                                    {/* Red "Failed" badge */}
                                    <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Failed</span>
                                </div>
                                <span className="inline-block px-2.5 py-0.5 bg-slate-800 text-white text-[10px] font-bold rounded-full mb-3">Beginner</span>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-medium">Score:</span>
                                    <span className="text-red-500 font-black text-base">88%</span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1">1/14/2024</p>
                            </div>

                            {/* Test 3: Database Design - Passed */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-black text-slate-800">Database Design</span>
                                    <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Passed</span>
                                </div>
                                <span className="inline-block px-2.5 py-0.5 bg-slate-800 text-white text-[10px] font-bold rounded-full mb-3">Beginner</span>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-medium">Score:</span>
                                    <span className="text-green-600 font-black text-base">92%</span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1">1/10/2024</p>
                            </div>

                            {/* Achievement motivational card */}
                            <div className="bg-green-50  rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
                                <div className="w-20 h-20 mx-auto mb-3 rounded-xl overflow-hidden">
                                    <img src={achievement} alt="Achievement Badge" className="w-full h-full object-cover" />
                                </div>
                                <h6 className="font-black text-slate-900 text-base">Keep Going! 🚀</h6>
                                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                    You're making great progress. Complete 3 more tests to unlock a special badge!
                                </p>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ProgressReports;