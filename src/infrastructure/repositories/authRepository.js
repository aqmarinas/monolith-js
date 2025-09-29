import { pool } from "../db/connection.js";
import { User } from "../../domain/entities/User.js";

export class AuthRepository {
  async findByEmail(email) {
    const res = await pool.query("SELECT id, name, email, password FROM users WHERE email=$1", [email]);
    if (res.rows.length === 0) return null;
    const r = res.rows[0];
    return new User(r.id, r.name, r.email, r.password);
  }

  async createUser(user) {
    const res = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id", [user.name, user.email, user.passwordHash]);
    user.id = res.rows[0].id;
    return user;
  }
}
