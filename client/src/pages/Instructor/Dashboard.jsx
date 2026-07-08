import { useEffect, useState } from "react";
import { FaBookOpen, FaCalendarAlt } from "react-icons/fa";
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.lectures);
        setLectures(response.data.lectures);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loading />;

    const upcomingLecture = lectures.find(
    (lecture) => lecture.course
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Instructor Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here is your lecture overview.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4">
            <FaBookOpen size={40} className="text-blue-600" />

            <div>
              <p className="text-gray-500">
                Assigned Lectures
              </p>

              <h2 className="text-4xl font-bold">
                {lectures.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4">
            <FaCalendarAlt size={40} className="text-green-600" />

            <div>
              <p className="text-gray-500">
                Upcoming Lecture
              </p>

              {upcomingLecture ? (
                <>
                  <h2 className="font-semibold">
                    {upcomingLecture?.course ? (
                        <h2 className="font-semibold">
                            {upcomingLecture.course.name}
                        </h2>
                        ) : (
                        <p>Course not found</p>
                    )}
                  </h2>

                  <p className="text-gray-500">
                    {new Date(
                      upcomingLecture.lectureDate
                    ).toLocaleDateString("en-GB")}
                  </p>
                </>
              ) : (
                <p>No upcoming lectures</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">
          Welcome 👋
        </h2>

        <p className="text-gray-600">
          You can view all your assigned lectures from the
          "My Lectures" page.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;