import pool from './src/config/db.js';

async function addColumns() {
  try {
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS job_role VARCHAR(100) DEFAULT 'Member'");
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS department VARCHAR(100) DEFAULT 'General'");
    console.log('Columns added successfully');
  } catch (error) {
    console.error('Error adding columns:', error);
  } finally {
    process.exit(0);
  }
}

addColumns();
