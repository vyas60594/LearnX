import { useState, useEffect } from 'react';

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

// Services
import { announcementService, userService } from '../services/api';

// Data
import { STAT_CARDS as STATIC_STAT_CARDS } from '../data/dashboardData';

export default function Dashboard() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [stats, setStats] = useState(null);
  const [skillPaths, setSkillPaths] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [announcementsData, statsData] = await Promise.all([
          announcementService.getAll(),
          userService.getDashboardStats()
        ]);
        
        setAnnouncements(announcementsData);
        setStats(statsData.stats);
        setSkillPaths(statsData.skillPaths);
        setRecentActivities(statsData.recentActivity);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Map real stats to STAT_CARDS structure
  const displayStats = STATIC_STAT_CARDS.map(card => {
    if (!stats) return card;
    
    let value = card.value;
    if (card.label === 'Modules Completed') value = stats.modulesCompleted;
    if (card.label === 'Active Paths') value = stats.activePaths;
    if (card.label === 'Tests Passed') value = stats.testsPassed;
    if (card.label === 'Certificates') value = stats.certificates;

    return { ...card, value };
  });

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
            {displayStats.map((card) => (
              <StatCard key={card.label} card={card} />
            ))}
          </div>

          {/* Progress & Skill Paths Row */}
          <div className="mb-5 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
            <OverallProgressCard 
              completed={parseInt(stats?.modulesCompleted?.split('/')[0] || 0)} 
              total={parseInt(stats?.modulesCompleted?.split('/')[1] || 1)} 
            />
            <ActiveSkillPathsCard paths={skillPaths} />
          </div>

          {/* Activity & Side Column Row */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
            <RecentActivityCard activities={recentActivities} />

            <div className="flex flex-col gap-5">
              <UpcomingTestsCard tests={[]} />
              <AnnouncementsCard announcements={announcements} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
