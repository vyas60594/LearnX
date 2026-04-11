import pool from './src/config/db.js';

async function updateSchema() {
  try {
    console.log('Updating database schema for Practice Tests...');

    // Update practice_tests table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS practice_tests (
        id SERIAL PRIMARY KEY,
        module_id INT REFERENCES modules(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        level VARCHAR(50),
        duration VARCHAR(50),
        test_type VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add columns if they don't exist (in case table existed but with different schema)
    await pool.query(`
      ALTER TABLE practice_tests ADD COLUMN IF NOT EXISTS description TEXT;
      ALTER TABLE practice_tests ADD COLUMN IF NOT EXISTS category VARCHAR(100);
      ALTER TABLE practice_tests ADD COLUMN IF NOT EXISTS level VARCHAR(50);
      ALTER TABLE practice_tests ADD COLUMN IF NOT EXISTS test_type VARCHAR(100);
    `);

    // Change duration from INT to VARCHAR if necessary to match frontend "30 mins"
    // But better to keep it as INT or just allow VARCHAR for flexibility
    await pool.query(`
      ALTER TABLE practice_tests ALTER COLUMN duration TYPE VARCHAR(50);
    `);

    // Ensure questions table exists and has correct columns
    await pool.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        test_id INT REFERENCES practice_tests(id) ON DELETE CASCADE,
        question_text TEXT NOT NULL,
        options JSONB NOT NULL,
        correct_answer TEXT NOT NULL,
        difficulty VARCHAR(50),
        question_type VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await pool.query(`
      ALTER TABLE questions ADD COLUMN IF NOT EXISTS difficulty VARCHAR(50);
      ALTER TABLE questions ADD COLUMN IF NOT EXISTS question_type VARCHAR(100);
    `);

    console.log('Database schema updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating schema:', err);
    process.exit(1);
  }
}

updateSchema();
