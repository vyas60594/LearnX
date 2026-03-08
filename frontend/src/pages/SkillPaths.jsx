import { useState } from 'react';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';
import PathCard from '../components/skillpaths/PathCard';

// Data
import { PATHS } from '../data/skillPathsListData';

export default function SkillPathsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="skill-paths" />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto lg:pl-64">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Skill Paths</h1>
                        <p className="mt-2 text-slate-500 font-medium">
                            Choose a skill path and start your mastery-based learning journey.
                        </p>
                    </div>

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
