import { Router } from "express";
const router = Router();
export default router;

import requireUser from "#middleware/requireUser";

router.use(requireUser);
