import { Request, Response } from "express";
import * as service from "../services/bidder.service";

/* CREATE BID */

export const createBidder = async (req: Request, res: Response) => {

  try {

    const bidder = await service.createBidder(req.body);

    res.status(201).json(bidder);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* LIST BIDDERS */

export const getBidders = async (_req: Request, res: Response) => {

  try {

    const bidders = await service.getBidders();

    res.json({
      data: bidders
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* UPDATE */

export const updateBidder = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const bidder = await service.updateBidder(id, req.body);

    res.json(bidder);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* DELETE */

export const deleteBidder = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    await service.deleteBidder(id);

    res.json({
      message: "Bidder deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};