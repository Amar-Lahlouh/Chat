import express, { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.js";
// import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/send/:id", sendMessage);
router.get("/:id", getMessages);
export default router;
