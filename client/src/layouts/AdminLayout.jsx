import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaHome, FaPlusCircle, FaSignOutAlt, FaUserShield, FaBars, FaTimes } from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const linkBaseClass = "flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 active:scale-[0.98]";
  const activeClass = `${linkBaseClass} bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20 scale-[1.02]`;
  const normalClass = `${linkBaseClass} text-gray-500 hover:bg-gray-100 hover:text-gray-900`;

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-white">
      <div>
        <div className="py-5 px-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/10 text-lg">
              A
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Lecture Admin</h1>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-gray-600 p-1">
            <FaTimes size={18} />
          </button>
        </div>

        <nav className="p-4 space-y-1.5">
          <NavLink to="/admin/dashboard" onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>
            <FaHome size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/courses" onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>
            <FaBook size={18} /> Courses
          </NavLink>
          <NavLink to="/admin/add-course" onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>
            <FaPlusCircle size={18} /> Add Course
          </NavLink>
          <NavLink to="/admin/instructors" onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>
            <FaChalkboardTeacher size={18} /> Instructors
          </NavLink>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button
          onClick={() => { logoutHandler(); setIsSidebarOpen(false); }}
          className="flex items-center gap-3.5 w-full px-4 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-200 active:scale-[0.98]"
        >
          <FaSignOutAlt size={18} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50/60 antialiased">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white z-50 border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {sidebarContent}
      </aside>

      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex-col justify-between z-40">
        {sidebarContent}
      </aside>

      <div className="hidden lg:block w-64 shrink-0" />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FaBars size={18} />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">Management Panel</h2>
          </div>

          <div className="flex items-center gap-2.5 bg-gray-100/80 border border-gray-200/40 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-gray-700 shadow-inner">
            <FaUserShield className="text-blue-600 shrink-0" size={15} />
            <span className="hidden sm:inline">Welcome, Admin</span>
            <span className="sm:hidden">Admin</span>
          </div>
        </header>

        <main className="p-4 sm:p-6 md:p-8 flex-1 w-full mx-auto max-w-7xl overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;