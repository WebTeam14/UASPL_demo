import { Router } from "express";

import {
  createBidder,
  getBidders,
  updateBidder,
  deleteBidder
} from "../controllers/bidder.controller";

const router = Router();

router.get("/", getBidders);

router.post("/", createBidder);

router.put("/:id", updateBidder);

router.delete("/:id", deleteBidder);

export default router;