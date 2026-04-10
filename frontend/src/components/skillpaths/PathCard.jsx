import { useNavigate } from 'react-router';

function InfoIcon({ icon, label }) {
    const icons = {
        book: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
        ),
        levels: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        award: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
        )
    };

    return (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
            <span className="text-slate-300">{icons[icon]}</span>
            <span className="uppercase tracking-wider">{label}</span>
        </div>
    );
}

export default function PathCard({ path }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/skill-path/${path.id}`)}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
        >
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                    src={path.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                    alt={path.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute left-4 top-4 flex gap-2">
                    {path.tags && Array.isArray(path.tags) ? path.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow-lg"
                        >
                            {tag}
                        </span>
                    )) : (
                        <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow-lg">
                            New Path
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-col p-6 flex-1">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {path.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3">
                    {path.description || 'Start your learning journey with this comprehensive skill path.'}
                </p>

                <div className="mt-6 flex flex-wrap gap-5">
                    <InfoIcon icon="book" label={`${path.modules_count || 0} Modules`} />
                    <InfoIcon icon="levels" label={`${path.levels_count || 0} Levels`} />
                    <InfoIcon icon="award" label="Certificate" />
                </div>

                <div className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 shadow-lg shadow-slate-900/10">
                    Start Path
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
