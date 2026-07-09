import { Outlet } from "react-router-dom";
import InstructorSidebar from "../components/InstructorSidebar";

const InstructorLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50/50 antialiased">
      <InstructorSidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full mx-auto max-w-7xl overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorLayout;