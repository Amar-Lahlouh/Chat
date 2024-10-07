import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { getUsersForSideBar } from "../controllers/user.js";

const router = express.Router();

router.get("/Allusers", protectRoute, getUsersForSideBar);

export default router;
