import { useState, useEffect } from 'react';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';
import { announcementService } from '../services/api';

// ── Tag colour maps ────────────────────────────────────────────
const TAG_STYLES = {
  success: { border: '#22c55e', badge: 'bg-green-50 text-green-600', icon: 'bg-green-50 text-green-500', tag: 'Update' },
  warning: { border: '#f97316', badge: 'bg-orange-50 text-orange-500', icon: 'bg-orange-50 text-orange-400', tag: 'Alert' },
  info: { border: '#3b82f6', badge: 'bg-blue-50 text-blue-600', icon: 'bg-blue-50 text-blue-500', tag: 'Notice' },
};

// ── Icons ──────────────────────────────────────────────────────
function AnnouncementIcon({ type, className }) {
  const props = {
    width: '18', height: '18',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const icons = {
    warning: (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    success: (
      <svg {...props}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    info: (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  };

  return <span className={className}>{icons[type] ?? icons.info}</span>;
}

// ── Single announcement card ───────────────────────────────────
function AnnouncementCard({ item }) {
  const style = TAG_STYLES[item.type] ?? TAG_STYLES.info;
  const dateStr = new Date(item.created_at).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div
      className="relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
      style={{ borderColor: style.border, borderWidth: '1px' }}
    >
      <div className="flex items-start gap-5 p-6">

        {/* ── Category icon bubble ── */}
        <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.icon} transition-transform duration-300 group-hover:scale-110`}>
          <AnnouncementIcon type={item.type} />
        </div>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">

          {/* Tag + date row */}
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-bold tracking-wide ${style.badge}`}>
              {style.tag}
            </span>
            <span className="text-[12px] font-semibold text-slate-400">{dateStr}</span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-slate-900 mb-1.5 leading-snug">
            {item.title}
          </h3>

          {/* Body */}
          <p className="text-sm text-slate-500 leading-relaxed">
            {item.body}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function Announcements() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      const data = await announcementService.getAll();
      setAnnouncements(data);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="announcements" />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto lg:pl-72">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">

          {/* ── Page header ── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1.5">
              {/* Megaphone icon */}
              <svg
                width="28" height="28"
                viewBox="0 0 24 24" fill="none"
                stroke="#4f46e5" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M3 11l19-9-9 19-2-8-8-2z" />
              </svg>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Announcements</h1>
            </div>
            <p className="text-slate-500 font-medium text-[15px]">
              Platform updates, new features, and important notices.
            </p>
          </div>

          {/* ── Cards list ── */}
          {isLoading ? (
             <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
             </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-3xl">
                {announcements.length > 0 ? (
                    announcements.map((item) => (
                        <AnnouncementCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center">
                        <p className="text-slate-400 font-medium">No announcements found at this time.</p>
                    </div>
                )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
