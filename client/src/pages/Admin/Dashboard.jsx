import { useEffect, useState } from "react";
import { FaBook, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa";
import api from "../../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    courseCount: 0,
    instructorCount: 0,
    lectureCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const getDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setDashboard({
        courseCount: res.data.courseCount,
        instructorCount: res.data.instructorCount,
        lectureCount: res.data.lectureCount,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 space-y-4">
        <div className="w-10 h-10 border-[3.5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-sm font-semibold text-gray-400 animate-pulse">Loading administrative analytics...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Real-time overview of current institutional frameworks and lecture slots.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Courses */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex justify-between items-center shadow-sm hover:shadow-md transition duration-200">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Courses</p>
            <h2 className="text-4xl font-black text-gray-800 mt-2">{dashboard.courseCount}</h2>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <FaBook size={26} />
          </div>
        </div>

        {/* Instructors */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex justify-between items-center shadow-sm hover:shadow-md transition duration-200">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Instructors</p>
            <h2 className="text-4xl font-black text-gray-800 mt-2">{dashboard.instructorCount}</h2>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <FaChalkboardTeacher size={26} />
          </div>
        </div>

        {/* Lectures */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex justify-between items-center shadow-sm hover:shadow-md transition duration-200">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Scheduled Lectures</p>
            <h2 className="text-4xl font-black text-gray-800 mt-2">{dashboard.lectureCount}</h2>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <FaCalendarAlt size={26} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;