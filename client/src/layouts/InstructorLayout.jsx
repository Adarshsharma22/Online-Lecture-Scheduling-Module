import { Outlet } from "react-router-dom";
import InstructorSidebar from "../components/InstructorSidebar";

const InstructorLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <InstructorSidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorLayout;