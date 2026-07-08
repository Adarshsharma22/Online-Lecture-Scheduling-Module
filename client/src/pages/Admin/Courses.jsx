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
        <div className="text-sm font-semibold text-gray-400">Fetching courses modules...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Courses</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage academic curricula frameworks, assets, and scheduling models.</p>
        </div>
        <button
          onClick={() => navigate("/admin/add-course")}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-sm transition duration-150 text-sm self-start sm:self-auto"
        >
          <FaPlus size={14} /> Add Course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <FaInbox className="mx-auto text-gray-300 mb-3" size={32} />
          <h2 className="text-lg font-bold text-gray-800">No Courses Registered</h2>
          <p className="text-sm text-gray-500 mt-1">Get started by creating your first instructional course track above.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Cover</th>
                  <th className="p-4">Course Details</th>
                  <th className="p-4">Level</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50/50 transition duration-100">
                    <td className="p-4 pl-6 whitespace-nowrap">
                      <img
                        src={course.image || "https://placehold.co/600x400?text=Module"}
                        alt={course.name}
                        className="w-20 h-12 object-cover rounded-xl border border-gray-100 shadow-sm bg-gray-50"
                      />
                    </td>
                    <td className="p-4 font-semibold text-gray-900 max-w-xs truncate">
                      {course.name}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                        course.level === "Advanced" ? "bg-red-50 text-red-700" :
                        course.level === "Intermediate" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                      }`}>
                        {course.level}
                      </span>
                    </td>
                    <td className="p-4 max-w-md truncate text-gray-500">
                      {course.description}
                    </td>
                    <td className="p-4 pr-6 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => navigate(`/admin/course/${course._id}`)}
                        className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3.5 py-2 rounded-xl text-xs transition"
                      >
                        <FaEye /> View Lectures
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="inline-flex items-center justify-center bg-white border border-gray-200 text-red-600 hover:bg-red-50 p-2.5 rounded-xl text-xs transition"
                        title="Delete Course"
                      >
                        <FaTrash />
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