import { useState } from 'react';

// Layout Components
import { useAuth } from '../hooks/useAuth';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';

// Dashboard Components
import ActiveSkillPathsCard from '../components/dashboard/ActiveSkillPathsCard';
import AnnouncementsCard from '../components/dashboard/AnnouncementsCard';
import OverallProgressCard from '../components/dashboard/OverallProgressCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import StatCard from '../components/dashboard/StatCard';
import UpcomingTestsCard from '../components/dashboard/UpcomingTestsCard';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';

// Data
import {
  ANNOUNCEMENTS,
  RECENT_ACTIVITY,
  SKILL_PATHS,
  STAT_CARDS,
  UPCOMING_TESTS
} from '../data/dashboardData';

export default function Dashboard() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="dashboard" />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto lg:pl-72">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 bg-white px-4 py-4 sm:px-6 lg:px-8 sm:py-6">
          <WelcomeHeader name={user?.name?.split(' ')[0] || 'Student'} />

          {/* Stats Row */}
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map((card) => (
              <StatCard key={card.label} card={card} />
            ))}
          </div>

          {/* Progress & Skill Paths Row */}
          <div className="mb-5 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
            <OverallProgressCard completed={5} total={45} />
            <ActiveSkillPathsCard paths={SKILL_PATHS} />
          </div>

          {/* Activity & Side Column Row */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
            <RecentActivityCard activities={RECENT_ACTIVITY} />

            <div className="flex flex-col gap-5">
              <UpcomingTestsCard tests={UPCOMING_TESTS} />
              <AnnouncementsCard announcements={ANNOUNCEMENTS} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
