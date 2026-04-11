import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { adminService } from '../../services/api';

const AdminPracticeTestEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAddMode, setIsAddMode] = useState(false);
    
    // Form state
    const [newQuestionText, setNewQuestionText] = useState('');
    const [newQuestionType, setNewQuestionType] = useState('Multiple Choice');
    const [newDifficulty, setNewDifficulty] = useState('Medium');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        fetchTestData();
    }, [id]);

    const fetchTestData = async () => {
        try {
            setLoading(true);
            const data = await adminService.getPracticeTestById(id);
            setTest(data);
        } catch (error) {
            console.error('Failed to fetch test data:', error);
            toast.error('Failed to load test data');
        } finally {
            setLoading(false);
        }
    };

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            const isShortAnswer = newQuestionType === 'Short Answer';
            const questionData = {
                question_text: newQuestionText,
                options: isShortAnswer ? [] : options,
                correct_answer: correctAnswer,
                difficulty: newDifficulty,
                question_type: newQuestionType
            };
            const addedQuestion = await adminService.addQuestion(id, questionData);
            setTest({ ...test, questions: [...test.questions, addedQuestion] });
            toast.success('Question added to test bank');
            setNewQuestionText('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setIsAddMode(false);
        } catch (error) {
            console.error('Failed to add question:', error);
            toast.error('Failed to add question');
        }
    };

    const handleDeleteQuestion = async (qId) => {
        if (!confirm('Remove this question?')) return;
        try {
            await adminService.deleteQuestion(qId);
            setTest({ ...test, questions: test.questions.filter(q => q.id !== qId) });
            toast.success('Question removed');
        } catch (error) {
            console.error('Failed to delete question:', error);
            toast.error('Failed to remove question');
        }
    };

    if (loading) return <div className="p-10 text-center text-slate-500 font-bold">Loading test...</div>;
    if (!test) return <div className="p-10 text-center text-red-500 font-bold">Test not found</div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header & Breadcrumbs */}
            <div>
                <button onClick={() => navigate('/admin/practice-tests')} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1 mb-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Practice Tests
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{test.title}</h1>
                            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                {test.test_type || test.type}
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-widest">{test.level} • {test.category}</p>
                        <p className="text-slate-500 font-medium mt-1">Duration: {test.duration} • ID: {id}</p>
                    </div>
                </div>
            </div>

            {/* Question Bank Manager */}
            <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200/60 flex items-center justify-between bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Question Bank ({test.questions.length})
                    </h2>
                    {!isAddMode && (
                        <button 
                            onClick={() => setIsAddMode(true)}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                            Add Question
                        </button>
                    )}
                </div>

                {isAddMode && (
                    <div className="p-6 border-b border-slate-200/60 bg-emerald-50/30 animate-in slide-in-from-top-4 duration-300">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4">Compose Question</h3>
                        <form onSubmit={handleAddQuestion} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question Prompt</label>
                                <textarea 
                                    required
                                    rows="2"
                                    value={newQuestionText}
                                    onChange={(e) => setNewQuestionText(e.target.value)}
                                    placeholder="e.g. What is the output of..."
                                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {newQuestionType === 'Multiple Choice' ? (
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Options</label>
                                        {options.map((opt, i) => (
                                            <div key={i} className="flex gap-2 items-center">
                                                <span className="text-xs font-bold text-slate-400 w-4">{String.fromCharCode(65 + i)}</span>
                                                <input 
                                                    type="text"
                                                    required
                                                    value={opt}
                                                    onChange={(e) => {
                                                        const newOpts = [...options];
                                                        newOpts[i] = e.target.value;
                                                        setOptions(newOpts);
                                                    }}
                                                    placeholder={`Option ${i + 1}`}
                                                    className="flex-1 bg-white border border-slate-200 text-slate-800 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-emerald-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Correct Answer</label>
                                        <textarea 
                                            required
                                            value={correctAnswer}
                                            onChange={(e) => setCorrectAnswer(e.target.value)}
                                            placeholder="Type the expected correct answer..."
                                            className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none h-[180px]"
                                        />
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {newQuestionType === 'Multiple Choice' && (
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Correct Option</label>
                                            <select 
                                                required
                                                value={correctAnswer}
                                                onChange={(e) => setCorrectAnswer(e.target.value)}
                                                className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium text-sm"
                                            >
                                                <option value="">Select Correct Option</option>
                                                {options.map((opt, i) => opt && (
                                                    <option key={i} value={opt}>{String.fromCharCode(65 + i)}: {opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
                                            <select 
                                                value={newQuestionType}
                                                onChange={(e) => {
                                                    setNewQuestionType(e.target.value);
                                                    setCorrectAnswer(''); // Reset answer on type change
                                                }}
                                                className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium text-sm"
                                            >
                                                <option>Multiple Choice</option>
                                                <option>Short Answer</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Difficulty</label>
                                            <select 
                                                value={newDifficulty}
                                                onChange={(e) => setNewDifficulty(e.target.value)}
                                                className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium text-sm"
                                            >
                                                <option>Easy</option>
                                                <option>Medium</option>
                                                <option>Hard</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end border-t border-slate-200 pt-4">
                                <button type="button" onClick={() => setIsAddMode(false)} className="px-5 py-2 rounded-lg font-bold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2 rounded-lg font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all">Append Question</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="p-6 space-y-3 bg-slate-50/30">
                    {test.questions.map((q, index) => (
                        <div key={q.id} className="group bg-white flex items-start sm:items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-emerald-500/30 shadow-sm transition-all flex-col sm:flex-row">
                            <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm shadow-inner hidden sm:flex">
                                Q{index + 1}
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-2 mb-1 sm:hidden">
                                     <span className="font-black text-emerald-600">Q{index + 1}.</span>
                                </div>
                                <h3 className="font-bold text-slate-800 text-base">{q.question_text || q.text}</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="px-2 py-0.5 text-xs font-bold bg-slate-100 text-slate-600 rounded">
                                        {q.question_type || q.type}
                                    </span>
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                                        (q.difficulty || 'Medium') === 'Hard' ? 'bg-rose-100 text-rose-700' : 
                                        (q.difficulty || 'Medium') === 'Medium' ? 'bg-amber-100 text-amber-700' : 
                                        'bg-emerald-100 text-emerald-700'
                                    }`}>
                                        {q.difficulty || 'Medium'}
                                    </span>
                                </div>
                                {q.options && Array.isArray(q.options) && q.options.length > 0 ? (
                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {q.options.map((opt, i) => (
                                            <div key={i} className={`text-xs p-2 rounded-lg border ${opt === q.correct_answer ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                                                {String.fromCharCode(65 + i)}. {opt}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Correct Answer</p>
                                        <p className="text-sm font-bold text-slate-800">{q.correct_answer}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2 self-end sm:self-auto pt-2 sm:pt-0 border-t border-slate-100 sm:border-0 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                                <button className="px-3 py-1.5 text-slate-600 bg-slate-100 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-bold transition-colors">
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteQuestion(q.id)}
                                    className="px-3 py-1.5 text-rose-500 hover:text-white hover:bg-rose-500 bg-rose-50 rounded-lg text-sm font-bold transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    {test.questions.length === 0 && !isAddMode && (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                            <p className="text-slate-500 font-medium pb-2">No questions authored yet.</p>
                            <button onClick={() => setIsAddMode(true)} className="text-emerald-600 font-bold hover:underline">Start adding questions</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPracticeTestEditor;
