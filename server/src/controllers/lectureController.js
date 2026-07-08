import Lecture from "../models/Lecture.js";
import Course from "../models/Course.js";
import User from "../models/User.js";


// Add Lecture
export const addLecture = async (req, res) => {
  try {
    const { courseId, instructorId, lectureDate } = req.body;
    
    if (!courseId || !instructorId || !lectureDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const date = new Date(lectureDate);

    if (isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid lecture date.",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const instructor = await User.findOne({
      _id: instructorId,
      role: "Instructor",
    });

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }


    // Conflict Check    
    const conflict = await Lecture.findOne({
      instructor: instructorId,
      lectureDate: new Date(lectureDate),
    });

    if (conflict) {
      return res.status(400).json({
        success: false,
        message:
          "This instructor already has a lecture scheduled on this date.",
      });
    }

    const lecture = await Lecture.create({
      course: courseId,
      instructor: instructorId,
      lectureDate,
    });

    const populatedLecture = await Lecture.findById(lecture._id)
      .populate("course", "name")
      .populate("instructor", "name email");

    res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lecture: populatedLecture,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Lectures of One Course
export const getCourseLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      course: req.params.courseId,
    })
      .populate("course", "name")
      .populate("instructor", "name")
      .sort({ lectureDate: 1 });

    res.status(200).json({
      success: true,
      lectures,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Lecture
export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    await lecture.deleteOne();

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};