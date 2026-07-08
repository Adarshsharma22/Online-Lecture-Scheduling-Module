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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-md">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <FaGraduationCap /> Instructor Dashboard
        </h1>
        <p className="text-blue-100 mt-2 text-sm md:text-base">
          Welcome back! 
        </p>
      </div>

      {/* Grid Grid Info cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Total Lectures */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-5 transition hover:shadow-md">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
            <FaBookOpen size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Assigned Lectures
            </p>
            <h2 className="text-3xl font-black text-gray-800 mt-1">
              {lectures.length}
            </h2>
          </div>
        </div>

        {/* Up Next Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-5 transition hover:shadow-md">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
            <FaCalendarAlt size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Upcoming Lecture
            </p>
            {upcomingLecture ? (
              <div className="mt-1">
                <h2 className="text-lg font-bold text-gray-800 truncate">
                  {upcomingLecture.course?.name || "Course not found"}
                </h2>
                <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded-full mt-1">
                  {new Date(upcomingLecture.lectureDate).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 font-medium mt-1">No upcoming lectures</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;