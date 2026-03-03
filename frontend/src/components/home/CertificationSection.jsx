import certification from '../../assets/certification.png';
const checkItems = [
    'Complete all levels in a skill path and generate a professional certificate that validates your mastery. Share it on LinkedIn, attach it to your resume, or showcase it to employers.',
    'Complete Beginner, Intermediate & Advanced levels',
    'Score 90%+ on every level Mastery test',
    'Issued a tamper-evident certificate in PNG',
    'Share directly to LinkedIn or download as PDF',
];

const CertificationSection = () => {
    return (
        <section id="certificates" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-4">CERTIFICATION</span>
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
                            Earn Verified Certificates
                        </h2>
                        <p className="text-slate-500 text-base leading-relaxed mb-8">
                            Complete all levels in a skill path and generate a professional certificate that
                            validates your mastery. Share it on LinkedIn, attach it to your resume, or
                            showcase it to employers.
                        </p>

                        <ul className="space-y-3.5 mb-8">
                            {checkItems.slice(1).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-slate-600 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => window.location.href = '/register'}
                            className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 active:scale-95"
                        >
                            🎓 Start Earning Certificates
                        </button>
                    </div>

                    {/* Right - Certificate Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-violet-100 to-blue-100 rounded-3xl blur-xl opacity-60 pointer-events-none" />
                            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden p-4">
                                <img
                                    src={certification}
                                    alt="LearnX Certificate"
                                    className="w-full max-w-sm rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificationSection;
