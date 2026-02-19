import React from 'react';
import SqlDeveloper from "../../assets/sql_developer.png"
const SkillPaths = () => {
    const paths = [
        {
            title: 'SQL Developer',
            image: SqlDeveloper,
        },
        {
            title: 'Frontend Developer',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: 'Data Structures & Algorithms',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
        }
    ];

    return (
        <section className="py-24 bg-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-white mb-4">Popular Skill Paths</h2>
                    <p className="text-white/80 max-w-2xl mx-auto font-medium">
                        Choose from industry-aligned learning paths
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {paths.map((path, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-3xl aspect-[16/10] mb-6 shadow-2xl">
                                <img 
                                    src={path.image} 
                                    alt={path.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-white text-center group-hover:text-white transition-colors">
                                {path.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillPaths;
