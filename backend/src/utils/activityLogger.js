import pool from '../config/db.js';

/**
 * Logs an activity to the database.
 * @param {number|null} userId - The ID of the user who performed the action (optional)
 * @param {string} action - The description of the action (e.g. 'User registered')
 * @param {object} metadata - Optional metadata about the action
 */
export const logActivity = async (userId, action, metadata = {}) => {
  try {
    // Self-healing migration for activities table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS activities (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          action VARCHAR(255) NOT NULL,
          metadata JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(
      'INSERT INTO activities (user_id, action, metadata) VALUES ($1, $2, $3)',
      [userId, action, JSON.stringify(metadata)]
    );
  } catch (error) {
    console.error('Failed to log activity:', error);
    // We don't throw the error, just log it so it doesn't break the main flow
  }
};
