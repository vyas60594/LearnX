export default function ResultView({ testResult, onClose }) {
    if (!testResult) return null;

    return (
        <div className="flex h-screen bg-[#f8fafc] font-['Plus_Jakarta_Sans'] overflow-hidden">
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Tiny Header */}
                <div className="h-16 px-10 flex items-center justify-between bg-white border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs italic">LX</div>
                        <span className="font-extrabold text-slate-800 tracking-tight">LearnX</span>
                    </div>
                    <button onClick={onClose} className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Back to Roadmap
                    </button>
                </div>

                <main className="flex-1 p-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
                    {/* Left Card: Score Summary */}
                    <div className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                        <div className={`absolute top-6 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${testResult.passed ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                            {testResult.passed ? 'Test Passed' : 'Test Failed'}
                        </div>

                        <div className="mt-12 relative h-48 w-48 flex items-center justify-center">
                            <svg className="transform -rotate-90 w-full h-full">
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                                    strokeDasharray={552.9}
                                    strokeDashoffset={552.9 - (552.9 * testResult.score) / 100}
                                    className={testResult.passed ? 'text-emerald-500' : 'text-red-500'}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-slate-800 leading-none">{testResult.score}%</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Your Score</span>
                            </div>
                        </div>

                        <h2 className="mt-8 text-lg font-extrabold text-slate-800 tracking-tight leading-tight">{testResult.testName}</h2>
                        <p className="text-[11px] font-bold text-slate-400 mt-1">Passing score: 90%</p>

                        <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                            <div className="bg-emerald-50/50 p-4 rounded-2xl flex flex-col items-center border border-emerald-100/30">
                                <span className="text-2xl font-black text-emerald-600">{testResult.correct}</span>
                                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Correct</span>
                            </div>
                            <div className="bg-red-50/50 p-4 rounded-2xl flex flex-col items-center border border-red-100/30">
                                <span className="text-2xl font-black text-red-600">{testResult.total - testResult.correct}</span>
                                <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">Incorrect</span>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 w-full">
                            <button onClick={onClose} className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all">
                                Retry Test
                            </button>
                            <button onClick={onClose} className="w-full py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-indigo-100 transition-all">
                                Review Roadmap
                            </button>
                        </div>
                    </div>

                    {/* Right Content: Breakdown */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Performance Breakdown</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        <span>Correct Answers</span>
                                        <span className="text-slate-900">{testResult.correct}/{testResult.total}</span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(testResult.correct / testResult.total) * 100}%` }}></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        <span>Incorrect Answers</span>
                                        <span className="text-slate-900">{(testResult.total - testResult.correct)}/{testResult.total}</span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-red-500 rounded-full" style={{ width: `${((testResult.total - testResult.correct) / testResult.total) * 100}%` }}></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        <span>Score Efficiency</span>
                                        <span className="text-slate-900">{testResult.score}/100</span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full" style={{ width: `${testResult.score}%` }}></div></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-8">
                                <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Score Analysis</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-amber-50/50 border border-amber-100/50 rounded-2xl">
                                    <div>
                                        <h4 className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Accuracy Rate</h4>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-black text-amber-900">{testResult.score}%</span>
                                        <p className="text-[9px] font-bold text-amber-700 uppercase tracking-widest mt-0.5">{testResult.passed ? 'Excellent' : 'Good effort'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100/50 rounded-2xl">
                                    <div>
                                        <h4 className="text-[11px] font-bold text-red-800 uppercase tracking-widest">Required to Pass</h4>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-black text-red-900">90%</span>
                                        <p className="text-[9px] font-bold text-red-700 uppercase tracking-widest mt-0.5">{testResult.passed ? 'Met' : `Need ${90 - testResult.score}% more`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
