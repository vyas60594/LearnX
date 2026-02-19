import React from 'react';

const CTASection = () => {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center border border-slate-200 p-12 rounded-[3.5rem] glass shadow-2xl shadow-primary/5">
                <h2 className="text-4xl font-extrabold text-navy mb-6">Ready to Start Your Journey?</h2>
                <p className="text-slate-600 mb-10 text-lg font-medium">Join thousands of learners achieving their career goals</p>
                <button className="bg-navy text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 mx-auto hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1 active:scale-95 group">
                    Create Free Account
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default CTASection;
