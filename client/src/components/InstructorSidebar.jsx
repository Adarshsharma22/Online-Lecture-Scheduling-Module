import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBookOpen, FaChalkboardTeacher, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const InstructorSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3.5 p-3.5 rounded-xl transition-all duration-200 font-semibold tracking-wide text-sm ${
      isActive 
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-[1.02]" 
        : "text-gray-400 hover:bg-gray-900 hover:text-gray-100"
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
     
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/20 text-lg">
              L
            </div>
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Instructor Panel
            </h2>
          </div>
   
          <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white p-1">
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          <NavLink to="/instructor/dashboard" className={navItemClass} onClick={() => setIsOpen(false)}>
            <FaChalkboardTeacher size={19} />
            Dashboard
          </NavLink>

          <NavLink to="/instructor/my-lectures" className={navItemClass} onClick={() => setIsOpen(false)}>
            <FaBookOpen size={19} />
            My Lectures
          </NavLink>
        </nav>
      </div>

      <button 
        onClick={() => { logoutHandler(); setIsOpen(false); }}
        className="flex items-center gap-3.5 p-3.5 rounded-xl text-gray-400 hover:bg-red-950/30 hover:text-red-400 transition-all duration-200 w-full text-left font-semibold text-sm border border-transparent hover:border-red-900/30 mt-auto"
      >
        <FaSignOutAlt size={19} className="rotate-180" />
        Logout
      </button>
    </div>
  );

  return (
    <>
      <header className="lg:hidden w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-800 text-white p-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
            L
          </div>
          <h2 className="text-lg font-bold tracking-tight">Instructor Panel</h2>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-gray-400 hover:text-white transition-colors">
          <FaBars size={20} />
        </button>
      </header>

      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-gray-950 p-6 flex flex-col border-r border-gray-900 z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {sidebarContent}
      </aside>

      
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-gray-950 p-6 flex-col border-r border-gray-900 z-40 overflow-y-auto">
        {sidebarContent}
      </aside>

     
      <div className="hidden lg:block w-64 shrink-0 h-screen" />
    </>
  );
};

export default InstructorSidebar;