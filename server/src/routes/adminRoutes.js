import express from "express";
import { protect, adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/create-courses", protect, adminProtect, (req, res) => {
    res.json({
        success: true,
        message: "Courses retrieved successfully",
    });
});

export default router;