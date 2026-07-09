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
        courseCount: res.data.courseCount || 0,
        instructorCount: res.data.instructorCount || 0,
        lectureCount: res.data.lectureCount || 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getDashboard(); }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 space-y-5 min-h-[50vh]">
        <div className="w-12 h-12 border-[3.5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xs font-bold text-gray-400 tracking-widest uppercase animate-pulse">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">System Analytics</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">Real-time operational overview of curricula frameworks and scheduled lecture allocations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <div className="group bg-white rounded-2xl border border-gray-100 p-6 flex justify-between items-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/40">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Courses</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">{dashboard.courseCount}</h2>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110">
            <FaBook size={24} />
          </div>
        </div>

        <div className="group bg-white rounded-2xl border border-gray-100 p-6 flex justify-between items-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/40">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Instructors</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">{dashboard.instructorCount}</h2>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110">
            <FaChalkboardTeacher size={24} />
          </div>
        </div>

        <div className="group bg-white rounded-2xl border border-gray-100 p-6 flex justify-between items-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/40 sm:col-span-2 lg:col-span-1">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scheduled Lectures</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">{dashboard.lectureCount}</h2>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110">
            <FaCalendarAlt size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;