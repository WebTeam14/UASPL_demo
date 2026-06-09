import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { listUsers } from "../controllers/user.controller";

const router = Router();

router.post("/login", login);

/* GET USERS */

router.get("/users", listUsers);

export default router;