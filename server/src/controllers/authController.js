import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: "Please provide email and password" 
            });
        }

        const user = await User.findOne({ email });

        if (!user){
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};