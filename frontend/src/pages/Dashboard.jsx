import { useState } from 'react';
import achievement from '../assets/achievement.png';
import frontend_developer from '../assets/frontend_developer.png';
import sql_developer from '../assets/sql_developer.png';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* SIDEBAR */}
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN SCROLL AREA */}
      <div className="flex-1 flex flex-col lg:pl-64 overflow-y-auto no-scrollbar">

        {/* Sticky top bar */}
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">

          {/* ── PAGE TITLE ── */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-sm text-slate-400 font-medium mt-1">Track your learning progress and achievements</p>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

            {/* Enrolled Paths - Blue */}
            <div className="bg-blue-500 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-blue-200/40 flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">Enrolled Paths</p>
                <h3 className="text-4xl sm:text-5xl font-black mt-2 leading-none">2</h3>
                <p className="text-[11px] font-medium opacity-70 mt-5 uppercase tracking-tight">Active learning paths</p>
              </div>
              <svg className="w-7 h-7 opacity-50 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            {/* Tests Passed - Green */}
            <div className="bg-green-500 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-green-200/40 flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">Tests Passed</p>
                <h3 className="text-4xl sm:text-5xl font-black mt-2 leading-none">5</h3>
                <p className="text-[11px] font-medium opacity-70 mt-5 uppercase tracking-tight">90%+ score achieved</p>
              </div>
              <svg className="w-7 h-7 opacity-50 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0012 0V2z" />
              </svg>
            </div>

            {/* Current Level - Orange */}
            <div className="bg-amber-500 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-amber-200/40 flex justify-between items-start sm:col-span-2 xl:col-span-1">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">Current Level</p>
                <h3 className="text-2xl sm:text-3xl font-black mt-3 leading-tight uppercase">Intermediate</h3>
                <p className="text-[11px] font-medium opacity-70 mt-4 uppercase tracking-tight">SQL Developer path</p>
              </div>
              <svg className="w-7 h-7 opacity-50 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
              </svg>
            </div>
          </div>

          {/* ── TWO-COLUMN: Courses + Announcements ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* LEFT: Active Learning Paths */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Active Learning Paths</h2>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-500 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all">
                  Browse All
                </button>
              </div>

              {/* Course Card: SQL Developer */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">Intermediate</span>
                      <span className="text-slate-400 text-xs">• 8 weeks</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5">SQL Developer</h4>
                    <p className="text-sm text-slate-400 leading-relaxed mb-5">
                      Master database management and SQL queries for backend development roles
                    </p>
                    {/* Progress */}
                    <div className="mb-5">
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span className="text-slate-400">Overall Progress</span>
                        <span className="text-blue-600 font-bold">45%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[45%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                      </div>
                    </div>
                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                          </svg>
                          Beginner Complete
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-orange-500">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          Intermediate 65%
                        </span>
                      </div>
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md active:scale-95 transition-all">
                        Continue
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    </div>
                  </div>
                  {/* Thumbnail */}
                  <div className="w-full sm:w-36 h-32 shrink-0 rounded-xl overflow-hidden border-4 border-white shadow-lg self-start">
                    <img
                      src={sql_developer} alt="SQL"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={e => { e.target.parentNode.style.background = 'linear-gradient(135deg,#3b82f6,#6366f1)'; e.target.style.display = 'none'; }}
                    />
                  </div>
                </div>
              </div>

              {/* Course Card: Frontend Developer */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="h-1 bg-gradient-to-r from-indigo-400 to-blue-500" />
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">Beginner</span>
                      <span className="text-slate-400 text-xs">• 12 weeks</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5">Frontend Developer</h4>
                    <p className="text-sm text-slate-400 leading-relaxed mb-5">
                      Build modern web applications with HTML, CSS, JavaScript, and React
                    </p>
                    <div className="mb-5">
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span className="text-slate-400">Overall Progress</span>
                        <span className="text-blue-600 font-bold">45%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[45%] bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full" />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                          </svg>
                          Beginner Complete
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-orange-500">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          Intermediate 65%
                        </span>
                      </div>
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md active:scale-95 transition-all">
                        Continue
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    </div>
                  </div>
                  <div className="w-full sm:w-36 h-32 shrink-0 rounded-xl overflow-hidden border-4 border-white shadow-lg self-start">
                    <img
                      src={frontend_developer} alt="Frontend"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={e => { e.target.parentNode.style.background = 'linear-gradient(135deg,#6366f1,#3b82f6)'; e.target.style.display = 'none'; }}
                    />
                  </div>
                </div>
              </div>

              {/* CTA Banner */}
              <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="text-base sm:text-lg font-black text-slate-800">Ready for a challenge?</h5>
                  <p className="text-sm text-slate-500 mt-0.5">Take a practice test to assess your skills</p>
                </div>
                <button className="w-full sm:w-auto shrink-0 px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-md active:scale-95 transition-all">
                  Start Test
                </button>
              </div>
            </div>

            {/* RIGHT: Announcements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Announcements</h2>
                <button className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline">View All</button>
              </div>

              {/* Announcement: Update */}
              <div className="bg-white rounded-2xl border-l-4 border-blue-500 shadow-sm p-4 sm:p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Update</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    1/15/2024
                  </span>
                </div>
                <h6 className="text-sm font-black text-slate-800 leading-snug">New Course: Advanced React Patterns</h6>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">We are excited to announce a new advanced module in the Frontend Developer path...</p>
              </div>

              {/* Announcement: Schedule */}
              <div className="bg-white rounded-2xl border-l-4 border-orange-400 shadow-sm p-4 sm:p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-orange-50 text-orange-500 px-2 py-0.5 rounded">Schedule</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    1/12/2024
                  </span>
                </div>
                <h6 className="text-sm font-black text-slate-800 leading-snug">Upcoming Test Schedule</h6>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">SQL Developer intermediate level tests will be available from January 20th. Make sure you...</p>
              </div>

              {/* Announcement: Notice */}
              <div className="bg-white rounded-2xl border-l-4 border-rose-500 shadow-sm p-4 sm:p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-500 px-2 py-0.5 rounded">Notice</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    1/10/2024
                  </span>
                </div>
                <h6 className="text-sm font-black text-slate-800 leading-snug">Platform Maintenance Notice</h6>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">The platform will undergo scheduled maintenance on January 18th from 2:00 AM...</p>
              </div>

              {/* Achievement Badge */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl p-5 text-white shadow-lg flex items-center gap-4 relative overflow-hidden">
                <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                  <img
                    src={achievement}
                    alt="Badge"
                    className="w-full h-full object-contain"
                    onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = '🏅'; }}
                  />
                </div>
                <div>
                  <h6 className="font-black text-base">Keep Going! 🚀</h6>
                  <p className="text-xs opacity-80 mt-1 leading-relaxed">Complete 3 more tests to unlock a special achievement badge!</p>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
