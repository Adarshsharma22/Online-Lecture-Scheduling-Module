import Course from "../models/Course.js";

// create new course
export const createCourse = async (req, res) => {
    try{
        const { name, level, description, image } = req.body;

        if (!name || !level || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const course = await Course.create({
            name,
            level,
            description,
            image,
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// get all courses
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.json({
            success: true,
            courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// get course by id
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.json({
            success: true,
            course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// delete course 
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        await course.delete();

        res.json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};