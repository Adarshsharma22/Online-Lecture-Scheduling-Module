import Course from "../models/Course.js";
import User from "../models/User.js";
import Lecture from "../models/Lecture.js";

export const getDashboard = async (req, res) => {
    try {
        const courseCount = await Course.countDocuments();

        const instructorCount = await User.countDocuments({
            role: "Instructor",
        });

        const lectureCount = await Lecture.countDocuments();

        res.json({
            success: true,
            message: "Dashboard fetched successfully",
            courseCount,
            instructorCount,
            lectureCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};