import db from "#db/client";
import bcrypt from "bcrypt";

/**
 * Create a new record in the users table
 * @param {string} username - The username of the new user
 * @param {string} password - The unencrypted password of the new user
 * @returns the newly created user
 */
export async function createUser(username, password) {
  const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUserByLogin(username, password) {
  const sql = `
    SELECT * FROM users
    WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}
