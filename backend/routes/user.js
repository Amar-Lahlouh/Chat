import express from "express";
// import { protectRoute } from "../middlewares/protectRoute.js";
import { getUsersForSideBar, GetMe } from "../controllers/user.js";
import { VerifyAuth } from "../middlewares/VerifyAuth.js";

const router = express.Router();
router.use(VerifyAuth);
router.get("/Allusers", getUsersForSideBar);
// router.use(protectRoute);
router.use(VerifyAuth);
router.get("/me", GetMe);
export default router;
