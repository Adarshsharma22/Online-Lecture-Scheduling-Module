import { useEffect, useState } from "react";
import { FaBookOpen, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import api from "../../services/api";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/instructor/my-lectures", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLectures(response.data.lectures || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <Loading />;

  const upcomingLecture = lectures.find((lecture) => lecture.course);

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 antialiased">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden shadow-blue-600/10">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        
        <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-3 tracking-tight relative z-10">
          <FaGraduationCap className="text-blue-100 shrink-0" /> Instructor Dashboard
        </h1>
        <p className="text-blue-100/90 mt-1.5 text-xs sm:text-sm font-medium tracking-wide relative z-10">
          Welcome back! Review your active schedules and assigned timeline records below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="group bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6 flex items-center gap-4 sm:gap-5 transition-all duration-300 hover:shadow-xl hover:border-blue-100/50 transform hover:-translate-y-0.5 bg-gradient-to-br from-white to-gray-50/30">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <FaBookOpen size={24} className="sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
              Assigned Lectures
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mt-0.5 tracking-tight">
              {lectures.length}
            </h2>
          </div>
        </div>

        <div className="group bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6 flex items-center gap-4 sm:gap-5 transition-all duration-300 hover:shadow-xl hover:border-emerald-100/50 transform hover:-translate-y-0.5 bg-gradient-to-br from-white to-gray-50/30">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <FaCalendarAlt size={24} className="sm:w-7 sm:h-7" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
              Upcoming Lecture
            </p>
            {upcomingLecture ? (
              <div className="mt-1 space-y-1">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate tracking-tight group-hover:text-emerald-600 transition-colors">
                  {upcomingLecture.course?.name || "Untitled Course"}
                </h2>
                <span className="inline-block text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50/80 border border-emerald-100/50 px-2.5 py-0.5 rounded-full tracking-wide">
                  {new Date(upcomingLecture.lectureDate).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </span>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-gray-400 font-semibold mt-1">
                No upcoming modules found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;