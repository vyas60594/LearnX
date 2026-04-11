import pool from '../config/db.js';

// Get all practice tests
export const getAllPracticeTests = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT pt.*, 
      (SELECT COUNT(*) FROM questions q WHERE q.test_id = pt.id) as question_count
      FROM practice_tests pt 
      ORDER BY pt.created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching practice tests:', error);
    res.status(500).json({ error: 'Failed to fetch practice tests' });
  }
};

// Get practice test by ID
export const getPracticeTestById = async (req, res) => {
  const { id } = req.params;
  try {
    const testResult = await pool.query('SELECT * FROM practice_tests WHERE id = $1', [id]);
    if (testResult.rows.length === 0) {
      return res.status(404).json({ error: 'Practice test not found' });
    }

    const questionsResult = await pool.query('SELECT * FROM questions WHERE test_id = $1', [id]);
    
    const test = testResult.rows[0];
    test.questions = questionsResult.rows;
    
    res.status(200).json(test);
  } catch (error) {
    console.error('Error fetching practice test details:', error);
    res.status(500).json({ error: 'Failed to fetch practice test details' });
  }
};

// Create a new practice test
export const createPracticeTest = async (req, res) => {
  const { title, description, category, level, duration, test_type } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO practice_tests (title, description, category, level, duration, test_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, category || 'General', level || 'Beginner', duration || 30, test_type || 'Subject Mock']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating practice test:', error);
    res.status(500).json({ error: 'Failed to create practice test' });
  }
};

// Update a practice test
export const updatePracticeTest = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, level, duration, test_type } = req.body;
  try {
    const result = await pool.query(
      'UPDATE practice_tests SET title = $1, description = $2, category = $3, level = $4, duration = $5, test_type = $6 WHERE id = $7 RETURNING *',
      [title, description, category, level, duration, test_type, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Practice test not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating practice test:', error);
    res.status(500).json({ error: 'Failed to update practice test' });
  }
};

// Delete a practice test
export const deletePracticeTest = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM practice_tests WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Practice test not found' });
    }
    res.status(200).json({ message: 'Practice test deleted successfully' });
  } catch (error) {
    console.error('Error deleting practice test:', error);
    res.status(500).json({ error: 'Failed to delete practice test' });
  }
};

// Add question to test
export const addQuestion = async (req, res) => {
  const { test_id } = req.params;
  const { question_text, options, correct_answer, difficulty, question_type } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO questions (test_id, question_text, options, correct_answer, difficulty, question_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [test_id, question_text, JSON.stringify(options), correct_answer, difficulty || 'Medium', question_type || 'Multiple Choice']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Failed to add question' });
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question_text, options, correct_answer, difficulty, question_type } = req.body;
  try {
    const result = await pool.query(
      'UPDATE questions SET question_text = $1, options = $2, correct_answer = $3, difficulty = $4, question_type = $5 WHERE id = $6 RETURNING *',
      [question_text, JSON.stringify(options), correct_answer, difficulty, question_type, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Failed to update question' });
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
};
