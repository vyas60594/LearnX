import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ResultView from '../components/skillpath/ResultView';
import TestView from '../components/skillpath/TestView';
import { PRACTICE_TESTS } from '../data/practiceTestsData';

export default function PracticeTestPlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const test = PRACTICE_TESTS.find(t => t.id === parseInt(id));

    // Test State
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(1184); // Default to 19:44
    const [isFinished, setIsFinished] = useState(false);
    const [testResult, setTestResult] = useState(null);

    // Initialize time based on test data if available (though data has strings like '20 min')
    useEffect(() => {
        if (test) {
            setTimeLeft(20 * 60); // Standard 20 mins for practice
        }
    }, [test]);

    // Timer effect
    useEffect(() => {
        let timer;
        if (!isFinished && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && !isFinished) {
            handleFinishTest();
        }
        return () => clearInterval(timer);
    }, [isFinished, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleFinishTest = () => {
        const questions = test.questions || [];
        let correctCount = 0;
        questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correct) correctCount++;
        });

        const score = Math.round((correctCount / questions.length) * 100);
        setTestResult({
            score,
            correct: correctCount,
            total: questions.length,
            passed: score >= 70, // Practice tests might have a lower threshold than Mastery
            testName: test.title,
            originalTest: test
        });
        setIsFinished(true);
    };

    const handleRetry = () => {
        setCurrentQuestionIdx(0);
        setSelectedAnswers({});
        setTimeLeft(20 * 60);
        setIsFinished(false);
        setTestResult(null);
    };

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
                    if (test.courseSlug) {
                        navigate(`/skill-path/${test.courseSlug}`);
                    } else {
                        navigate('/practice-tests');
                    }
                }}
                onRetry={handleRetry}
            />
        );
    }

    return (
        <TestView
            activeTest={test}
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
