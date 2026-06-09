import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* ================= ENV VALIDATION ================= */
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/**
 * ✅ After validation, assert types ONCE
 * This is the correct TypeScript pattern
 */
const JWT_SECRET: string = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1d";

/* ================= TEMP USER STORE ================= */
const users = [
  {
    id: "1",
    userId: "admin001",
    name: "Super Admin",
    role: "admin",
    password: bcrypt.hashSync("admin123", 10),
  },
  {
    id: "2",
    userId: "proj001",
    name: "Project Admin",
    role: "project_admin",
    password: bcrypt.hashSync("proj123", 10),
  },
  {
    id: "3",
    userId: "eng001",
    name: "Engineer",
    role: "engineer",
    password: bcrypt.hashSync("eng123", 10),
  },
  {
    id: "4",
    userId: "ven001",
    name: "Vendor",
    role: "vendor",
    password: bcrypt.hashSync("ven123", 10),
  },
];

/* ================= LOGIN ================= */
export function login(req: Request, res: Response) {
  const { userId, password } = req.body;

  const user = users.find((u) => u.userId === userId);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  /* ================= JWT SIGN ================= */
  const signOptions: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    signOptions
  );

  return res.json({
    token,
    user: {
      id: user.id,
      userId: user.userId,
      name: user.name,
      role: user.role,
    },
  });
}
