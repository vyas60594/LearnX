import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ResultView from '../components/skillpath/ResultView';
import TestView from '../components/skillpath/TestView';
import { practiceTestService } from '../services/api';

export default function PracticeTestPlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);

    // Test State
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(20 * 60); 
    const [isFinished, setIsFinished] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const [activeQuestions, setActiveQuestions] = useState([]);

    useEffect(() => {
        fetchTest();
    }, [id]);

    const fetchTest = async () => {
        try {
            setLoading(true);
            const data = await practiceTestService.getById(id);
            setTest(data);
            
            // Set time
            const durationArr = (data.duration || '20 mins').split(' ');
            const durationMins = parseInt(durationArr[0]) || 20;
            setTimeLeft(durationMins * 60);

            if (data.questions && data.questions.length > 0) {
                // Shuffle all questions or just use available ones
                const shuffled = [...data.questions].sort(() => 0.5 - Math.random());
                // Limit to 10 for practice or use all
                const selectedQuestions = shuffled.slice(0, 10);
                setActiveQuestions(selectedQuestions);
            }
        } catch (error) {
            console.error('Failed to fetch practice test:', error);
            toast.error('Could not load test content');
        } finally {
            setLoading(false);
        }
    };

    // Timer effect
    useEffect(() => {
        let timer;
        if (!isFinished && timeLeft > 0 && activeQuestions.length > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && !isFinished && activeQuestions.length > 0) {
            handleFinishTest();
        }
        return () => clearInterval(timer);
    }, [isFinished, timeLeft, activeQuestions]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleFinishTest = () => {
        let correctCount = 0;
        activeQuestions.forEach((q, idx) => {
            const userAnswer = selectedAnswers[idx];
            
            // Handle Multiple Choice
            if (q.options && q.options.length > 0) {
                const selectedIdx = userAnswer;
                const selectedVal = q.options[selectedIdx];
                if (selectedVal === q.correct_answer || selectedIdx === q.correct) {
                    correctCount++;
                }
            } 
            // Handle Short Answer
            else if (userAnswer !== undefined && q.correct_answer) {
                const normalizedUser = userAnswer.toString().trim().toLowerCase();
                const normalizedCorrect = q.correct_answer.toString().trim().toLowerCase();
                if (normalizedUser === normalizedCorrect) {
                    correctCount++;
                }
            }
        });

        const score = Math.round((correctCount / activeQuestions.length) * 100);
        setTestResult({
            score,
            correct: correctCount,
            total: activeQuestions.length,
            passed: score >= 70,
            testName: test.title,
            originalTest: test,
            isPractice: true
        });
        setIsFinished(true);
    };

    const handleRetry = () => {
        setCurrentQuestionIdx(0);
        setSelectedAnswers({});
        
        const durationArr = (test.duration || '20 mins').split(' ');
        const durationMins = parseInt(durationArr[0]) || 20;
        setTimeLeft(durationMins * 60);

        setIsFinished(false);
        setTestResult(null);
        
        if (test && test.questions) {
            const shuffled = [...test.questions].sort(() => 0.5 - Math.random());
            const selectedQuestions = shuffled.slice(0, 10);
            setActiveQuestions(selectedQuestions);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-slate-400 bg-white">Loading Practice Test...</div>;

    if (!test) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50 font-['Plus_Jakarta_Sans']">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Practice Test Not Found</h2>
                <button
                    onClick={() => navigate('/practice-tests')}
                    className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-slate-900 transition-all"
                >
                    Back to Practice Section
                </button>
            </div>
        );
    }

    if (isFinished && testResult) {
        return (
            <ResultView
                testResult={testResult}
                onClose={() => {
                    navigate('/practice-tests');
                }}
                onRetry={handleRetry}
            />
        );
    }

    if (activeQuestions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800">No questions found in this test</h2>
                <button onClick={() => navigate('/practice-tests')} className="mt-4 text-indigo-600 font-bold hover:underline">Back to Gallery</button>
            </div>
        );
    }

    return (
        <TestView
            activeTest={{ ...test, questions: activeQuestions }}
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
