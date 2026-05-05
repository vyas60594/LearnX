import pool from './src/config/db.js'; pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users'").then(res => { console.log(res.rows); process.exit(0); });
