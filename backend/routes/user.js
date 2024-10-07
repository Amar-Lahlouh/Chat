import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { getUsersForSideBar, GetMe } from "../controllers/user.js";

const router = express.Router();

router.get("/Allusers", protectRoute, getUsersForSideBar);
router.use(protectRoute);
router.get("/me", GetMe);
export default router;
