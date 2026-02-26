import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser("John", "password123");

  await createTask("walk the dog", user.id, false);
  await createTask("pet the cat", user.id, false);
  await createTask("feed the fish", user.id, false);
}
