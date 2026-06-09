import { Router } from "express";
import {
  getSocieties,
  createSociety,
  updateSociety,
  deleteSociety,
  getSocietyDetails,
} from "../controllers/society.controller";
import { authJwt } from "../middlewares/authJwt";
import { requireRole } from "../middlewares/requireRole";
import { societyContext } from "../middlewares/societyContext";

const router = Router();

/* 🔐 List societies (no context needed) */
router.get("/", getSocieties);

router.get("/:id/details", getSocietyDetails);

/* 🔐 Society-specific actions */
router.post(
  "/",
  authJwt,
  requireRole(["admin", "project_admin"]),
  createSociety
);

router.put(
  "/:id",
  authJwt,
  requireRole(["admin", "project_admin"]),
  updateSociety
);

router.delete(
  "/:id",
  authJwt,
  requireRole(["admin", "project_admin"]),
  deleteSociety
);

export default router;
