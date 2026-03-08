import ModuleCard from './ModuleCard';

export default function LevelSection({ level, index, onStartModule, onReviewModule, onTakeMasteryTest }) {
    return (
        <div className={level.status === 'locked' ? 'opacity-50 grayscale cursor-not-allowed' : ''}>
            <div className="flex items-center gap-4 mb-6">
                <div className={`h-11 w-11 flex items-center justify-center rounded-2xl text-xl font-black ${level.status === 'locked' ? 'bg-slate-100 text-slate-300 shadow-none' : 'bg-red-50 text-red-500 shadow-xl shadow-red-100 border border-red-100'}`}>
                    {index + 1}
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className={`text-xl font-extrabold ${level.status === 'locked' ? 'text-slate-400' : 'text-slate-900'} tracking-[-0.02em]`}>{level.title}</h2>
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${level.status === 'locked' ? 'bg-slate-100 text-slate-300' : 'bg-emerald-100 text-emerald-600'}`}>
                            {level.badge}
                        </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">{level.description}</p>
                </div>
                {level.status === 'locked' && (
                    <div className="ml-auto text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 15V17M6 21H18A2 2 0 0020 19V13A2 2 0 0018 11H6A2 2 0 004 13V19A2 2 0 006 21ZM16 11V7A4 4 0 008 7V11H8Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Complete previous level to unlock
                    </div>
                )}
            </div>

            {/* Modules List */}
            <div className="space-y-4">
                {level.modules.map((mod, mIdx) => (
                    <ModuleCard
                        key={mIdx}
                        mod={mod}
                        levelStatus={level.status}
                        onStart={onStartModule}
                        onReview={onReviewModule}
                    />
                ))}

                {/* Mastery Test for Level */}
                {level.status === 'current' && level.masteryTest && (
                    <div className="mt-8 p-6 rounded-[32px] border-2 border-dashed border-amber-200 bg-amber-50/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="h-14 w-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 8a7 7 0 100 14 7 7 0 000-14zM8.21 13.89L7 23l5-3 5 3-1.21-9.11" /></svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-slate-800 tracking-tight">{level.masteryTest.title}</h4>
                                <p className="text-[11px] font-bold text-slate-400 mt-1 italic">Score <span className="text-amber-600">{level.masteryTest.score} or higher</span> to unlock the next level.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onTakeMasteryTest(level.masteryTest)}
                            className="px-8 py-3.5 bg-amber-500 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-500/30 hover:bg-amber-600 transition-all"
                        >
                            Take Mastery Test
                        </button>
                    </div>
                )}

                {level.status === 'current' && (
                    <div className="mt-6 flex items-center justify-center p-4 border-t border-slate-50 italic text-[10px] font-black text-slate-300 uppercase tracking-widest gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Pass mastery test to unlock the next stage
                    </div>
                )}
            </div>
        </div>
    );
}
