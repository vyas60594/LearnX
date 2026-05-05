import pool from '../config/db.js';
import { logActivity } from '../utils/activityLogger.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT id, username as name, email, role as system_role, job_role as role, department, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    
    // Format joined date
    const joinDate = new Date(user.created_at);
    const joined = joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    // Initials
    const initials = user.name
      .split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'U';

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'Member',
      department: user.department || 'General',
      joined,
      initials,
      system_role: user.system_role
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, role, department } = req.body;

    const result = await pool.query(
      `UPDATE users 
       SET username = $1, email = $2, job_role = $3, department = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $5 
       RETURNING id, username as name, email, role as system_role, job_role as role, department, created_at`,
      [name, email, role, department, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await logActivity(userId, 'Updated profile', { type: 'profile_update' });

    const user = result.rows[0];
    const joinDate = new Date(user.created_at);
    const joined = joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const initials = user.name
      .split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'U';

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'Member',
        department: user.department || 'General',
        joined,
        initials,
        system_role: user.system_role
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const getUserStats = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Modules Completed — from user_module_completions
    const completedModulesResult = await pool.query(
      'SELECT COUNT(*) FROM user_module_completions WHERE user_id = $1',
      [userId]
    );
    const completedModules = parseInt(completedModulesResult.rows[0].count);

    // Total available modules — count from skill_paths.content JSONB
    // Each skill path has content->{levels} array, each level has {modules} array
    const totalModulesResult = await pool.query(`
      SELECT COALESCE(SUM(module_count), 0) as total FROM (
        SELECT (
          SELECT COALESCE(SUM(jsonb_array_length(level->'modules')), 0)
          FROM jsonb_array_elements(COALESCE(sp.content->'levels', '[]'::jsonb)) AS level
          WHERE level->'modules' IS NOT NULL
        ) as module_count
        FROM skill_paths sp
      ) sub
    `);
    const totalModules = parseInt(totalModulesResult.rows[0].total);

    // 2. Active Paths — distinct skill_path_id from user_module_completions
    const activePathsResult = await pool.query(
      'SELECT COUNT(DISTINCT skill_path_id) FROM user_module_completions WHERE user_id = $1',
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

    // 4. Certificates — paths where user completed ALL modules
    const certificatesResult = await pool.query(`
      SELECT COUNT(*) FROM (
        SELECT sp.id,
          (SELECT COALESCE(SUM(jsonb_array_length(level->'modules')), 0)
           FROM jsonb_array_elements(COALESCE(sp.content->'levels', '[]'::jsonb)) AS level
           WHERE level->'modules' IS NOT NULL
          ) as total_mods,
          (SELECT COUNT(*) FROM user_module_completions umc 
           WHERE umc.user_id = $1 AND umc.skill_path_id = sp.id
          ) as completed_mods
        FROM skill_paths sp
      ) sub
      WHERE total_mods > 0 AND total_mods = completed_mods
    `, [userId]);
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

    // 6. Skill Path Progress — count from JSONB + user_module_completions
    const pathProgressResult = await pool.query(`
      SELECT 
        sp.id,
        sp.title as name, 
        sp.image_url as img, 
        sp.color,
        (SELECT COALESCE(SUM(jsonb_array_length(level->'modules')), 0)
         FROM jsonb_array_elements(COALESCE(sp.content->'levels', '[]'::jsonb)) AS level
         WHERE level->'modules' IS NOT NULL
        ) as total_modules,
        (SELECT COUNT(*) FROM user_module_completions umc 
         WHERE umc.user_id = $1 AND umc.skill_path_id = sp.id
        ) as completed_modules
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
  const { moduleId, moduleTitle, skillPathId } = req.body;

  try {
    const title = moduleTitle || 'a module';

    // Save to user_module_completions (works for all module ID types)
    if (skillPathId && moduleId) {
      await pool.query(
        `INSERT INTO user_module_completions (user_id, skill_path_id, module_content_id, module_title) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (user_id, skill_path_id, module_content_id) DO NOTHING`,
        [userId, skillPathId, String(moduleId), title]
      );
    }

    // Log activity
    await logActivity(userId, `Completed module: ${title}`, { 
      moduleId: String(moduleId), 
      skillPathId 
    });

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

export const claimCertificate = async (req, res) => {
  const userId = req.user.id;
  const { skillPathId } = req.body;

  try {
    // 1. Verify the skill path exists
    const pathResult = await pool.query('SELECT id, title FROM skill_paths WHERE id = $1', [skillPathId]);
    if (pathResult.rows.length === 0) {
      return res.status(404).json({ error: 'Skill path not found' });
    }
    const pathTitle = pathResult.rows[0].title;

    // 2. Check if certificate already exists
    const existingCert = await pool.query(
      'SELECT id FROM user_certificates WHERE user_id = $1 AND skill_path_id = $2',
      [userId, skillPathId]
    );
    if (existingCert.rows.length > 0) {
      return res.status(400).json({ error: 'Certificate already claimed', certificateId: existingCert.rows[0].id });
    }

    // 3. Get user info
    const userResult = await pool.query('SELECT username, email FROM users WHERE id = $1', [userId]);
    const userName = userResult.rows[0]?.username || 'Student';

    // 4. Generate a unique certificate ID
    const certId = `LX-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // 5. Insert certificate
    const result = await pool.query(
      `INSERT INTO user_certificates (user_id, skill_path_id, certificate_id, path_title, user_name, issued_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [userId, skillPathId, certId, pathTitle, userName]
    );

    // 6. Log activity
    await logActivity(userId, `Earned certificate: ${pathTitle}`, { skillPathId, certificateId: certId });

    res.status(201).json({
      message: 'Certificate claimed successfully!',
      certificate: result.rows[0]
    });
  } catch (error) {
    console.error('Error claiming certificate:', error);
    res.status(500).json({ error: 'Failed to claim certificate' });
  }
};

export const getUserCertificates = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT uc.*, sp.description, sp.image_url, sp.color,
        (SELECT COALESCE(SUM(jsonb_array_length(level->'modules')), 0)
         FROM jsonb_array_elements(COALESCE(sp.content->'levels', '[]'::jsonb)) AS level
         WHERE level->'modules' IS NOT NULL
        ) as total_modules
       FROM user_certificates uc
       JOIN skill_paths sp ON uc.skill_path_id = sp.id
       WHERE uc.user_id = $1
       ORDER BY uc.issued_at DESC`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
};
