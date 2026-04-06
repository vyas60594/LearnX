import pool from '../config/db.js';

export const getAdminStats = async (req, res) => {
  try {
    // Real query for total users
    const userCountResult = await pool.query('SELECT COUNT(*) FROM users');
    const totalUsers = userCountResult.rows[0].count;

    // Hardcoded for now (could be real if you have these tables)
    const stats = [
      { label: 'Total Students', value: totalUsers, trend: '+5%', color: 'from-blue-500 to-blue-600' },
      { label: 'Active Paths', value: '12', trend: 'Stable', color: 'from-purple-500 to-purple-600' },
      { label: 'Tests Taken', value: '150', trend: '+12%', color: 'from-emerald-500 to-emerald-600' },
      { label: 'System Health', value: '98%', trend: 'Operational', color: 'from-slate-700 to-slate-800' }
    ];

    const recentActivities = [
      { id: 1, action: 'User registered', user: 'New Student', time: '10 mins ago' },
      { id: 2, action: 'Course updated', user: 'Admin', time: '1 hour ago' },
      { id: 3, action: 'Test completed', user: 'John Doe', time: '2 hours ago' }
    ];

    res.status(200).json({
      stats,
      recentActivities
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
};
