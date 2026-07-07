import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "Admin",
  },
  {
    name: "Rahul",
    email: "rahul@gmail.com",
    password: "123456",
    role: "Instructor",
  },
  {
    name: "Priya",
    email: "priya@gmail.com",
    password: "123456",
    role: "Instructor",
  },
  {
    name: "Aman",
    email: "aman@gmail.com",
    password: "123456",
    role: "Instructor",
  },
  {
    name: "Neha",
    email: "neha@gmail.com",
    password: "123456",
    role: "Instructor",
  },
  {
    name: "Arjun",
    email: "arjun@gmail.com",
    password: "123456",
    role: "Instructor",
  },
];

const seedUsers = async () => {
  try {
    await User.deleteMany();

    for (const user of users) {
      await User.create(user); 
    }

    console.log("Users Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();