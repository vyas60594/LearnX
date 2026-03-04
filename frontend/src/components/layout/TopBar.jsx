// =============================================================
//  TopBar.jsx
//  Sticky top navigation bar shown across all dashboard pages.
//  Contains: mobile menu toggle, search bar, action icons, user info.
// =============================================================

const TopBar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 px-6 py-3 z-20 flex h-30 border-b border-slate-200 w-full items-center justify-between border-b border-slate-100 bg-white px-6">

      {/* ── Hamburger — only shown on mobile ── */}
      <button
        onClick={onMenuClick}
        className="mr-4 rounded-xl p-2 text-slate-500 transition-all hover:bg-slate-50 active:scale-95 lg:hidden"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* ── Search bar ── */}
      <div className="relative max-w-xs flex-1">
        {/* Search icon inside the input */}
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search modules, tests..."
          className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
        />
      </div>

      {/* ── Right-side actions ── */}
      <div className="ml-4 flex items-center gap-3">

        {/* Dark mode toggle button */}
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 transition-all">
          {/* Moon icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Notification bell with red dot */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 transition-all">
          {/* Bell icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Red notification dot */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-1 ring-white" />
        </button>

        {/* User avatar + name */}
        <div className="flex cursor-pointer items-center gap-2.5">
          {/* Initials avatar circle */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-sm font-bold text-white shadow-sm">
            AK
          </div>
          {/* Name — hidden on small screens */}
          <span className="hidden text-sm font-bold text-slate-800 sm:block">
            Arjun Kumar
          </span>
        </div>

      </div>
    </header>
  );
};

export default TopBar;