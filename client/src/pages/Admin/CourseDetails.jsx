import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt, FaPlus, FaUserTie } from "react-icons/fa";
import api from "../../services/api";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data.course);
    } catch (error) {
      console.error(error);
      alert("Failed to load course.");
    }
  };

  const fetchLectures = async () => {
    try {
      const res = await api.get(`/lectures/course/${id}`);
      setLectures(res.data.lectures);
    } catch (error) {
      console.error(error);
      alert("Failed to load lectures.");
    }
  };

  const deleteLecture = async (lectureId) => {
  const confirmDelete = window.confirm(
    "Delete this lecture?"
  );

  if (!confirmDelete) return;

  try {
    const res = await api.delete(`/lectures/${lectureId}`);

    alert(res.data.message);

    // Refresh lecture list
    fetchLectures();
  } catch (error) {
    alert(error.response?.data?.message || "Failed to delete lecture");
  }
};

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchCourse(), fetchLectures()]);
      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            {course?.name}
          </h1>

          <p className="text-gray-600 mt-2">
            {course?.level}
          </p>

          <p className="mt-3 text-gray-500">
            {course?.description}
          </p>
        </div>

        <button
          onClick={() =>
            navigate(`/admin/course/${id}/add-lecture`)
          }
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          <FaPlus />
          Add Lecture
        </button>

      </div>

      <hr className="mb-8" />

      <h2 className="text-2xl font-semibold mb-6">
        Lectures
      </h2>

      {lectures.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Lectures Scheduled
          </h2>

          <p className="text-gray-500 mt-2">
            Click "Add Lecture" to create one.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {lectures.map((lecture) => (

            <div
              key={lecture._id}
              className="flex items-center gap-4 bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >

              <div className="flex justify-between items-center">

                <div>

                  <div className="flex items-center gap-2 mb-3">

                    <FaUserTie className="text-blue-600" />

                    <span className="font-semibold">
                      {lecture.instructor.name}
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <FaCalendarAlt className="text-green-600" />

                    <span>
                      {new Date(
                        lecture.lectureDate
                      ).toLocaleDateString()}
                    </span>

                  </div>

                </div>

              </div>

              <button
                onClick={() => deleteLecture(lecture._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                Delete
             </button>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}

export default CourseDetails;