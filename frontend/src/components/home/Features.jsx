import React from 'react';

const steps = [
    {
        number: '01',
        title: 'Learn Structured Module',
        description: 'Follow a carefully designed curriculum with beginner to advanced modules, each building on the last.',
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        iconBg: 'bg-violet-50',
        border: 'border-violet-100',
    },
    {
        number: '02',
        title: 'Take Module & Mastery Tests',
        description: 'Complete all module tests with MCQ-style skills and programming questions to validate your programming knowledge.',
        icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        iconBg: 'bg-blue-50',
        border: 'border-blue-100',
    },
    {
        number: '03',
        title: 'Score 90% & Unlock Next Level!',
        description: 'Achieve mastery by scoring 90% on the level test. Only then does the next level unlock.',
        icon: (
            <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        iconBg: 'bg-emerald-50',
        border: 'border-emerald-100',
    },
];

const flowSteps = [
    { label: 'Module 1', color: 'bg-violet-100 text-violet-700 border-violet-200' },
    { label: 'Module Test', color: 'bg-slate-100 text-slate-600 border-slate-200', arrow: true },
    { label: 'Module 2', color: 'bg-violet-100 text-violet-700 border-violet-200' },
    { label: 'Module Test', color: 'bg-slate-100 text-slate-600 border-slate-200', arrow: true },
    { label: 'Level Mastery Test (90%)', color: 'bg-amber-100 text-amber-700 border-amber-200', arrow: true },
    { label: 'Next Level', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', arrow: true },
];

const Features = () => {
    return (
        <section id="how-it-works" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-3">HOW IT WORKS</span>
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Your Path to Mastery</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base">
                        A structured, test-regulated learning system that ensures you hit a mastery each concept before advancing.
                    </p>
                </div>

                {/* 3-Step Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-14">
                    {steps.map((step, idx) => (
                        <div key={idx} className={`bg-white rounded-2xl p-7 border ${step.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                            <div className={`w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                                {step.icon}
                            </div>
                            <div className="text-xs font-black text-slate-300 mb-2 tracking-widest">STEP {step.number}</div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>

                {/* Mastery Flow Diagram */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="text-center mb-5">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">MASTERY PROGRESSION FLOW</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {flowSteps.map((step, idx) => (
                            <React.Fragment key={idx}>
                                {step.arrow && (
                                    <svg className="w-4 h-4 text-slate-300 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                                <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${step.color}`}>
                                    {step.label}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
