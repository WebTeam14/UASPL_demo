import { Router } from "express";
import { getProjectProgress } from "../controllers/progress.controller";

const router = Router();

router.get("/:projectId", getProjectProgress);

export default router;