import pool from '../config/db.js';
import { logActivity } from '../utils/activityLogger.js';

export const getUserStats = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Modules Completed
    const completedModulesResult = await pool.query(
      'SELECT COUNT(*) FROM user_progress WHERE user_id = $1',
      [userId]
    );
    const completedModules = parseInt(completedModulesResult.rows[0].count);

    // Total available modules (for the denominator)
    const totalModulesResult = await pool.query('SELECT COUNT(*) FROM modules');
    const totalModules = parseInt(totalModulesResult.rows[0].count);

    // 2. Active Paths (Paths where user has at least one module completed)
    const activePathsResult = await pool.query(
      `SELECT COUNT(DISTINCT m.skill_path_id) 
       FROM user_progress up 
       JOIN modules m ON up.module_id = m.id 
       WHERE up.user_id = $1`,
      [userId]
    );
    const activePaths = parseInt(activePathsResult.rows[0].count);

    // Total available paths
    const totalPathsResult = await pool.query('SELECT COUNT(*) FROM skill_paths');
    const totalPaths = parseInt(totalPathsResult.rows[0].count);

    // 3. Tests Passed (Score >= 70%)
    const testsPassedResult = await pool.query(
      'SELECT COUNT(*) FROM user_test_scores WHERE user_id = $1 AND score >= (total_questions * 0.7)',
      [userId]
    );
    const testsPassed = parseInt(testsPassedResult.rows[0].count);

    // 4. Certificates (Completed Paths)
    // A path is completed if total modules in path = completed modules by user in that path
    const certificatesResult = await pool.query(
      `SELECT COUNT(*) FROM (
        SELECT m.skill_path_id 
        FROM modules m
        LEFT JOIN user_progress up ON m.id = up.module_id AND up.user_id = $1
        GROUP BY m.skill_path_id
        HAVING COUNT(m.id) > 0 AND COUNT(m.id) = COUNT(up.id)
      ) AS completed_paths`,
      [userId]
    );
    const certificates = parseInt(certificatesResult.rows[0].count);

    // 5. Recent Activity
    const activityResult = await pool.query(
      `SELECT action as label, created_at as raw_time, 
              CASE 
                WHEN action ILIKE '%completed%' THEN 'completed'
                WHEN action ILIKE '%started%' THEN 'started'
                WHEN action ILIKE '%passed%' THEN 'passed'
                ELSE 'earned'
              END as type
       FROM activities 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 5`,
      [userId]
    );

    const formatTime = (date) => {
      const now = new Date();
      const diff = Math.floor((now - new Date(date)) / 1000);
      if (diff < 60) return 'Just now';
      if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
      return new Date(date).toLocaleDateString();
    };

    const recentActivity = activityResult.rows.map(row => ({
      ...row,
      time: formatTime(row.raw_time),
      color: row.type === 'completed' ? '#10b981' : row.type === 'started' ? '#6366f1' : row.type === 'passed' ? '#f59e0b' : '#8b5cf6'
    }));

    // 6. Skill Path Progress for the progress cards
    const pathProgressResult = await pool.query(
      `SELECT 
        sp.title as name, 
        sp.image_url as img, 
        sp.color,
        (SELECT COUNT(*) FROM modules WHERE skill_path_id = sp.id) as total_modules,
        (SELECT COUNT(*) FROM user_progress up 
         JOIN modules m ON up.module_id = m.id 
         WHERE up.user_id = $1 AND m.skill_path_id = sp.id) as completed_modules
       FROM skill_paths sp`,
      [userId]
    );

    const skillPaths = pathProgressResult.rows.map(row => ({
      name: row.name,
      img: row.img,
      color: row.color || '#4f46e5',
      modules: `${row.completed_modules}/${row.total_modules}`,
      pct: row.total_modules > 0 ? Math.round((row.completed_modules / row.total_modules) * 100) : 0
    }));

    res.status(200).json({
      stats: {
        modulesCompleted: `${completedModules}/${totalModules}`,
        activePaths: `${activePaths}/${totalPaths}`,
        testsPassed: testsPassed.toString(),
        certificates: certificates.toString()
      },
      skillPaths,
      recentActivity
    });
  } catch (error) {
    console.error('User stats error details:', {
      message: error.message,
      stack: error.stack,
      userId: req.user?.id
    });
    res.status(500).json({ 
      error: 'Failed to fetch user stats', 
      details: error.message 
    });
  }
};

export const completeModule = async (req, res) => {
  const userId = req.user.id;
  const { moduleId } = req.body;

  try {
    // 1. Mark module as completed
    await pool.query(
      'INSERT INTO user_progress (user_id, module_id) VALUES ($1, $2) ON CONFLICT (user_id, module_id) DO NOTHING',
      [userId, moduleId]
    );

    // 2. Fetch module title for logging
    const moduleResult = await pool.query('SELECT title FROM modules WHERE id = $1', [moduleId]);
    const moduleTitle = moduleResult.rows[0]?.title || 'a module';

    // 3. Log activity
    await logActivity(userId, `Completed module: ${moduleTitle}`, { moduleId });

    res.status(200).json({ message: 'Module marked as completed' });
  } catch (error) {
    console.error('Error completing module:', error);
    res.status(500).json({ error: 'Failed to complete module' });
  }
};

export const submitTestResult = async (req, res) => {
  const userId = req.user.id;
  const { testId, score, totalQuestions } = req.body;

  try {
    // 1. Save test score
    await pool.query(
      'INSERT INTO user_test_scores (user_id, test_id, score, total_questions) VALUES ($1, $2, $3, $4)',
      [userId, testId, score, totalQuestions]
    );

    // 2. Fetch test title for logging
    const testResult = await pool.query('SELECT title FROM practice_tests WHERE id = $1', [testId]);
    const testTitle = testResult.rows[0]?.title || 'a test';

    // 3. Log activity
    const passed = score >= (totalQuestions * 0.7);
    const action = passed ? `Passed test: ${testTitle}` : `Completed test: ${testTitle}`;
    await logActivity(userId, action, { testId, score, totalQuestions, passed });

    res.status(200).json({ message: 'Test result submitted' });
  } catch (error) {
    console.error('Error submitting test result:', error);
    res.status(500).json({ error: 'Failed to submit test result' });
  }
};
