import { Request, Response } from "express";
import {
  getDashboardStats,
  getSocietiesWithProjects
} from "../services/dashboard.service";

/* DASHBOARD MAIN STATS */

export const dashboardStats = async (_req: Request, res: Response) => {

  try {

    const stats = await getDashboardStats();

    res.json(stats);

  } catch (error) {

    console.error("Dashboard stats error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* DASHBOARD SOCIETY LIST */

export const dashboardSocieties = async (_req: Request, res: Response) => {

  try {

    const societies = await getSocietiesWithProjects();

    res.json({
      societies
    });

  } catch (error) {

    console.error("Dashboard societies error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};