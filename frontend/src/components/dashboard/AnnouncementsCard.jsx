export default function AnnouncementsCard({ announcements }) {
    const getTypeColor = (type) => {
        switch (type) {
            case 'warning': return '#f43f5e'; // rose-500
            case 'success': return '#10b981'; // emerald-500
            case 'info':
            default: return '#3b82f6'; // blue-500
        }
    };

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                    <path d="M22 3L9.218 10.083M11.698 20.334L7 22V13.5L22 3 2 12.5l5 1.5" />
                </svg>
                Announcements
            </h2>

            <div className="flex flex-col gap-4">
                {announcements && announcements.length > 0 ? (
                    announcements.slice(0, 3).map((item, i) => (
                        <div key={item.id || i}>
                            <div className="flex items-start gap-2.5">
                                <span
                                    className="mt-1 block h-2 w-2 shrink-0 rounded-full"
                                    style={{ background: item.dot || getTypeColor(item.type) }}
                                />
                                <div>
                                    <p className="text-xs font-bold text-gray-900">{item.title}</p>
                                    <p className="mt-0.5 text-[11px] leading-relaxed text-gray-400">{item.body}</p>
                                </div>
                            </div>
                            {i < Math.min(announcements.length, 3) - 1 && <hr className="mt-4 border-gray-100" />}
                        </div>
                    ))
                ) : (
                    <p className="text-[11px] text-gray-400 text-center py-2">No active announcements</p>
                )}
            </div>
        </div>
    );
}
