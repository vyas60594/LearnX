import pool from '../config/db.js';
import { logActivity } from '../utils/activityLogger.js';

export const getAnnouncements = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM announcements ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Fetch announcements error:', error);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};

export const createAnnouncement = async (req, res) => {
  const { title, body, type } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO announcements (title, body, type) VALUES ($1, $2, $3) RETURNING *',
      [title, body, type || 'info']
    );

    // Log this activity
    if (req.user) {
        await logActivity(req.user.id, `Created announcement: ${title}`);
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ error: 'Failed to create announcement' });
  }
};

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const checkResult = await pool.query('SELECT title FROM announcements WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    const title = checkResult.rows[0].title;
    await pool.query('DELETE FROM announcements WHERE id = $1', [id]);

    // Log this activity
    if (req.user) {
        await logActivity(req.user.id, `Deleted announcement: ${title}`);
    }

    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
};

export const updateAnnouncement = async (req, res) => {
    const { id } = req.params;
    const { title, body, type } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE announcements SET title = $1, body = $2, type = $3 WHERE id = $4 RETURNING *',
        [title, body, type, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Announcement not found' });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Update announcement error:', error);
      res.status(500).json({ error: 'Failed to update announcement' });
    }
  };
