import express from "express";
import { protect, adminProtect } from "../middleware/authMiddleware.js";
import { getDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, adminProtect, getDashboard);

export default router;