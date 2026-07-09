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
    } catch (error) { console.error(error); }
  };

  const fetchLectures = async () => {
    try {
      const res = await api.get(`/lectures/course/${id}`);
      setLectures(res.data.lectures || []);
    } catch (error) { console.error(error); }
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
        <div className="text-xs font-bold text-gray-400 tracking-wider uppercase animate-pulse">Loading schedule records...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button 
        onClick={() => navigate("/admin/courses")}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-800 transition uppercase tracking-wider"
      >
        <FaChevronLeft size={10} /> Back to Courses
      </button>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-white to-gray-50/30">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-block px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100/30 rounded-full tracking-widest uppercase">
            {course?.level || "General Track"}
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">{course?.name}</h1>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">{course?.description}</p>
        </div>

        <button
          onClick={() => navigate(`/admin/course/${id}/add-lecture`)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-md shadow-blue-500/10 transition-all active:scale-[0.98] w-full md:w-auto shrink-0"
        >
          <FaPlus size={11} /> Add Lecture Slot
        </button>
      </div>

      <div>
        <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 tracking-tight">Allocated Lecture Timeline</h2>

        {lectures.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 sm:p-14 text-center max-w-md mx-auto">
            <h3 className="font-bold text-gray-700">No Lectures Assigned</h3>
            <p className="text-gray-400 text-sm mt-1">This course module layout timeline remains empty. Utilize the slot button above to assign faculty blocks.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group hover:border-blue-100 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-2.5 min-w-0">
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-bold truncate">
                    <FaUserTie className="text-blue-500 shrink-0" size={15} />
                    <span className="truncate">{lecture.instructor?.name || "Unassigned Staff"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg w-max tracking-wide">
                    <FaCalendarAlt className="text-emerald-500" size={13} />
                    <span>
                      {new Date(lecture.lectureDate).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteLecture(lecture._id)}
                  className="bg-white border border-gray-200 text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all shadow-sm active:scale-95 shrink-0 ml-4"
                  title="Remove Allocation"
                >
                  <FaTrashAlt size={13} />
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