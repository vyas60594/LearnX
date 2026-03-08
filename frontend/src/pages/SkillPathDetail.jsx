import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// Components
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';
import LessonView from '../components/skillpath/LessonView';
import LevelSection from '../components/skillpath/LevelSection';
import PathHeader from '../components/skillpath/PathHeader';
import ResultView from '../components/skillpath/ResultView';
import TestView from '../components/skillpath/TestView';

// Data
import { getPathData } from '../data/skillPathsData';

export default function SkillPathDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // UI State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [viewingModule, setViewingModule] = useState(null);

    // Test State
    const [activeTest, setActiveTest] = useState(null);
    const [testResult, setTestResult] = useState(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(1184); // 19:44 in seconds

    const path = getPathData(id);

    // Timer effect for tests
    useEffect(() => {
        let timer;
        if (activeTest && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && activeTest) {
            handleFinishTest();
        }
        return () => clearInterval(timer);
    }, [activeTest, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleTakeTest = (test) => {
        setActiveTest(test);
        setCurrentQuestionIdx(0);
        setSelectedAnswers({});
        setTimeLeft(1184);
        setTestResult(null);
    };

    const handleFinishTest = () => {
        const questions = activeTest.questions || [];
        let correctCount = 0;
        questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correct) correctCount++;
        });

        const score = Math.round((correctCount / questions.length) * 100);
        setTestResult({
            score,
            correct: correctCount,
            total: questions.length,
            passed: score >= 90,
            testName: activeTest.title,
            originalTest: activeTest // Store test data for retry functionality
        });
        setActiveTest(null);
    };

    const handleStartModule = (mod) => {
        if (mod.type === 'test') {
            handleTakeTest(mod);
        } else {
            setViewingModule(mod);
        }
    };

    // Sub-views rendering
    if (testResult) {
        return (
            <ResultView
                testResult={testResult}
                onClose={() => setTestResult(null)}
                onRetry={() => handleTakeTest(testResult.originalTest)}
            />
        );
    }

    if (activeTest) {
        return (
            <TestView
                activeTest={activeTest}
                currentQuestionIdx={currentQuestionIdx}
                setCurrentQuestionIdx={setCurrentQuestionIdx}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
                timeLeft={timeLeft}
                formatTime={formatTime}
                handleFinishTest={handleFinishTest}
            />
        );
    }

    if (viewingModule) {
        return (
            <LessonView
                viewingModule={viewingModule}
                setViewingModule={setViewingModule}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="skill-paths" />

            <div className="flex flex-1 flex-col overflow-y-auto lg:pl-64">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/skill-paths')}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-[11px] font-black uppercase tracking-widest mb-6"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M19 12H5m7-7l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Skill Paths
                    </button>

                    <PathHeader path={path} />

                    {/* Mastery Info Box */}
                    <div className="mb-10 flex items-start gap-4 bg-[#f0f7ff] p-5 rounded-2xl border border-[#e0efff] text-[#2b6cb0]">
                        <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#4f46e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <div>
                            <h4 className="text-[13px] font-black uppercase tracking-wider text-[#3730a3]">Mastery-Based Progression</h4>
                            <p className="text-[11px] font-bold opacity-80 mt-0.5 leading-relaxed">Complete all modules in a level, then pass the Level Mastery Test with <span className="text-[#4f46e5]">90% or higher</span> to unlock the next level.</p>
                        </div>
                    </div>

                    {/* Levels Section */}
                    <div className="space-y-12">
                        {path.levels.map((level, idx) => (
                            <LevelSection
                                key={level.id}
                                level={level}
                                index={idx}
                                onStartModule={handleStartModule}
                                onReviewModule={setViewingModule}
                                onTakeMasteryTest={handleTakeTest}
                            />
                        ))}
                    </div>

                    {/* Final Reward / Certification Card */}
                    <div className="mt-16 p-px bg-linear-to-r from-amber-400 via-amber-100 to-amber-400 rounded-2xl shadow-sm">
                        <div className="bg-[#fffcf0]/90 rounded-[15px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-xl border border-amber-100">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Complete All Levels → Earn Certificate</h3>
                                    <p className="text-sm font-bold text-slate-500 mt-1 italic">Finish all 3 architectural levels and pass every mastery verification.</p>
                                </div>
                            </div>
                            <button className="px-8 py-4 bg-amber-200 text-amber-800 text-xs font-black rounded-xl border border-amber-300 opacity-60 cursor-not-allowed uppercase tracking-widest flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Locked
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
