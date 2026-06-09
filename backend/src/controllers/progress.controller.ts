import { Request, Response } from "express";
import { calculateProgress } from "../services/progress.service";

export const getProjectProgress = async (req: Request, res: Response) => {

  try {

    const projectId = Number(req.params.projectId);

    const progress = await calculateProgress(projectId);

    res.json({
      projectId,
      progress
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to calculate progress"
    });

  }

};