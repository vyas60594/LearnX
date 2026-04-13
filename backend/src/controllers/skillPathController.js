import pool from '../config/db.js';

export const getSkillPaths = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM skill_paths ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching skill paths:', error);
    res.status(500).json({ error: 'Failed to fetch skill paths' });
  }
};

export const getSkillPathById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM skill_paths WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Skill path not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching skill path:', error);
    res.status(500).json({ error: 'Failed to fetch skill path' });
  }
};

export const createSkillPath = async (req, res) => {
  const { title, description, image_url, color, status, content, modules_count, levels_count } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO skill_paths (title, description, image_url, color, status, content, modules_count, levels_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, description, image_url, color, status || 'Draft', content || {}, modules_count || 0, levels_count || 0]
    );

    // Automatically create an announcement for the new skill path
    try {
      await pool.query(
        'INSERT INTO announcements (title, body, type) VALUES ($1, $2, $3)',
        [
          `New Skill Path Added: ${title}`,
          `Explore our latest learning journey: "${title}". Start learning today!`,
          'success'
        ]
      );
    } catch (announcementError) {
      // Log error but don't fail the main request
      console.error('Auto-announcement failed:', announcementError.message);
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating skill path:', error);
    res.status(500).json({ error: 'Failed to create skill path' });
  }
};

export const updateSkillPath = async (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, color, status, content, modules_count, levels_count } = req.body;
  try {
    const result = await pool.query(
      'UPDATE skill_paths SET title = $1, description = $2, image_url = $3, color = $4, status = $5, content = $6, modules_count = $7, levels_count = $8 WHERE id = $9 RETURNING *',
      [title, description, image_url, color, status, content, modules_count, levels_count, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Skill path not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating skill path:', error);
    res.status(500).json({ error: 'Failed to update skill path' });
  }
};

export const deleteSkillPath = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM skill_paths WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Skill path not found' });
    }
    res.status(200).json({ message: 'Skill path deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill path:', error);
    res.status(500).json({ error: 'Failed to delete skill path' });
  }
};
