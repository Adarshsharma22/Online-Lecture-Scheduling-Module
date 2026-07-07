import express from "express";
import { protect, instructorProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my-lectures", protect, instructorProtect, (req, res) => {
    res.json({
        success: true,
        message: "Lectures retrieved successfully",
    });
}); 

export default router;