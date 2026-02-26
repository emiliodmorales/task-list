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

/**
 * @param {number} id
 * @returns the task with the given id
 */
export async function getTaskById(id) {
  const sql = `
    SELECT * FROM tasks
    WHERE id = $1
  `;
  const {
    rows: [task],
  } = await db.query(sql, [id]);
  return task;
}

/**
 * Updates a task
 * @param {string} title - The new title of the task
 * @param {boolean} done - The new done status of the task
 * @param {number} id - The id of the task
 * @returns the updated task
 */
export async function updateTask(title, done, id) {
  const sql = `
    UPDATE tasks
    SET title = $1, done = $2
    WHERE id = $3
    RETURNING *
  `;
  const {
    rows: [task],
  } = await db.query(sql, [title, done, id]);
  return task;
}
