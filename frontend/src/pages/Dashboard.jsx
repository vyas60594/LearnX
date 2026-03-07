// =============================================================
//  Dashboard.jsx
//  Main dashboard page — shown after the user logs in.
//  Layout: Sidebar (left) + TopBar (top) + page content (right)
// =============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router';
import aptImg from '../assets/aptitude.png';
import dsaImg from '../assets/image1.png';
import pythonImg from '../assets/pythondev.png';
import sql from '../assets/sql.png';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';

// =============================================================
//  STATIC DATA
//  In a real app these would come from API calls.
//  Keeping them here keeps the JSX clean.
// =============================================================

const STAT_CARDS = [
  { icon: 'check', color: '#10b981', value: '5/45', label: 'Modules Completed' },
  { icon: 'book', color: '#6366f1', value: '1/4', label: 'Active Paths' },
  { icon: 'target', color: '#06b6d4', value: '3', label: 'Tests Passed' },
  { icon: 'award', color: '#f59e0b', value: '0', label: 'Certificates' },
];

const SKILL_PATHS = [
  { name: 'Python Developer', img: pythonImg, modules: '5/12', pct: 42, color: '#4f46e5' },
  { name: 'SQL Developer', img: sql, modules: '0/10', pct: 0, color: '#6366f1' },
  { name: 'Data Structures & Algorithms', img: dsaImg, modules: '0/14', pct: 0, color: '#8b5cf6' },
  { name: 'Aptitude Preparation', img: aptImg, modules: '0/9', pct: 0, color: '#a78bfa' },
];

const RECENT_ACTIVITY = [
  { type: 'completed', label: 'Python Basics & Setup', time: '2 hours ago', color: '#10b981' },
  { type: 'started', label: 'Functions & Scope', time: '1 day ago', color: '#6366f1' },
  { type: 'passed', label: 'Control Flow — Module Test', time: '2 days ago', color: '#f59e0b' },
  { type: 'earned', label: 'Python Beginner Badge', time: '3 days ago', color: '#8b5cf6' },
];

const UPCOMING_TESTS = [
  { title: 'Functions & Scope Test', path: 'Python Developer', tag: 'Module Test', tagColor: '#6366f1', when: 'After module completion' },
  { title: 'Beginner Mastery Test', path: 'Python Developer', tag: 'Mastery Test', tagColor: '#f59e0b', when: 'After all modules' },
  { title: 'Arrays & Strings Test', path: 'DSA', tag: 'Module Test', tagColor: '#6366f1', when: 'Available now' },
];

const ANNOUNCEMENTS = [
  {
    dot: '#10b981',
    title: 'New Skill Path: React Developer',
    body: 'We are excited to announce the upcoming React Developer skill path, launching ne…',
  },
  {
    dot: '#f59e0b',
    title: 'System Maintenance — March 5',
    body: 'LearnX will undergo scheduled maintenance on March 5, 2026 from 2:00 AM to 4:00 …',
  },
];

// =============================================================
//  MAIN PAGE COMPONENT
// =============================================================

export default function Dashboard() {
  // Controls whether the mobile sidebar drawer is open
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* ── Left sidebar navigation ── */}
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="dashboard" />

      {/* ── Dark backdrop shown only on mobile when sidebar is open ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── Main scroll area (to the right of the 256 px sidebar) ── */}
      <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto lg:pl-64">

        {/* Sticky top bar with search + user info */}
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page body */}
        <main className="flex-1 bg-white px-4 py-6 sm:px-6 lg:px-8 sm:py-7">

          {/* ── Welcome heading + Browse Paths button ── */}
          <WelcomeHeader />

          {/* ── Four summary stat cards ── */}
          <StatCardsRow />

          {/* ── Middle row: circle progress (left) + skill paths list (right) ── */}
          <div className="mb-5 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
            <OverallProgressCard />
            <ActiveSkillPathsCard />
          </div>

          {/* ── Bottom row: recent activity (left) + tests & announcements (right) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
            <RecentActivityCard />

            {/* Right column — two stacked cards */}
            <div className="flex flex-col gap-5">
              <UpcomingTestsCard />
              <AnnouncementsCard />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

// =============================================================
//  PAGE SECTION COMPONENTS
//  Each named function = one visible section of the page.
// =============================================================

// "Welcome back, Arjun 👋" heading + Browse Paths button
function WelcomeHeader() {
  const navigate = useNavigate();
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Welcome back, Arjun&nbsp;👋
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Continue your learning journey. You're making great progress!
        </p>
      </div>

      <button onClick={() => navigate("/skill-paths")} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 active:scale-95 transition-all">
        {/* 4-square grid icon */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
        Browse Paths
      </button>
    </div>
  );
}

// Four white cards showing key numbers at a glance
function StatCardsRow() {
  return (
    <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_CARDS.map((card) => (
        <StatCard key={card.label} card={card} />
      ))}
    </div>
  );
}

// White card with circular SVG ring showing 11% progress
function OverallProgressCard() {
  const completed = 5;
  const total = 45;
  const pct = Math.round((completed / total) * 100); // 11 %

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
      <p className="mb-4 text-sm font-semibold text-gray-600">Overall Progress</p>

      {/* Circular SVG progress ring */}
      <CircularRing pct={pct} />

      <p className="mt-4 text-sm font-semibold text-gray-700">{completed} of {total} modules</p>
      <p className="mt-1 text-xs text-gray-400">Keep going! You're doing great.</p>
    </div>
  );
}

// White card listing all enrolled paths with progress bars
function ActiveSkillPathsCard() {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header row */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Active Skill Paths</h2>
        <button onClick={() => navigate("/skill-paths")} className="flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:underline">
          View All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* One row per skill path */}
      <div className="flex flex-col divide-y divide-gray-50">
        {SKILL_PATHS.map((path) => (
          <SkillPathRow
            key={path.name}
            path={path}
            onClick={() => navigate("/skill-paths")}
          />
        ))}
      </div>
    </div>
  );
}

// White card with the 4 most recent learning events
function RecentActivityCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header row */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          {/* Small clock icon */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Last 7 days
        </span>
      </div>

      {/* Activity list */}
      <div className="flex flex-col gap-5">
        {RECENT_ACTIVITY.map((item, i) => (
          <ActivityItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

// White card listing upcoming tests the student should prepare for
function UpcomingTestsCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900">
        <span className="text-amber-400">⚡</span> Upcoming Tests
      </h2>

      <div className="flex flex-col gap-4">
        {UPCOMING_TESTS.map((test, i) => (
          <div key={i}>
            <p className="text-sm font-bold text-gray-900">{test.title}</p>
            <p className="mb-2 mt-0.5 text-xs text-gray-400">{test.path}</p>

            {/* Coloured pill badge + when text */}
            <div className="flex items-center gap-2">
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                style={{ background: `${test.tagColor}20`, color: test.tagColor }}
              >
                {test.tag}
              </span>
              <span className="text-xs text-gray-400">{test.when}</span>
            </div>

            {/* Thin divider between items (skip after last) */}
            {i < UPCOMING_TESTS.length - 1 && <hr className="mt-4 border-gray-100" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// White card with platform announcements
function AnnouncementsCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900">
        {/* Megaphone / send icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
          <path d="M22 3L9.218 10.083M11.698 20.334L7 22V13.5L22 3 2 12.5l5 1.5" />
        </svg>
        Announcements
      </h2>

      <div className="flex flex-col gap-4">
        {ANNOUNCEMENTS.map((item, i) => (
          <div key={i}>
            <div className="flex items-start gap-2.5">
              {/* Coloured status dot */}
              <span
                className="mt-1 block h-2 w-2 shrink-0 rounded-full"
                style={{ background: item.dot }}
              />
              <div>
                <p className="text-xs font-bold text-gray-900">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-gray-400">{item.body}</p>
              </div>
            </div>
            {i < ANNOUNCEMENTS.length - 1 && <hr className="mt-4 border-gray-100" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================
//  REUSABLE SMALL COMPONENTS
// =============================================================
  
// Single stat summary card (icon + value + label)
function StatCard({ card }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Coloured circle icon */}
      <StatIcon type={card.icon} color={card.color} />
      <div>
        <p className="text-2xl font-extrabold leading-none text-gray-900">{card.value}</p>
        <p className="mt-1.5 text-xs text-gray-400">{card.label}</p>
      </div>
    </div>
  );
}

// Single row in the Active Skill Paths list
function SkillPathRow({ path, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 py-3 transition-colors hover:bg-slate-50/50 rounded-lg px-2 -mx-2"
    >
      {/* Square course thumbnail image */}
      <img
        src={path.img}
        alt={path.name}
        className="h-9 w-9 shrink-0 rounded-lg object-cover"
        onError={(e) => {
          // Fallback: coloured square if image fails to load
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      {/* Fallback coloured square (hidden unless image fails) */}
      <div
        className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white text-xs font-bold"
        style={{ background: path.color, display: 'none' }}
      >
        {path.name[0]}
      </div>

      {/* Name + progress bar + module count */}
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-gray-900">{path.name}</span>
          <span className="shrink-0 text-xs font-bold text-gray-600">{path.pct}%</span>
        </div>

        {/* Thin progress bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${path.pct}%`, background: path.color }}
          />
        </div>

        <p className="mt-1 text-[11px] text-gray-400">{path.modules} modules</p>
      </div>

      {/* Chevron > */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
}

// Single row in the Recent Activity list
function ActivityItem({ item }) {
  return (
    <div className="flex items-start gap-3">
      {/* Coloured circle with an SVG icon inside */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ background: `${item.color}18` }}
      >
        <ActivityIcon type={item.type} color={item.color} />
      </div>

      {/* Bold action word + item title + timestamp */}
      <div>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{capitalize(item.type)}</span>{' '}
          {item.label}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-400">{item.time}</p>
      </div>
    </div>
  );
}

// =============================================================
//  ICON COMPONENTS
//  Each icon is an SVG drawn inside a soft-coloured circle.
// =============================================================

// Four different icons used by the stat cards
function StatIcon({ type, color }) {
  const bg = `${color}18`; // 10 % opacity tint

  const paths = {
    check: (
      // Checkmark inside a circle
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill={bg} />
        {/* Outer ring */}
        <circle cx="18" cy="18" r="11" stroke={color} strokeWidth="1.5" fill="none" />
        {/* Tick */}
        <path d="M13 18l3.5 3.5 7-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    book: (
      // Open book
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill={bg} />
        <path d="M10 13v10a1 1 0 001 1h6V12h-6a1 1 0 00-1 1z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M26 13v10a1 1 0 01-1 1h-6V12h6a1 1 0 011 1z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    target: (
      // Three concentric circles (bullseye)
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill={bg} />
        <circle cx="18" cy="18" r="9" stroke={color} strokeWidth="1.5" />
        <circle cx="18" cy="18" r="5" stroke={color} strokeWidth="1.5" />
        <circle cx="18" cy="18" r="1.5" fill={color} />
      </svg>
    ),
    award: (
      // Trophy / ribbon
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill={bg} />
        <path d="M18 10a5 5 0 100 10 5 5 0 000-10z" stroke={color} strokeWidth="1.5" />
        <path d="M14 21.5l-1 4.5 5-2 5 2-1-4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return paths[type] ?? null;
}

// Four different icons for the activity feed rows
function ActivityIcon({ type, color }) {
  const icons = {
    completed: (
      // Checkmark circle
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    started: (
      // Play triangle
      <svg width="12" height="12" viewBox="0 0 24 24" fill={color}>
        <polygon points="5,3 19,12 5,21" />
      </svg>
    ),
    passed: (
      // Clipboard with checkmark
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    earned: (
      // Ribbon / award badge
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="8" r="5" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[type] ?? null;
}

// =============================================================
//  CIRCULAR PROGRESS RING (SVG)
//  Draws a grey track + coloured arc for `pct` percent.
// =============================================================

function CircularRing({ pct }) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;        // full circle length
  const filledArc = (pct / 100) * circumference; // coloured portion

  return (
    <svg width="148" height="148" viewBox="0 0 148 148">
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>

      {/* Grey background track */}
      <circle cx="74" cy="74" r={radius} fill="none" stroke="#e8eaf6" strokeWidth="11" />

      {/* Coloured progress arc — rotated to start at 12 o'clock */}
      <circle
        cx="74" cy="74" r={radius}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={`${filledArc} ${circumference}`}
        transform="rotate(-90 74 74)"
      />

      {/* Centred text */}
      <text x="74" y="69" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1e1b4b">{pct}%</text>
      <text x="74" y="86" textAnchor="middle" fontSize="11" fill="#9ca3af">Complete</text>
    </svg>
  );
}

// =============================================================
//  UTILITY
// =============================================================

// "completed" → "Completed"
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
