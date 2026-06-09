import { Request, Response } from "express";
import { getUsers } from "../services/user.service";

export const listUsers = async (_req: Request, res: Response) => {

  try {

    const users = await getUsers();

    res.json({
      data: users
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};