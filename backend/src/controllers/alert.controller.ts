import { Request, Response } from "express";
import * as service from "../services/alert.service";

/* CREATE ALERT */

export const createAlert = async (req: Request, res: Response) => {

  try {

    const { userId, message } = req.body;

    /* VALIDATION */

    if (!userId || !message) {
      return res.status(400).json({
        message: "userId and message are required"
      });
    }

    const alert = await service.createAlert({
      userId: Number(userId),
      message
    });

    res.status(201).json(alert);

  } catch (error) {

    console.error("Create alert error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* GET ALERTS */

export const getAlerts = async (req: Request, res: Response) => {

  try {

    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        message: "Invalid userId"
      });
    }

    const alerts = await service.getAlerts(userId);

    res.json({
      data: alerts
    });

  } catch (error) {

    console.error("Get alerts error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* MARK ALERT READ */

export const markAlertRead = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        message: "Invalid alert id"
      });
    }

    const alert = await service.markAlertRead(id);

    res.json(alert);

  } catch (error) {

    console.error("Update alert error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};