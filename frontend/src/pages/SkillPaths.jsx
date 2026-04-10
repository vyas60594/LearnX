import { useEffect, useState } from 'react';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';
import PathCard from '../components/skillpaths/PathCard';
import { skillPathService } from '../services/api';

export default function SkillPathsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [paths, setPaths] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPaths = async () => {
            try {
                const data = await skillPathService.getAll();
                // Filter only published paths for users
                setPaths(data.filter(p => p.status === 'Published'));
            } catch (error) {
                console.error('Failed to fetch skill paths:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPaths();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="skill-paths" />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto lg:pl-72">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Skill Paths</h1>
                        <p className="mt-2 text-slate-500 font-medium">
                            Choose a skill path and start your mastery-based learning journey.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2].map(i => (
                                <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-3xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {paths.map((path) => (
                                <PathCard key={path.id} path={path} />
                            ))}
                            {paths.length === 0 && (
                                <div className="col-span-full py-20 text-center font-bold text-slate-400">
                                    No skill paths available yet. Check back later!
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
