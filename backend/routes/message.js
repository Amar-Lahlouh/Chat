import express, { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);
export default router;
