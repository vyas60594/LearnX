const TopBar = ({ onMenuClick }) => {
  return (
    <header className="w-full h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      {/* Mobile Menu Toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl mr-2 transition-all active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
      </button>

      {/* Search Bar - Hidden on very small screens or made smaller */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-11 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-6 ml-4">
        {/* User Info - Labels hidden on small screens */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight leading-none">Welcome back,</span>
            <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Rahul</span>
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 text-sm md:text-base">
            R
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;