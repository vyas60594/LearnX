const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-primary via-violet-700 to-blue-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-extrabold text-white mb-4">
                    Ready to Master Your Skills?
                </h2>
                <p className="text-violet-200 text-base mb-10 max-w-xl mx-auto">
                    Join thousands of CEIT students building job-ready skills through structured mastery-based learning.
                </p>
                <button
                    onClick={() => window.location.href = '/register'}
                    className="inline-flex items-center gap-2.5 bg-white text-primary px-8 py-4 rounded-xl font-black text-base hover:bg-violet-50 transition-all shadow-xl hover:shadow-2xl active:scale-95 group"
                >
                    Start Learning Free — No Credit Card Required →
                </button>
            </div>
        </section>
    );
};

export default CTASection;
