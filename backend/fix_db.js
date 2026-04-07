import pool from './src/config/db.js';
import fs from 'fs';
import path from 'path';

async function fix() {
  try {
    console.log('--- Database Migration Diagnostics ---');
    const dbInfo = await pool.query('SELECT current_database(), current_user');
    console.log(`Connected to: ${dbInfo.rows[0].current_database} as ${dbInfo.rows[0].current_user}`);
    
    console.log('Applying core database schema...');
    
    // Core tables used by admin stats - Run individually to ensure completion
    console.log('Creating skill_paths...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS skill_paths (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          image_url TEXT,
          color VARCHAR(20),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating activities...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS activities (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          action VARCHAR(255) NOT NULL,
          metadata JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating user_test_scores...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_test_scores (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          score INT NOT NULL,
          total_questions INT NOT NULL,
          taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Success: Core tables ensured.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
}

fix();
