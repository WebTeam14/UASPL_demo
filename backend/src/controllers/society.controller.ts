import { Request, Response } from "express";
import * as service from "../services/society.service";

/* SOCIETY DETAILS */

export const getSocietyDetails = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const society = await service.getSocietyDetails(id);

    if (!society) {
      return res.status(404).json({
        message: "Society not found"
      });
    }

    res.json(society);

  } catch (error) {

    console.error("Society details error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

/* CREATE */
export const createSociety = async (req: Request, res: Response) => {
  try {
    const { name, address, websiteUrl, code } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Society name is required" });
    }

    const society = await service.createSociety({
      name,
      address,
      websiteUrl,
      code,
    });

    res.status(201).json(society);
  } catch (error) {
    console.error("Create society error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* LIST */
export const getSocieties = async (_req: Request, res: Response) => {
  try {
    const societies = await service.getAllSocieties();
    res.json({ data: societies });
  } catch (error) {
    console.error("Get societies error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE */
export const updateSociety = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, address, websiteUrl, code } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const society = await service.updateSociety(id, {
      name,
      address,
      websiteUrl,
      code,
    });

    res.json(society);
  } catch (error) {
    console.error("Update society error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE */
export const deleteSociety = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid society id" });
    }

    await service.deleteSociety(id);
    res.json({ message: "Society deleted" });
  } catch (error) {
    console.error("Delete society error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
