import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaHome, FaPlusCircle, FaSignOutAlt, FaUserShield } from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const linkBaseClass = "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition duration-150";
  const activeClass = `${linkBaseClass} bg-blue-600 text-white shadow-md shadow-blue-600/10`;
  const normalClass = `${linkBaseClass} text-gray-600 hover:bg-blue-50 hover:text-blue-600`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between fixed h-full z-10">
        <div>
          <div className="py-6 px-6 border-b border-gray-100 flex items-center gap-3">
            <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-sm">
              A
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Lecture Admin</h1>
          </div>

          <nav className="p-4 space-y-1.5">
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>
              <FaHome size={18} /> Dashboard
            </NavLink>
            <NavLink to="/admin/courses" className={({ isActive }) => isActive ? activeClass : normalClass}>
              <FaBook size={18} /> Courses
            </NavLink>
            <NavLink to="/admin/add-course" className={({ isActive }) => isActive ? activeClass : normalClass}>
              <FaPlusCircle size={18} /> Add Course
            </NavLink>
            <NavLink to="/admin/instructors" className={({ isActive }) => isActive ? activeClass : normalClass}>
              <FaChalkboardTeacher size={18} /> Instructors
            </NavLink>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={logoutHandler}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition duration-150"
          >
            <FaSignOutAlt size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 pl-64 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800">Management Panel</h2>
          <div className="flex items-center gap-2.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 text-sm font-semibold text-gray-700">
            <FaUserShield className="text-blue-600" size={16} />
            <span>Welcome, Admin</span>
          </div>
        </header>

        {/* Content Region */}
        <main className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;