import { Link } from "react-router";
import image1 from "../../assets/image1.png";
const Hero = () => {
    return (
        <section className="relative bg-white overflow-hidden py-12 lg:py-16">
            {/* Subtle background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:48px_48px] opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Content */}
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-50 text-primary mb-6 border border-violet-200">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Free Mastery-Based Learning Platform
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                            Master Skills.<br />
                            <span className="text-primary">Unlock Careers.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-base text-slate-500 leading-relaxed max-w-lg mb-8">
                            A mastery-based learning platform designed for CEIT students and job seekers.
                        </p>

                        {/* Feature Badges */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Structured Modules
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Score 90% to Advance
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Earn Certificates
                            </span>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-10">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 active:scale-95 group"
                            >
                                Start Learning Free →
                            </Link>
                            <a
                                href="#skill-paths"
                                className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-bold text-sm border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95"
                            >
                                View Skill Paths
                            </a>
                        </div>

                        {/* Social proof */}
                        <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Built for CEIT Students
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Mastery-Based Progression
                            </span>
                        </div>
                    </div>

                    {/* Right Card / Illustration */}
                    <div className="relative">
                        {/* 90% Mastery Badge */}
                        <div className="absolute top-4 right-4 z-20 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 border border-slate-100">
                            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs font-black text-slate-900">90% Mastery Reached</div>
                            </div>
                        </div>

                        {/* "Certificate Earned" badge */}
                        <div className="absolute bottom-16 left-4 z-20 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 border border-slate-100">
                            <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <div className="text-xs font-bold text-slate-800">Certificate Earned</div>
                        </div>

                        {/* Hero Image */}
                        <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl overflow-hidden border border-slate-100 shadow-xl">
                            <img
                                src={image1}
                                alt="LearnX Mastery Learning"
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
