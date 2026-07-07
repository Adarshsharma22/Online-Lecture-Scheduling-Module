import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  FaBook,
  FaChalkboardTeacher,
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const activeClass =
    "flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-lg";

  const normalClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-100 transition";

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">

        <div className="text-center py-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">
            Lecture Admin
          </h1>
        </div>

        <nav className="p-4 space-y-2">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? activeClass : normalClass
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              isActive ? activeClass : normalClass
            }
          >
            <FaBook />
            Courses
          </NavLink>

          <NavLink
            to="/admin/add-course"
            className={({ isActive }) =>
              isActive ? activeClass : normalClass
            }
          >
            <FaPlusCircle />
            Add Course
          </NavLink>

          <NavLink
            to="/admin/instructors"
            className={({ isActive }) =>
              isActive ? activeClass : normalClass
            }
          >
            <FaChalkboardTeacher />
            Instructors
          </NavLink>

          <button
            onClick={logoutHandler}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-100 text-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </nav>

      </aside>

      {/* Main Content */}
      <div className="flex-1">

        
        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

          <h2 className="text-2xl font-semibold">
            Admin Dashboard
          </h2>

          <div className="font-medium text-gray-600">
            Welcome Admin
          </div>

        </header>

        
        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;