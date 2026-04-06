import pool from './src/config/db.js';

async function fix() {
  try {
    console.log('Fixing database schema...');
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';");
    console.log('Success: role column added.');
    process.exit(0);
  } catch (err) {
    console.error('Error fixing db:', err);
    process.exit(1);
  }
}

fix();
