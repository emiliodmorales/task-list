import db from "#db/client";

/**
 * Create a new record in the tasks table
 * @param {string} title - The title of the next task
 * @param {number} userId - The id of the user making the task
 * @param {boolean} done - Whether the task has been done
 * @returns the newly created task
 */
export async function createTask(title, userId, done) {
  const sql = `
    INSERT INTO tasks (title, user_id, done)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const {
    rows: [task],
  } = await db.query(sql, [title, userId, done]);
  return task;
}

/**
 * Gets all tasks owned by the user
 * @param {number} userId - The id of the user
 * @returns all tasks owned by the user
 */
export async function getTasksByUser(userId) {
  const sql = `
    SELECT * FROM tasks
    WHERE user_id = $1
  `;
  const { rows: tasks } = await db.query(sql, [userId]);
  return tasks;
}
