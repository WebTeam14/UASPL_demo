import { Request, Response, NextFunction } from "express";

export interface SocietyRequest extends Request {
  societyId?: number;
}

export const societyContext = (
  req: SocietyRequest,
  res: Response,
  next: NextFunction
) => {
  const rawSocietyId = req.headers["x-society-id"];

  if (!rawSocietyId) {
    return res.status(400).json({
      message: "Society not selected",
    });
  }

  // Handle string | string[]
  const societyId =
    Array.isArray(rawSocietyId)
      ? Number(rawSocietyId[0])
      : Number(rawSocietyId);

  if (isNaN(societyId)) {
    return res.status(400).json({
      message: "Invalid society id",
    });
  }

  req.societyId = societyId;
  next();
};
