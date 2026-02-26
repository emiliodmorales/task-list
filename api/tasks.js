import { Router } from "express";
const router = Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
} from "#db/queries/tasks";

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

router.param("id", async (req, res, next, id) => {
  if (Number.isNaN(id))
    return res.status(400).send("Task id must be a positive integer.");

  const task = await getTaskById(id);
  if (!task) return res.status(404).send("Task not found.");
  if (task.user_id !== req.user.id) return res.sendStatus(403);

  req.task = task;
  next();
});

router.put("/:id", requireBody(["title", "done"]), async (req, res) => {
  const { title, done } = req.body;
  const task = await updateTask(title, done, req.task.id);
  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const task = await deleteTask(req.task.id);
  res.status(204).send(task);
});
