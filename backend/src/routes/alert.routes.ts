import { Router } from "express";

import {
  createAlert,
  getAlerts,
  markAlertRead
} from "../controllers/alert.controller";

const router = Router();

router.post("/", createAlert);

router.get("/:userId", getAlerts);

router.patch("/:id/read", markAlertRead);

export default router;