import User from "../models/User.js";

export const getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({
      role: "Instructor",
    }).select("-password");

    res.json({
      success: true,
      instructors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};