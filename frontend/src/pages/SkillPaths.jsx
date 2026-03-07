// =============================================================
//  SkillPaths.jsx
//  Page showing all available learning paths.
//  Layout: Sidebar + TopBar + Path Cards Grid
// =============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';

// Assets
import aptImg from '../assets/aptitude.png';
import dsaImg from '../assets/image1.png';
import pythonImg from '../assets/pythondev.png';
import sqlImg from '../assets/sql.png';

const PATHS = [
    {
        title: 'Python Developer',
        description: 'Master Python from fundamentals to advanced concepts including OOP, data structures, file handling, and real-world project development.',
        image: pythonImg,
        modules: 12,
        levels: 3,
        hasCertificate: true,
        progress: 42,
        tags: ['Python', 'OOP'],
        color: '#4f46e5'
    },
    {
        title: 'SQL Developer',
        description: 'Master SQL from basic queries to advanced database design, optimization, and stored procedures.',
        image: sqlImg,
        modules: 10,
        levels: 3,
        hasCertificate: true,
        progress: 0,
        tags: ['SQL', 'Database'],
        color: '#6366f1'
    },
    {
        title: 'Data Structures & Algorithms',
        description: 'Build strong problem-solving skills with arrays, trees, graphs, sorting, searching, and dynamic programming.',
        image: dsaImg,
        modules: 14,
        levels: 3,
        hasCertificate: true,
        progress: 0,
        tags: ['DSA', 'Algorithms'],
        color: '#8b5cf6'
    },
    {
        title: 'Aptitude Preparation',
        description: 'Sharpen your quantitative, logical, and verbal reasoning skills for campus placements and competitive exams.',
        image: aptImg,
        modules: 9,
        levels: 3,
        hasCertificate: true,
        progress: 0,
        tags: ['Aptitude', 'Placement'],
        color: '#a78bfa'
    }
];

export default function SkillPathsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Sidebar */}
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="skill-paths" />

            {/* Mobile Sidebar Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto lg:pl-64">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Skill Paths</h1>
                        <p className="mt-2 text-slate-500 font-medium">
                            Choose a skill path and start your mastery-based learning journey.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {PATHS.map((path) => (
                            <PathCard key={path.title} path={path} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

function PathCard({ path }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/10">
            {/* Card Image Wrapper */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                    src={path.image}
                    alt={path.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Floating Tags */}
                <div className="absolute left-4 top-4 flex gap-2">
                    {path.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow-lg"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-col p-6 flex-1">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {path.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3">
                    {path.description}
                </p>

                {/* Info Icons */}
                <div className="mt-6 flex flex-wrap gap-5">
                    <InfoIcon icon="book" label={`${path.modules} Modules`} />
                    <InfoIcon icon="levels" label={`${path.levels} Levels`} />
                    {path.hasCertificate && <InfoIcon icon="award" label="Certificate" />}
                </div>

                {/* Progress Section */}
                {path.progress > 0 && (
                    <div className="mt-6">
                        <div className="flex items-center justify-between text-xs font-bold mb-2">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-indigo-600">{path.progress}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                                style={{ width: `${path.progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 shadow-lg shadow-slate-900/10">
                    {path.progress > 0 ? 'Continue Path' : 'Start Path'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

function InfoIcon({ icon, label }) {
    const icons = {
        book: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
        ),
        levels: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        award: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
        )
    };

    return (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
            <span className="text-slate-300">{icons[icon]}</span>
            <span className="uppercase tracking-wider">{label}</span>
        </div>
    );
}
