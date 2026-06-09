import { Request, Response, NextFunction } from "express";

/**
 * Temporary auth middleware
 * Later replaced by JWT middleware
 */
export function mockAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  /**
   * TEMP: role comes from header
   * Frontend sends: x-user-role
   */
  const role = req.headers["x-user-role"] as string | undefined;

  if (role) {
    (req as any).user = { role };
  }

  next();
}
