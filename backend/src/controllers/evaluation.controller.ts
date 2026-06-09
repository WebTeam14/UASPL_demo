import { Request, Response } from "express";
import { selectWinner } from "../services/evaluation.service";

export const evaluateTender = async (req: Request, res: Response) => {

  try {

    const tenderId = Number(req.params.tenderId);

    const result = await selectWinner(tenderId);

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Evaluation failed"
    });

  }

};