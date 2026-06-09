import { Router } from "express";

import {
  dashboardStats,
  dashboardSocieties
} from "../controllers/dashboard.controller";

const router = Router();

/* MAIN DASHBOARD */

router.get("/", dashboardStats);

/* SOCIETY LIST */

router.get("/societies", dashboardSocieties);

export default router;