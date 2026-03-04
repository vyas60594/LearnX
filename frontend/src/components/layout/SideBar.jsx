// =============================================================
//  SideBar.jsx
//  Fixed left navigation panel.
//  On desktop: always visible (256 px wide).
//  On mobile:  slides in/out via the isOpen prop.
// =============================================================

import { Link } from 'react-router';

// =============================================================
//  NAV ITEMS
//  Each entry maps to one clickable row in the sidebar.
//  `to`      → the React Router path
//  `key`     → matched against the `activePage` prop
//  `label`   → display text
//  `icon`    → which SVG to render (handled by NavIcon below)
// =============================================================

const MAIN_NAV = [
  { key: 'dashboard', label: 'Dashboard', to: '/Dashboard', icon: 'dashboard' },
  { key: 'skill-paths', label: 'Skill Paths', to: '/skill-paths', icon: 'skill-paths' },
  { key: 'practice-tests', label: 'Practice Tests', to: '/practice-tests', icon: 'practice-tests' },
  { key: 'progress', label: 'Progress', to: '/progress-reports', icon: 'progress' },
  { key: 'certificates', label: 'Certificates', to: '/certificates', icon: 'certificates' },
  { key: 'announcements', label: 'Announcements', to: '/announcements', icon: 'announcements' },
  { key: 'profile', label: 'Profile', to: '/profile', icon: 'profile' },
];

const BOTTOM_NAV = [
  { key: 'settings', label: 'Settings', to: '/settings', icon: 'settings' },
  { key: 'logout', label: 'Logout', to: '/logout', icon: 'logout' },
];

// =============================================================
//  COMPONENT
// =============================================================

const SideBar = ({ isOpen, setIsOpen, activePage = 'dashboard' }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-100 bg-white transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
    >

      {/* ── Logo header ── */}
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          {/* "LX" square logo mark */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-extrabold text-white shadow">
            LX
          </div>
          <span className="text-lg font-bold text-slate-900">LearnX</span>
        </div>

        {/* Collapse chevron (desktop) / close X (mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {/* Chevron left icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Main navigation links ── */}
      <nav className="no-scrollbar flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-0.5">
          {MAIN_NAV.map((item) => (
            <li key={item.key}>
              <NavItem item={item} isActive={activePage === item.key} />
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Bottom: Settings + Logout ── */}
      <div className="border-t border-slate-100 px-3 py-4">
        <ul className="space-y-0.5">
          {BOTTOM_NAV.map((item) => (
            <li key={item.key}>
              <NavItem item={item} isActive={activePage === item.key} />
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
};

// =============================================================
//  NAV ITEM
//  A single clickable row — highlighted when active.
// =============================================================

function NavItem({ item, isActive }) {
  const base = 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all';
  const active = 'bg-indigo-50 text-indigo-600';
  const idle = 'text-slate-600 hover:bg-slate-50 hover:text-slate-900';

  return (
    <Link to={item.to} className={`${base} ${isActive ? active : idle}`}>
      <NavIcon name={item.icon} isActive={isActive} />
      {item.label}
    </Link>
  );
}

// =============================================================
//  NAV ICON
//  Returns the correct SVG for each nav item.
//  Active icons are drawn in indigo; idle icons in slate-400.
// =============================================================

function NavIcon({ name, isActive }) {
  const color = isActive ? '#4f46e5' : '#94a3b8'; // indigo-600 : slate-400
  const props = {
    width: '18', height: '18',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '1.9',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const icons = {
    // Four squares (app grid)
    'dashboard': (
      <svg {...props}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    // Open book
    'skill-paths': (
      <svg {...props}>
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    // Science flask / beaker
    'practice-tests': (
      <svg {...props}>
        <path d="M9 3h6M9 3v7.5L5.5 17A2 2 0 007.3 20h9.4a2 2 0 001.8-3L15 10.5V3" />
      </svg>
    ),
    // Trending up arrow
    'progress': (
      <svg {...props}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    // Ribbon / award
    'certificates': (
      <svg {...props}>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
      </svg>
    ),
    // Megaphone
    'announcements': (
      <svg {...props}>
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    // User silhouette
    'profile': (
      <svg {...props}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    // Gear / cog
    'settings': (
      <svg {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    // Arrow right out of box (logout)
    'logout': (
      <svg {...props}>
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
  };

  return icons[name] ?? null;
}

export default SideBar;
