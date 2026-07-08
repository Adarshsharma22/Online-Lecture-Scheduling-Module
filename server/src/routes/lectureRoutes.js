import express from "express";
import {
  addLecture,
  getCourseLectures,
  deleteLecture,
} from "../controllers/lectureController.js";
import { protect, adminProtect,} from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", protect, adminProtect, addLecture);
router.get("/course/:courseId", protect, adminProtect, getCourseLectures);
router.delete("/:id", protect, adminProtect, deleteLecture);

export default router;