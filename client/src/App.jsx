import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Courses from "./pages/Admin/Courses";
import Instructors from "./pages/Admin/Instructors";
import AdminLayout from "./layouts/AdminLayout";
import AddCourse from "./pages/Admin/AddCourse";
import CourseDetails from "./pages/Admin/CourseDetails";
import AddLecture from "./pages/Admin/AddLecture";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="instructors" element={<Instructors />} />
          <Route path="course/:id" element={<CourseDetails />} />
          <Route path="course/:id/add-lecture" element={<AddLecture />} />
        </Route>

        <Route path="*" element={<h1>404 | Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

