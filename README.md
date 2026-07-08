# Online Lecture Scheduling Module

A full-stack MERN application for managing courses, lecture schedules, and instructor assignments. The system allows administrators to create courses, assign lectures to instructors, and ensures that no instructor is scheduled for multiple lectures on the same date. Instructors can securely log in and view only the lectures assigned to them.

---

# Live Demo

* Frontend: https://online-lecture-scheduling-module-beta.vercel.app
* Backend: https://online-lecture-scheduling-module-cug2.onrender.com

# Features

## Admin Panel

* Secure Admin authentication using JWT
* View all instructors
* Create new courses
* View all courses
* Add multiple lectures (batches) to a course
* Assign instructors to lectures
* Select lecture dates
* Prevent scheduling conflicts
* View all lectures for a course
* Dashboard with course, instructor, and lecture statistics

## Instructor Panel

* Secure Instructor authentication
* View only assigned lectures
* Display lecture date and course name
* Role-based access control

---

# Business Rule

The core feature of this project is lecture scheduling conflict prevention.

If an instructor is already assigned to a lecture on a particular date, the system will prevent assigning that instructor to another lecture on the same date, regardless of the course.

### Example

Existing Lecture

| Course | Instructor | Date  |
| ------ | ---------- | ----- |
| React  | Rahul      | 1 Jan |

Trying to create

| Course  | Instructor | Date  |
| ------- | ---------- | ----- |
| Node.js | Rahul      | 1 Jan |

Result

❌ Rejected

Reason

The instructor already has another lecture scheduled on that date.

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication

* JSON Web Token (JWT)
* bcryptjs

## Hosting

* Vercel
* Render

---

# Project Structure

```text
Lecture-Scheduling-System
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   │   ├── Admin
│   │   │   ├── Instructor
│   │   │   └── Auth
│   │   ├── services
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Database Schema

## User

```javascript
{
  name,
  email,
  password,
  role
}
```

Role

* Admin
* Instructor

---

## Course

```javascript
{
  name,
  level,
  description,
  image
}
```

---

## Lecture

```javascript
{
  course,
  instructor,
  lectureDate
}
```

---

# API Routes

## Authentication

### Login

```
POST /api/auth/login
```

Body

```json
{
  "email": "admin@gmail.com",
  "password": "password"
}
```

Response

```json
{
  "token": "JWT_TOKEN",
  "role": "Admin"
}
```

---

## Users

### Get All Instructors

```
GET /api/users/instructors
```

Authorization

```
Admin
```

---

## Courses

### Create Course

```
POST /api/courses
```

Authorization

```
Admin
```

Body

```json
{
  "name": "React Development",
  "level": "Intermediate",
  "description": "Complete React Course",
  "image": "image-url"
}
```

---

### Get All Courses

```
GET /api/courses
```

---

### Get Course By ID

```
GET /api/courses/:courseId
```

---

## Lectures

### Create Lecture

```
POST /api/lectures
```

Authorization

```
Admin
```

Body

```json
{
  "courseId": "...",
  "instructorId": "...",
  "lectureDate": "2026-07-20"
}
```

---

### Get Lectures of a Course

```
GET /api/lectures/course/:courseId
```

---

### Get Logged-in Instructor Lectures

```
GET /api/lectures/my-lectures
```

Authorization

```
Instructor
```

---

## Dashboard

### Get Dashboard Statistics

```
GET /api/dashboard
```

Returns

* Total Courses
* Total Lectures
* Total Instructors

---

# Authentication Flow

```text
Login

↓

Verify Email

↓

Verify Password

↓

Generate JWT

↓

Return Token

↓

Frontend Stores Token

↓

Protected API Access
```

---

# Lecture Scheduling Flow

```text
Admin Login

↓

Create Course

↓

Open Course

↓

Add Lecture

↓

Select Instructor

↓

Select Date

↓

Backend Validation

↓

Check Existing Lecture

↓

Instructor already assigned?

        YES
         │
         ▼
 Return Conflict Error

         NO
         │
         ▼
 Save Lecture

↓

Return Success
```

---

# Instructor Flow

```text
Instructor Login

↓

JWT Authentication

↓

Get Logged-in User

↓

Fetch Assigned Lectures

↓

Display Course Name

↓

Display Lecture Date
```

---

# Validation Rules

* All required fields must be provided.
* Course must exist.
* Instructor must exist.
* User must have the Instructor role.
* Lecture date is required.
* An instructor cannot have two lectures on the same date.
* Protected routes require a valid JWT.
* Admin-only APIs cannot be accessed by instructors.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Adarshsharma22/Online-Lecture-Scheduling-Module
```

---

## Backend

```bash
cd server
npm install
npm run dev
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Frontend Routes

```
/login

/admin/dashboard

/admin/courses

/admin/add-course

/admin/course/:id

/admin/course/:id/add-lecture

/admin/instructors

/instructor/dashboard

/instructor/my-lectures
```

---

# Backend Routes

## Authentication

```
POST /api/auth/login
```

---

## Users

```
GET /api/users/instructors
```

---

## Courses

```
POST /api/courses

GET /api/courses

GET /api/courses/:courseId
```

---

## Lectures

```
POST /api/lectures

GET /api/lectures/course/:courseId

GET /api/lectures/my-lectures
```

---

## Dashboard

```
GET /api/dashboard
```

---

# Security

* Passwords are hashed using bcryptjs.
* JWT-based authentication.
* Role-based authorization.
* Protected backend APIs.
* Backend validation prevents lecture scheduling conflicts.

---

# Future Improvements

* Edit Course
* Delete Course
* Edit Lecture
* Delete Lecture
* Course Image Upload
* Email Notifications
* Calendar View
* Search & Filters
* Pagination
* Attendance Management

---

# Author

**Adarsh Sharma**
