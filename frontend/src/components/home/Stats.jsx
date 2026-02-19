import React from 'react';

const Stats = () => {
    const stats = [
        { label: 'Active Learners', value: '10,000' },
        { label: 'Skill Paths', value: '50+' },
        { label: 'Success Rate', value: '92%' },
        { label: 'Job Placements', value: '2,500+' },
    ];

    return (
        <section className="py-12 border-y border-slate-100 bg-white/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center group">
                            <div className="text-3xl lg:text-4xl font-black text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
