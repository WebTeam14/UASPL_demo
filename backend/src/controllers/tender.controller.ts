import { Request, Response } from "express";
import * as service from "../services/tender.service";

/* CREATE */

export const createTender = async (req: Request, res: Response) => {

  try {

    const tender = await service.createTender(req.body);

    res.status(201).json(tender);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

/* LIST */

export const getTenders = async (_req: Request, res: Response) => {

  try {

    const tenders = await service.getTenders();

    res.json({
      data: tenders
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

/* UPDATE */

export const updateTender = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const tender = await service.updateTender(id, req.body);

    res.json(tender);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

/* DELETE */

export const deleteTender = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    await service.deleteTender(id);

    res.json({
      message: "Tender deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};