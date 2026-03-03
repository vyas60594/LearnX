import aptitude from "../../assets/aptitude.png";
import pythondev from "../../assets/pythondev.png";
import sql from "../../assets/sql.png";

const paths = [
    {
        title: 'Python Developer',
        description: 'From basic syntax to building real-world Python applications.',
        image: pythondev,
        tag1: 'Full Stack',
        tag2: 'Beginner',
        modules: '10 Modules',
        levels: '5 Levels',
        tagColor: 'bg-violet-100 text-violet-700',
        tag2Color: 'bg-blue-100 text-blue-700',
    },
    {
        title: 'SQL Developer',
        description: 'Master relational databases and advanced SQL scripting.',
        image: sql,
        tag1: 'Backend',
        tag2: 'Intermediate',
        modules: '12 Modules',
        levels: '4 Levels',
        tagColor: 'bg-orange-100 text-orange-700',
        tag2Color: 'bg-sky-100 text-sky-700',
    },
    {
        title: 'Data Structures & Algorithms',
        description: 'Build problem-solving skills designed for tech interview success.',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
        tag1: 'DSA',
        tag2: 'Intermediate',
        modules: '15 Modules',
        levels: '6 Levels',
        tagColor: 'bg-teal-100 text-teal-700',
        tag2Color: 'bg-sky-100 text-sky-700',
    },
    {
        title: 'Aptitude Preparation',
        description: 'Score more in placement exams with structured aptitude & reasoning modules.',
        image: aptitude,
        tag1: 'Aptitude',
        tag2: 'Beginner',
        modules: '8 Modules',
        levels: '3 Levels',
        tagColor: 'bg-rose-100 text-rose-700',
        tag2Color: 'bg-blue-100 text-blue-700',
    },
];

const SkillPaths = () => {
    return (
        <section id="skill-paths" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-3">SKILL PATHS</span>
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Choose Your Learning Path</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base">
                        Structured, job-oriented skill paths designed for CEIT students and upcoming professionals.
                    </p>
                </div>

                {/* Path Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paths.map((path, idx) => (
                        <div
                            key={idx}
                            className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            {/* Card Image */}
                            <div className="relative overflow-hidden aspect-[16/9]">
                                <img
                                    src={path.image}
                                    alt={path.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                                {/* Tags over image */}
                                <div className="absolute top-3 left-3 flex gap-1.5">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${path.tagColor}`}>{path.tag1}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${path.tag2Color}`}>{path.tag2}</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{path.title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">{path.description}</p>

                                {/* Stats Row */}
                                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                                        </svg>
                                        {path.modules}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        {path.levels}
                                    </span>
                                </div>

                                {/* Explore Button */}
                                <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary transition-colors active:scale-95 flex items-center justify-center gap-1.5 group/btn">
                                    Explore Path
                                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillPaths;
