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
      console.log(error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-20">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Courses */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Courses
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {dashboard.courseCount}
              </h2>
            </div>

            <FaBook
              size={45}
              className="text-blue-600"
            />

          </div>

        </div>

        {/* Instructors */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Instructors
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {dashboard.instructorCount}
              </h2>
            </div>

            <FaChalkboardTeacher
              size={45}
              className="text-green-600"
            />

          </div>

        </div>

        {/* Lectures */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Lectures
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {dashboard.lectureCount}
              </h2>
            </div>

            <FaCalendarAlt
              size={45}
              className="text-red-600"
            />

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;