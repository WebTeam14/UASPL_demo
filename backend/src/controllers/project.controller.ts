import { Request, Response } from "express";
import * as service from "../services/project.service";

/* CREATE PROJECT */

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, societyId } = req.body;

    if (!name || !societyId) {
      return res.status(400).json({
        message: "name and societyId required",
      });
    }

    const project = await service.createProject({
      name,
      societyId,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* LIST PROJECTS */

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await service.getProjects();

    res.json({
      data: projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE PROJECT */

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const project = await service.updateProject(id, req.body);

    res.json(project);
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE PROJECT */

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await service.deleteProject(id);

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};