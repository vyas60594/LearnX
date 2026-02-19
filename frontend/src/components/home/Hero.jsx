import React from 'react';
import HeroImage from "../../assets/image_hero.png"
const Hero = () => {
    return (
        <section className="relative overflow-hidden py-20 lg:py-32">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-6 ring-1 ring-inset ring-primary/20">
                            Job-Oriented Learning Platform
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-navy tracking-tight leading-[1.1] mb-6">
                            Master Skills That <span className="text-primary italic">Land Jobs</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-10">
                            Build industry-relevant skills through structured learning paths, 
                            level-based content, and performance-driven progression. 
                            No more confusion about "kya padhu job ke liye".
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-navy text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl active:scale-95 group">
                                Start Learning
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                            <button className="bg-white text-navy px-8 py-4 rounded-xl font-bold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95">
                                Explore Paths
                            </button>
                        </div>
                    </div>
                    <div className="relative w-full">
                        <img 
                            src={HeroImage} 
                            alt="Learning Collaboration" 
                            className="relative w-full h-auto block"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
