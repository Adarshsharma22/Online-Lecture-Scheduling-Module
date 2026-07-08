import { NavLink, useNavigate } from "react-router-dom";
import { FaBookOpen, FaChalkboardTeacher, FaSignOutAlt } from "react-icons/fa";

const InstructorSidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition duration-150 font-medium ${
      isActive 
        ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" 
        : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
    }`;

  return (
    <aside className="w-64 bg-gray-9acting text-white min-h-screen bg-gray-950 p-6 flex flex-col justify-between border-r border-gray-800">
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md">
            L
          </div>
          <h2 className="text-xl font-bold tracking-tight">Instructor Panel</h2>
        </div>

        <nav className="space-y-2">
          <NavLink to="/instructor/dashboard" className={navItemClass}>
            <FaChalkboardTeacher size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/instructor/my-lectures" className={navItemClass}>
            <FaBookOpen size={18} />
            My Lectures
          </NavLink>
        </nav>
      </div>

      <button 
        onClick={logoutHandler}
        className="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-red-950/40 hover:text-red-400 transition duration-150 w-full text-left font-medium mt-auto"
      >
        <FaSignOutAlt size={18} />
        Logout
      </button>
    </aside>
  );
};

export default InstructorSidebar;