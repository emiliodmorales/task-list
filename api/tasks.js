import { Router } from "express";
const router = Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import { createTask, getTasksByUser } from "#db/queries/tasks";

router.use(requireUser);

router.post("/", requireBody(["title", "done"]), async (req, res) => {
  const { title, done } = req.body;
  const task = await createTask(title, req.user.id, done);
  res.status(201).send(task);
});

router.get("/", async (req, res) => {
  const tasks = await getTasksByUser(req.user.id);
  res.send(tasks);
});
