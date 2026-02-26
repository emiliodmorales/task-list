import { Router } from "express";
const router = Router();
export default router;

import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import { createUser } from "#db/queries/users";

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    const token = await createToken({ id: user.id });
    res.status(201).send(token);
  },
);
