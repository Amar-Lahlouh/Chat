import express from "express";
import { Login, Signup, refreshToken } from "../controllers/auth.js";

const router = express.Router();
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/refresh", refreshToken);
export default router;
