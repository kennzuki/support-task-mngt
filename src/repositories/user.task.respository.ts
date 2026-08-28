import {Task }from "../types/task";
import { pool } from "../lib/db";

export async function createTask(title: string, userId: string): Promise<Task> {
 
    const result = await pool.query(
    `INSERT INTO support_tasks (title, user_id) 
    VALUES ($1, $2) 
    RETURNING id, title, status, user_id, created_at, updated_at`,
    [title, userId],
  );
  return result.rows[0];
}