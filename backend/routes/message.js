import express, { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.js";
import { VerifyAuth } from "../middlewares/VerifyAuth.js";
// import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();
router.use(VerifyAuth);
router.post("/send/:id", sendMessage);
router.get("/:id", getMessages);
export default router;
