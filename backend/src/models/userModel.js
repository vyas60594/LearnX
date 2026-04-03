import pool from '../config/db.js';

class UserModel {
  static async createUser(username, email, hashedPassword) {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, email, hashedPassword];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async getAllUsers() {
    const query = 'SELECT id, username, email, created_at FROM users';
    const { rows } = await pool.query(query);
    return rows;
  }
}

export default UserModel;
