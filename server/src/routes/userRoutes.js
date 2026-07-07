import express from "express";
import { getInstructors } from "../controllers/userController.js";
import { protect, adminProtect,} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/instructors", protect, adminProtect, getInstructors);

export default router;