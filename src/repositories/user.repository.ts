import { pool } from "../lib/db";
import { DBUserRow, DBUserWithPasswordRow, User } from "../types/user";



export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<DBUserRow>(
    "SELECT id, email, role, created_at FROM users WHERE email = $1",
    [email],
  );

  return result.rows[0] || null;
}