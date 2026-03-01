import { useState } from 'react';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      {/* Sidebar - Controlled by state on mobile */}
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full lg:pl-64 overflow-auto no-scrollbar">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard content goes here */}
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Welcome back to LearnX!</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
