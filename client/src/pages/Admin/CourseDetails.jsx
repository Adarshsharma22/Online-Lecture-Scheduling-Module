import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt, FaPlus, FaUserTie, FaTrashAlt, FaChevronLeft } from "react-icons/fa";
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
    }
  };

  const fetchLectures = async () => {
    try {
      const res = await api.get(`/lectures/course/${id}`);
      setLectures(res.data.lectures || []);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLecture = async (lectureId) => {
    if (!window.confirm("Remove this lecture assignment?")) return;
    try {
      const res = await api.delete(`/lectures/${lectureId}`);
      alert(res.data.message);
      fetchLectures();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to remove allocation.");
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
      <div className="flex flex-col justify-center items-center py-32 space-y-4">
        <div className="w-10 h-10 border-[3.5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-sm font-semibold text-gray-400">Loading schedules...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back to courses */}
      <button 
        onClick={() => navigate("/admin/courses")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition"
      >
        <FaChevronLeft size={12} /> Back to Courses
      </button>

      {/* Hero Metadata Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-block px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 rounded-full tracking-wider uppercase">
            {course?.level || "General"}
          </span>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{course?.name}</h1>
          <p className="text-gray-500 text-sm leading-relaxed">{course?.description}</p>
        </div>

        <button
          onClick={() => navigate(`/admin/course/${id}/add-lecture`)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-md shadow-blue-500/10 transition shrink-0"
        >
          <FaPlus size={12} /> Add Lecture Slot
        </button>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Allocated Lecture Timeline</h2>

        {lectures.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-12 text-center">
            <h3 className="font-bold text-gray-700">No Lectures Assigned</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">This course module timeline is empty. Click the action layout button above to delegate classes.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group hover:border-gray-200 transition"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <FaUserTie className="text-blue-500" />
                    <span>{lecture.instructor?.name || "Unassigned"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg w-max">
                    <FaCalendarAlt className="text-emerald-500" />
                    <span>
                      {new Date(lecture.lectureDate).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteLecture(lecture._id)}
                  className="bg-white border border-gray-200 text-red-600 hover:bg-red-50 p-3 rounded-xl transition shadow-sm"
                  title="Remove Allocation"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;