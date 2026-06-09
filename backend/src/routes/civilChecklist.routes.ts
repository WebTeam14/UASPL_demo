import { Router } from "express";
import {
  createChecklist,
  getChecklistsBySociety,
  updateChecklistStatus,
} from "../controllers/civilChecklist.controller";
import { authJwt } from "../middlewares/authJwt";
import { societyContext } from "../middlewares/societyContext";
import { requireRole } from "../middlewares/requireRole";

const router = Router();

/* CREATE CHECKLIST */
router.post(
  "/",
  authJwt,
  societyContext,
  createChecklist
);

/* LIST CHECKLISTS (BY SOCIETY HEADER) */
router.get(
  "/",
  authJwt,
  societyContext,
  getChecklistsBySociety
);

/* UPDATE STATUS (ADMIN / PMC) */
router.patch(
  "/:id/status",
  authJwt,
  societyContext,
  requireRole(["admin", "project_admin"]),
  updateChecklistStatus
);

export default router;
