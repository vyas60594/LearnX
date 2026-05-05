import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { adminService } from '../../services/api';

const AdminSkillPathEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [path, setPath] = useState(null);
    const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
    const [isLevelAddOpen, setIsLevelAddOpen] = useState(false);
    
    // Form States
    const [newLevelTitle, setNewLevelTitle] = useState('');
    const [activeLevelIdx, setActiveLevelIdx] = useState(null);
    const [newModuleTitle, setNewModuleTitle] = useState('');
    const [newModuleType, setNewModuleType] = useState('module');

    const [editingQuestions, setEditingQuestions] = useState(null); // { lIdx, mIdx, isMastery }
    const [editingLesson, setEditingLesson] = useState(null); // { lIdx, mIdx }

    const fetchPathData = async () => {
        try {
            setIsLoading(true);
            const data = await adminService.getSkillPathById(id);
            // Ensure content has levels array
            if (!data.content) data.content = { levels: [] };
            if (!data.content.levels) data.content.levels = [];
            setPath(data);
        } catch (error) {
            console.error('Failed to fetch path:', error);
            toast.error('Failed to load path data');
            navigate('/admin/skill-paths');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPathData();
    }, [id]);

    const handleSave = async () => {
        try {
            // Calculate counts
            let mCount = 0;
            path.content.levels.forEach(l => {
                const mods = l.modules || [];
                mCount += mods.length;
                if (l.masteryTest) mCount += 1;
            });

            await adminService.updateSkillPath(id, {
                ...path,
                modules_count: mCount,
                levels_count: path.content.levels.length
            });
            toast.success('Skill Path saved successfully');
        } catch (error) {
            toast.error('Failed to save changes');
        }
    };

    const handleAddLevel = (e) => {
        e.preventDefault();
        const newLevel = {
            id: Date.now(),
            title: newLevelTitle,
            badge: 'Basic',
            description: 'Level description goes here...',
            modules: [],
            masteryTest: null
        };
        const updatedPath = { ...path };
        updatedPath.content.levels.push(newLevel);
        setPath(updatedPath);
        setNewLevelTitle('');
        setIsLevelAddOpen(false);
        toast.success(`Level "${newLevelTitle}" added`);
    };

    const handleAddModule = (e) => {
        e.preventDefault();
        const newModule = {
            id: Date.now(),
            title: newModuleTitle,
            type: newModuleType,
            duration: '30 min',
            desc: 'Brief overview...',
            longContent: 'Add your detailed lesson content here...',
            topics: [],
            questions: newModuleType === 'test' ? [] : undefined,
            color: newModuleType === 'test' ? 'amber' : 'indigo'
        };

        const updatedPath = { ...path };
        if (!updatedPath.content.levels[activeLevelIdx].modules) {
            updatedPath.content.levels[activeLevelIdx].modules = [];
        }
        updatedPath.content.levels[activeLevelIdx].modules.push(newModule);
        
        setPath(updatedPath);
        setNewModuleTitle('');
        setIsAddModuleOpen(false);
        toast.success(`Module added`);
    };

    const handleAddMasteryTest = (lIdx) => {
        const updated = { ...path };
        updated.content.levels[lIdx].masteryTest = {
            id: Date.now(),
            title: 'Level Mastery Test',
            score: 90,
            questions: []
        };
        setPath(updated);
        toast.success('Mastery Test added to level');
    };

    const handleDeleteModule = (levelIdx, moduleIdx) => {
        const updatedPath = { ...path };
        updatedPath.content.levels[levelIdx].modules.splice(moduleIdx, 1);
        setPath(updatedPath);
        toast.success('Module removed');
    };

    const handleDeleteLevel = (levelIdx) => {
        if (!window.confirm('Delete this entire level?')) return;
        const updatedPath = { ...path };
        updatedPath.content.levels.splice(levelIdx, 1);
        setPath(updatedPath);
        toast.success('Level removed');
    };

    const handleAddQuestion = (lIdx, mIdx, isMastery = false) => {
        const updated = { ...path };
        const test = isMastery 
            ? updated.content.levels[lIdx].masteryTest 
            : updated.content.levels[lIdx].modules[mIdx];
        
        if (!test.questions) test.questions = [];
        
        test.questions.push({
            question: 'New Question?',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correct: 0
        });
        setPath(updated);
    };

    const updateQuestion = (lIdx, mIdx, qIdx, field, value, isMastery = false) => {
        const updated = { ...path };
        const test = isMastery 
            ? updated.content.levels[lIdx].masteryTest 
            : updated.content.levels[lIdx].modules[mIdx];
            
        test.questions[qIdx][field] = value;
        setPath(updated);
    };

    const deleteQuestion = (lIdx, mIdx, qIdx, isMastery = false) => {
        const updated = { ...path };
        const test = isMastery 
            ? updated.content.levels[lIdx].masteryTest 
            : updated.content.levels[lIdx].modules[mIdx];
            
        test.questions.splice(qIdx, 1);
        setPath(updated);
    };

    if (isLoading || !path) {
        return <div className="p-12 text-center font-bold text-slate-500">Loading editor...</div>;
    }

    // If editing lesson content
    if (editingLesson) {
        const { lIdx, mIdx } = editingLesson;
        const module = path.content.levels[lIdx].modules[mIdx];

        return (
            <div className="space-y-6 max-w-5xl mx-auto pb-20">
                <div className="flex items-center justify-between">
                    <div>
                        <button 
                            onClick={() => setEditingLesson(null)}
                            className="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" /></svg>
                            Back to Curriculum
                        </button>
                        <h2 className="text-2xl font-black text-slate-900">Edit Lesson Content</h2>
                        <p className="text-slate-500 font-medium">Module: {module.title}</p>
                    </div>
                    <button 
                        onClick={() => setEditingLesson(null)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold"
                    >
                        Done Editing
                    </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-4">Lesson Body (Text/HTML)</label>
                    <textarea 
                        value={module.longContent || ''}
                        onChange={(e) => {
                            const updated = {...path};
                            updated.content.levels[lIdx].modules[mIdx].longContent = e.target.value;
                            setPath(updated);
                        }}
                        placeholder="Write your lesson content here..."
                        className="w-full h-[500px] p-6 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 border-dashed"
                    />
                </div>
            </div>
        );
    }

    // If editing questions, show the question editor view
    if (editingQuestions) {
        const { lIdx, mIdx, isMastery } = editingQuestions;
        const test = isMastery 
            ? path.content.levels[lIdx].masteryTest 
            : path.content.levels[lIdx].modules[mIdx];
        const questions = test.questions || [];

        return (
            <div className="space-y-6 max-w-4xl mx-auto pb-20">
                <div className="flex items-center justify-between">
                    <div>
                        <button 
                            onClick={() => setEditingQuestions(null)}
                            className="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" /></svg>
                            Back to Curriculum
                        </button>
                        <h2 className="text-2xl font-black text-slate-900">Edit {isMastery ? 'Mastery Test' : 'Module Test'}</h2>
                        <p className="text-slate-500 font-medium">Target: {test.title}</p>
                    </div>
                    <button 
                        onClick={() => handleAddQuestion(lIdx, mIdx, isMastery)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                    >
                        + Add Question
                    </button>
                </div>

                <div className="space-y-6">
                    {questions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Question {qIdx + 1}</label>
                                    <textarea 
                                        value={q.question}
                                        onChange={(e) => updateQuestion(lIdx, mIdx, qIdx, 'question', e.target.value, isMastery)}
                                        className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                        rows="2"
                                    />
                                </div>
                                <button 
                                    onClick={() => deleteQuestion(lIdx, mIdx, qIdx, isMastery)}
                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className="flex items-center gap-3">
                                        <input 
                                            type="radio"
                                            checked={q.correct === oIdx}
                                            onChange={() => updateQuestion(lIdx, mIdx, qIdx, 'correct', oIdx, isMastery)}
                                            className="w-4 h-4 text-indigo-600"
                                        />
                                        <input 
                                            value={opt}
                                            onChange={(e) => {
                                                const newOpts = [...q.options];
                                                newOpts[oIdx] = e.target.value;
                                                updateQuestion(lIdx, mIdx, qIdx, 'options', newOpts, isMastery);
                                            }}
                                            className={`flex-1 p-2.5 rounded-lg border text-sm font-medium focus:outline-none ${q.correct === oIdx ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {questions.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                            <p className="font-bold text-slate-400 uppercase tracking-widest">No questions added yet.</p>
                            <button 
                                onClick={() => handleAddQuestion(lIdx, mIdx, isMastery)}
                                className="mt-4 text-indigo-600 font-black"
                            >
                                + Create First Question
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-20">
            {/* Header & Breadcrumbs */}
            <div>
                <button onClick={() => navigate('/admin/skill-paths')} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1 mb-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Skill Paths
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <input 
                                value={path.title} 
                                onChange={(e) => setPath({...path, title: e.target.value})}
                                placeholder="Skill Path Title"
                                className="text-2xl font-black text-slate-900 tracking-tight bg-transparent border-b border-dashed border-slate-300 focus:border-indigo-500 focus:outline-none"
                            />
                            <div className="flex items-center gap-2">
                                {path.image_url && <img src={path.image_url} alt="Cover" className="h-8 w-8 object-cover rounded shadow-sm" />}
                                <label className="cursor-pointer text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors">
                                    Upload Photo
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={async (e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                try {
                                                    toast.loading('Uploading...', { id: 'upload' });
                                                    const res = await adminService.uploadImage(e.target.files[0]);
                                                    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
                                                    setPath({...path, image_url: baseUrl + res.imageUrl});
                                                    toast.success('Image uploaded!', { id: 'upload' });
                                                } catch (err) {
                                                    toast.error('Upload failed', { id: 'upload' });
                                                }
                                            }
                                        }} 
                                    />
                                </label>
                            </div>
                            <select 
                                value={path.status}
                                onChange={(e) => setPath({...path, status: e.target.value})}
                                className={`px-2.5 py-1 text-xs font-bold rounded-full cursor-pointer focus:outline-none ${path.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                        <p className="text-slate-500 font-medium mt-1">Editing path ID: {id}</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleSave}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                            Save Path
                        </button>
                    </div>
                </div>
            </div>

            {/* Curriculum Builder */}
            <div className="space-y-8">
                {path.content.levels.map((level, lIdx) => (
                    <div key={level.id} className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-black">L{lIdx + 1}</span>
                                    <input 
                                        value={level.title}
                                        onChange={(e) => {
                                            const updated = {...path};
                                            updated.content.levels[lIdx].title = e.target.value;
                                            setPath(updated);
                                        }}
                                        className="text-lg font-black text-slate-800 bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>
                                <input 
                                    value={level.description}
                                    onChange={(e) => {
                                        const updated = {...path};
                                        updated.content.levels[lIdx].description = e.target.value;
                                        setPath(updated);
                                    }}
                                    className="text-sm text-slate-500 font-medium mt-1 w-full bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setActiveLevelIdx(lIdx);
                                        setIsAddModuleOpen(true);
                                    }}
                                    className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                >
                                    + Add Module
                                </button>
                                <button
                                    onClick={() => handleDeleteLevel(lIdx)}
                                    className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    Delete Level
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-3">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Learning Modules</div>
                            {level.modules && level.modules.map((module, mIdx) => (
                                <div key={module.id} className="group flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-indigo-500/30 hover:bg-slate-50/50 transition-all">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs">
                                        {mIdx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <input 
                                                value={module.title}
                                                onChange={(e) => {
                                                    const updated = {...path};
                                                    updated.content.levels[lIdx].modules[mIdx].title = e.target.value;
                                                    setPath(updated);
                                                }}
                                                className="font-bold text-slate-800 bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none"
                                            />
                                            {module.type === 'test' ? (
                                                <button 
                                                    onClick={() => setEditingQuestions({ lIdx, mIdx, isMastery: false })}
                                                    className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded transition-all bg-amber-100 text-amber-700 hover:bg-amber-200"
                                                >
                                                    Test → Edit Qs
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => setEditingLesson({ lIdx, mIdx })}
                                                    className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded transition-all bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                                                >
                                                    Module → Edit Content
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                             <input 
                                                value={module.duration}
                                                onChange={(e) => {
                                                    const updated = {...path};
                                                    updated.content.levels[lIdx].modules[mIdx].duration = e.target.value;
                                                    setPath(updated);
                                                }}
                                                className="text-[10px] font-bold text-slate-400 w-16 bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none"
                                             />
                                             <input 
                                                value={module.desc}
                                                onChange={(e) => {
                                                    const updated = {...path};
                                                    updated.content.levels[lIdx].modules[mIdx].desc = e.target.value;
                                                    setPath(updated);
                                                }}
                                                className="text-[10px] font-bold text-slate-400 flex-1 bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none"
                                             />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteModule(lIdx, mIdx)}
                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))}
                            
                            {/* Level Mastery Test Section */}
                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <div className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-3 px-1">Phase Mastery Verification</div>
                                {level.masteryTest ? (
                                    <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                            </div>
                                            <div>
                                                <input 
                                                    value={level.masteryTest.title}
                                                    onChange={(e) => {
                                                        const updated = {...path};
                                                        updated.content.levels[lIdx].masteryTest.title = e.target.value;
                                                        setPath(updated);
                                                    }}
                                                    className="font-black text-slate-800 bg-transparent border-b border-transparent focus:border-amber-500 focus:outline-none"
                                                />
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] font-bold text-slate-500">{level.masteryTest.questions?.length || 0} Questions</span>
                                                    <button 
                                                        onClick={() => setEditingQuestions({ lIdx, mIdx: null, isMastery: true })}
                                                        className="text-[10px] font-black text-indigo-600 hover:underline"
                                                    >
                                                        Edit Questions
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const updated = {...path};
                                                updated.content.levels[lIdx].masteryTest = null;
                                                setPath(updated);
                                            }}
                                            className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => handleAddMasteryTest(lIdx)}
                                        className="w-full py-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-widest hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition-all"
                                    >
                                        + Set Phase Mastery Test
                                    </button>
                                )}
                            </div>

                            {(!level.modules || level.modules.length === 0) && (
                                <div className="text-center py-8 text-slate-400 text-sm font-medium border-2 border-dashed border-slate-100 rounded-xl mt-4">
                                    No modules in this level yet.
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <button 
                    onClick={() => setIsLevelAddOpen(true)}
                    className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-600 hover:bg-slate-50 transition-all"
                >
                    + Add New Phase
                </button>
            </div>

            {/* Add Level Modal */}
            {isLevelAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-black text-slate-800">Add New Phase</h3>
                        </div>
                        <form onSubmit={handleAddLevel} className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-tight">Phase Title</label>
                                <input
                                    required
                                    value={newLevelTitle}
                                    onChange={(e) => setNewLevelTitle(e.target.value)}
                                    placeholder="e.g. Intermediate Development"
                                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                />
                            </div>
                            <div className="flex gap-2 justify-end pt-4">
                                <button type="button" onClick={() => setIsLevelAddOpen(false)} className="px-4 py-2 text-slate-600 font-bold">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold">Add Phase</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Module Modal */}
            {isAddModuleOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-black text-slate-800">Add Module to Level {activeLevelIdx + 1}</h3>
                        </div>
                        <form onSubmit={handleAddModule} className="p-6 space-y-4 bg-slate-50/50">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Module Title</label>
                                <input
                                    required
                                    type="text"
                                    value={newModuleTitle}
                                    onChange={(e) => setNewModuleTitle(e.target.value)}
                                    placeholder="e.g. Advanced State Management"
                                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
                                <select 
                                    value={newModuleType}
                                    onChange={(e) => setNewModuleType(e.target.value)}
                                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                >
                                    <option value="module">Learning Module</option>
                                    <option value="test">Module Test</option>
                                </select>
                            </div>
                            <div className="flex gap-3 justify-end pt-4">
                                <button type="button" onClick={() => setIsAddModuleOpen(false)} className="px-5 py-2.5 rounded-xl font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all">Add Module</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSkillPathEditor;
