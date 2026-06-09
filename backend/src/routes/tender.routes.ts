import { Router } from "express";

import {
  createTender,
  getTenders,
  updateTender,
  deleteTender
} from "../controllers/tender.controller";

import { authJwt } from "../middlewares/authJwt";
import { requireRole } from "../middlewares/requireRole";

const router = Router();

/* VIEW TENDERS (ADMIN / PMC) */

router.get(
  "/",
  authJwt,
  requireRole(["admin", "pmc"]),
  getTenders
);

/* CREATE TENDER (ADMIN / PMC) */

router.post(
  "/",
  authJwt,
  requireRole(["admin", "pmc"]),
  createTender
);

/* UPDATE TENDER (ADMIN) */

router.put(
  "/:id",
  authJwt,
  requireRole(["admin"]),
  updateTender
);

/* DELETE TENDER (ADMIN) */

router.delete(
  "/:id",
  authJwt,
  requireRole(["admin"]),
  deleteTender
);

export default router;