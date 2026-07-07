import express from "express";
import { protect, adminProtect } from "../middleware/authMiddleware.js";
import {
  createCourse,
  getCourses,
  getCourseById,
  deleteCourse,
} from "../controllers/courseController.js";


const router = express.Router();

router.post("/", protect, adminProtect, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.delete("/:id", protect, adminProtect, deleteCourse);

export default router;