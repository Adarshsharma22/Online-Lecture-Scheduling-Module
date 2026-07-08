import express from "express";
import { protect, instructorProtect } from "../middleware/authMiddleware.js";
import { getMyLectures } from "../controllers/lectureController.js";

const router = express.Router();

router.get("/my-lectures", protect, instructorProtect, getMyLectures);

export default router;