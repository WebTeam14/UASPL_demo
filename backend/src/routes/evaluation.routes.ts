import { Router } from "express";
import { evaluateTender } from "../controllers/evaluation.controller";

const router = Router();

router.get("/tender/:tenderId", evaluateTender);

export default router;