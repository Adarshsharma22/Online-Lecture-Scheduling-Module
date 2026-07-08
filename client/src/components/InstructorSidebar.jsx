import { NavLink } from "react-router-dom";
import { FaBookOpen, FaChalkboardTeacher, FaSignOutAlt } from "react-icons/fa";

const InstructorSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">
        Instructor
      </h2>

      <nav className="space-y-3">
        <NavLink
          to="/instructor/dashboard"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
        >
          <FaChalkboardTeacher size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/instructor/my-lectures"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
        >
          <FaBookOpen size={20} />
          My Lectures
        </NavLink>

        <button className="flex items-center gap-3 p-3 rounded hover:bg-red-600 w-full text-left">
          <FaSignOutAlt size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default InstructorSidebar;