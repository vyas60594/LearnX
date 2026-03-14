import { useState } from 'react';
import { useNavigate } from 'react-router';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';
import { skillPathsData } from '../data/skillPathsData';

export default function Certificates() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    // In a real app, you would calculate progress dynamically from the user's state. 
    // Here we use the data from skillPathsData and add some mock metrics if needed.
    const certificatePaths = [
        {
            ...skillPathsData['python-developer'],
            slug: 'python-developer',
            progress: 42,
        },
        {
            ...skillPathsData['sql-developer'],
            slug: 'sql-developer',
            progress: 0,
        },
        {
            title: 'Data Structures & Algorithms',
            image: null, // You can substitute SVG or icon class here
            description: 'Build problem-solving skills for technical interviews.',
            levelsCount: 3,
            slug: 'dsa',
            progress: 0,
            colorCls: 'bg-blue-600'
        },
        {
            title: 'Aptitude Preparation',
            image: null,
            description: 'Ace campus placements with structured aptitude training.',
            levelsCount: 3,
            slug: 'aptitude',
            progress: 0,
            colorCls: 'bg-orange-100' // Matches reference icon bg loosely
        }
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-['Plus_Jakarta_Sans']">
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="certificates" />

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex flex-1 flex-col overflow-y-auto w-full lg:pl-72">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full">
                    
                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">🏆</span>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Certificates</h1>
                        </div>
                        <p className="text-slate-500 text-[15px] font-medium">
                            Complete all levels in a skill path to earn a verified certificate.
                        </p>
                    </div>

                    {/* Certificates Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-12">
                        {certificatePaths.map((path) => (
                            <div key={path.slug} className="bg-white rounded-[24px] p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${!path.image ? path.colorCls : 'bg-slate-50 overflow-hidden'}`}>
                                            {path.image ? (
                                                <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xl font-bold opacity-80">{path.title.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{path.title}</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed max-w-sm line-clamp-2">
                                                {path.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 rounded-lg text-slate-400 font-bold text-[11px] uppercase tracking-wider shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Locked
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completion</span>
                                        <span className="text-base font-black text-slate-800">{path.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                                        <div 
                                            className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out" 
                                            style={{ width: `${path.progress}%` }} 
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-500">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Complete all {path.levelsCount} levels to unlock this certificate
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Certificate Preview Placeholder */}
                    <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm p-8 xl:p-12">
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-8">Certificate Preview</h2>
                        
                        <div className="w-full bg-slate-100/80 rounded-2xl p-8 sm:p-16 flex items-center justify-center relative overflow-hidden group">
                            
                            {/* Decorative background blur for depth */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/40 blur-3xl rounded-full pointer-events-none" />

                            {/* The Mock Certificate Card */}
                            <div className="relative w-full max-w-2xl aspect-[1.414/1] bg-[#f8f9fa] shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm border-[12px] border-[#e2e8f0] p-10 flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-transform duration-500 will-change-transform z-10">
                                
                                {/* Inner decorative border */}
                                <div className="absolute inset-4 border-2 border-indigo-900/10 pointer-events-none" />
                                <div className="absolute inset-5 border border-indigo-900/5 pointer-events-none" />

                                {/* Header Logo Area */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 justify-center">
                                        <div className="h-8 w-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-xs italic shadow-sm">LX</div>
                                        <span className="font-extrabold text-indigo-900 text-2xl tracking-tight">LearnX</span>
                                    </div>
                                </div>

                                <h1 className="text-sm font-bold text-indigo-900/50 uppercase tracking-[0.3em] mb-4">
                                    Certificate of Completion
                                </h1>
                                
                                <p className="text-xs text-slate-500 font-medium tracking-wide mb-2 uppercase">
                                    This certifies that
                                </p>
                                
                                <h2 className="text-4xl text-slate-800 font-serif italic font-medium mb-6">
                                    Alexander Chen
                                </h2>
                                
                                <p className="text-xs text-slate-500 font-medium tracking-wide mb-2 uppercase">
                                    has successfully completed the
                                </p>
                                
                                <h3 className="text-lg font-bold text-indigo-900 tracking-tight mb-12">
                                    Advanced Data Science Program
                                </h3>

                                <div className="w-full flex justify-between items-end mt-auto px-10">
                                    <div className="flex flex-col items-center">
                                        <div className="w-32 border-b border-slate-300 mb-2"></div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date Issued</span>
                                        <span className="text-xs text-slate-600 font-semibold mt-1">October 24, 2023</span>
                                    </div>

                                    {/* Gold Seal Mocklet */}
                                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg border-4 border-[#f8f9fa] outline outline-1 outline-amber-200 relative">
                                        <div className="absolute inset-1 border border-amber-200/50 rounded-full border-dashed"></div>
                                        <span className="font-serif font-bold text-amber-900/80 text-lg">LX</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="w-32 border-b border-slate-300 mb-2"></div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Program Director</span>
                                        <span className="text-xs text-slate-600 font-semibold mt-1">Sarah Jenkins</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-slate-400 text-sm font-medium mt-6">
                            Sample certificate — complete a skill path to generate yours
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}
