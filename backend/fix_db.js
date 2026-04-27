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
    console.log('Ensuring skill_paths structure...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS skill_paths (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          image_url TEXT,
          color VARCHAR(20),
          status VARCHAR(20) DEFAULT 'Draft',
          content JSONB DEFAULT '{}',
          modules_count INT DEFAULT 0,
          levels_count INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE skill_paths ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'Draft';
      ALTER TABLE skill_paths ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '{}';
      ALTER TABLE skill_paths ADD COLUMN IF NOT EXISTS modules_count INT DEFAULT 0;
      ALTER TABLE skill_paths ADD COLUMN IF NOT EXISTS levels_count INT DEFAULT 0;
    `);

    console.log('Ensuring modules structure...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS modules (
          id SERIAL PRIMARY KEY,
          skill_path_id INT REFERENCES skill_paths(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          content TEXT,
          order_index INT,
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
          test_id INT REFERENCES practice_tests(id) ON DELETE SET NULL,
          score INT NOT NULL,
          total_questions INT NOT NULL,
          taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE user_test_scores ADD COLUMN IF NOT EXISTS test_id INT;
    `);

    console.log('Creating user_progress...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          module_id INT REFERENCES modules(id) ON DELETE CASCADE,
          completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, module_id)
      );
    `);
    
    console.log('Ensuring user status and role columns...');
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'Active';
    `);

    console.log('Creating user_module_completions...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_module_completions (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          skill_path_id INT REFERENCES skill_paths(id) ON DELETE CASCADE,
          module_content_id TEXT NOT NULL,
          module_title TEXT,
          completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, skill_path_id, module_content_id)
      );
    `);

    console.log('Creating user_certificates...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_certificates (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          skill_path_id INT REFERENCES skill_paths(id) ON DELETE CASCADE,
          certificate_id TEXT UNIQUE NOT NULL,
          path_title TEXT NOT NULL,
          user_name TEXT NOT NULL,
          issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, skill_path_id)
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
