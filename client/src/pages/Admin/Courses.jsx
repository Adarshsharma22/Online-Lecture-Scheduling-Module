import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPlus, FaTrash, FaInbox } from "react-icons/fa";
import api from "../../services/api";

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course and its assignments?")) return;
    try {
      const res = await api.delete(`/courses/${id}`);
      alert(res.data.message);
      getCourses();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete course.");
    }
  };

  useEffect(() => { getCourses(); }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 space-y-4">
        <div className="w-10 h-10 border-[3.5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xs font-bold text-gray-400 tracking-wider uppercase animate-pulse">Fetching courses...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Content Action Panel */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-5 sm:p-6 border border-gray-100 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Courses</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Manage institutional frameworks, academic assets, and scheduling models.</p>
        </div>
        <button
          onClick={() => navigate("/admin/add-course")}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3.5 rounded-xl shadow-md shadow-blue-600/10 transition-all active:scale-[0.98] text-sm self-stretch sm:self-auto"
        >
          <FaPlus size={12} /> Add Course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-300 mx-auto mb-4 shadow-inner">
            <FaInbox size={26} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">No Courses Registered</h2>
          <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">Get started by building your first academic syllabus path above.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[700px]">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <th className="p-4 pl-6 w-28">Cover</th>
                  <th className="p-4">Course Details</th>
                  <th className="p-4 w-32">Level</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 pr-6 text-right w-44">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="p-4 pl-6 whitespace-nowrap">
                      <img
                        src={course.image || "https://placehold.co/600x400?text=Module"}
                        alt={course.name}
                        className="w-20 h-12 object-cover rounded-xl border border-gray-100 shadow-sm bg-gray-100"
                      />
                    </td>
                    <td className="p-4 font-bold text-gray-800 max-w-xs truncate group-hover:text-blue-600 transition-colors">
                      {course.name}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-full tracking-wide uppercase border ${
                        course.level === "Advanced" ? "bg-red-50 text-red-700 border-red-100/40" :
                        course.level === "Intermediate" ? "bg-amber-50 text-amber-700 border-amber-100/40" : "bg-blue-50 text-blue-700 border-blue-100/40"
                      }`}>
                        {course.level}
                      </span>
                    </td>
                    <td className="p-4 max-w-sm truncate text-gray-400 font-medium">
                      {course.description}
                    </td>
                    <td className="p-4 pr-6 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => navigate(`/admin/course/${course._id}`)}
                        className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3.5 py-2 rounded-xl text-xs transition-all active:scale-95"
                      >
                        <FaEye size={12} /> View
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="inline-flex items-center justify-center bg-white border border-gray-200 text-red-600 hover:bg-red-50/70 p-2.5 rounded-xl text-xs transition-all active:scale-95 shadow-sm"
                        title="Delete Course"
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;