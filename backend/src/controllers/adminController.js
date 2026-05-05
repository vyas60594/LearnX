import bcrypt from 'bcryptjs';
import os from 'os';
import pool from '../config/db.js';
import { sendInvitationEmail } from '../services/emailService.js';
import { logActivity } from '../utils/activityLogger.js';

export const getAdminStats = async (req, res) => {
  try {
    // Individual queries with error handling for missing tables
    let totalUsers = 0, totalPaths = 0, totalTests = 0;
    
    try {
      const userCountResult = await pool.query('SELECT COUNT(*) FROM users');
      totalUsers = userCountResult.rows[0].count;
    } catch(e) { console.error('Error fetching users:', e.message); }

    try {
      const pathCountResult = await pool.query('SELECT COUNT(*) FROM skill_paths');
      totalPaths = pathCountResult.rows[0].count;
    } catch(e) { console.error('Error fetching paths:', e.message); }

    try {
      const testCountResult = await pool.query('SELECT COUNT(*) FROM user_test_scores');
      totalTests = testCountResult.rows[0].count;
    } catch(e) { console.error('Error fetching tests:', e.message); }

    // Calculate Real System Health
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const memUsage = Math.round(((totalMem - freeMem) / totalMem) * 100);
    const dbStatus = await pool.query('SELECT 1').then(() => true).catch(() => false);
    
    const healthValue = dbStatus ? (100 - (memUsage / 10)) : 0; 
    const healthString = `${Math.round(healthValue)}%`;

    const stats = [
      { label: 'Total Students', value: totalUsers, trend: '+5%', color: 'from-blue-500 to-blue-600' },
      { label: 'Active Paths', value: totalPaths, trend: 'Stable', color: 'from-purple-500 to-purple-600' },
      { label: 'Tests Taken', value: totalTests, trend: '+12%', color: 'from-emerald-500 to-emerald-600' },
      { label: 'System Health', value: healthString, trend: dbStatus ? 'Operational' : 'Database Down', color: 'from-slate-700 to-slate-800' }
    ];

    // Fetch real activities - join with users to get names
    let recentActivities = [];
    try {
      const activitiesResult = await pool.query(`
        SELECT 
          a.id, 
          a.action, 
          COALESCE(u.username, 'System') as user,
          a.created_at as raw_time
        FROM activities a
        LEFT JOIN users u ON a.user_id = u.id
        ORDER BY a.created_at DESC
        LIMIT 10
      `);

      // Format time for frontend (simple helper)
      const formatTime = (date) => {
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return new Date(date).toLocaleDateString();
      };

      recentActivities = activitiesResult.rows.map(row => ({
        id: row.id,
        action: row.action,
        user: row.user,
        time: formatTime(row.raw_time)
      }));
    } catch(e) { console.error('Error fetching activities:', e.message); }

    res.status(200).json({
      stats,
      recentActivities
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        username as name, 
        email, 
        COALESCE(NULLIF(role, ''), 'user') as role, 
        COALESCE(NULLIF(status, ''), 'Active') as status, 
        TO_CHAR(created_at, 'YYYY-MM-DD') as joined,
        0 as progress
      FROM users 
      ORDER BY created_at DESC
    `);
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { role, status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET role = $1, status = $2 WHERE id = $3 RETURNING *',
      [role, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Log this activity
    await logActivity(req.user?.id, `Updated user ${result.rows[0].username} to ${role}/${status}`, { target_user_id: id });

    res.status(200).json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const inviteUser = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: 'Missing email or role' });
  }

  try {
    // Check if user exists
    const checkResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Default username from email and a generic password
    const username = email.split('@')[0];
    const defaultPassword = 'Welcome123'; 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, salt);

    const result = await pool.query(
      'INSERT INTO users (username, email, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, role, status',
      [username, email, hashedPassword, role, 'Invited']
    );

    // Log this activity
    await logActivity(req.user?.id, `Invited user ${email} as ${role}`, { invited_email: email });

    // Send Real Invitation Email via Nodemailer
    const emailSent = await sendInvitationEmail(email, username, defaultPassword);

    res.status(201).json({ 
      message: emailSent 
        ? 'User invited and email sent successfully' 
        : 'User invited, but email delivery failed. Please provide their password manually.', 
      user: {
        ...result.rows[0],
        name: result.rows[0].username,
        joined: 'Just now',
        progress: 0
      } 
    });
  } catch (error) {
    console.error('Invite user error:', error);
    res.status(500).json({ error: 'Failed to invite user' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Optional: Log activity before deletion so we know who deleted whom
    const userResult = await pool.query('SELECT username FROM users WHERE id = $1', [id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const targetUsername = userResult.rows[0].username;

    // Delete user
    await pool.query('DELETE FROM users WHERE id = $1', [id]);

    // Log the action
    await logActivity(req.user?.id, `Permanently deleted user ${targetUsername} (ID: ${id})`);

    res.status(200).json({ message: 'User deleted permanently' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};