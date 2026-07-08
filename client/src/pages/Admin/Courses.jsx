import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import api from "../../services/api";

function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.courses);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  try {
    const res = await api.delete(`/courses/${id}`);

    alert(res.data.message);

    getCourses();
  } catch (error) {
    alert(error.response?.data?.message || "Failed to delete course.");
  }
};

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        Loading Courses...
      </div>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Courses
        </h1>

        <button
          onClick={() => navigate("/admin/add-course")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          <FaPlus />
          Add Course
        </button>

      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Courses Found
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Course Name
                </th>

                <th className="p-4 text-left">
                  Level
                </th>

                <th className="p-4 text-left">
                  Description
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {courses.map((course) => (

                <tr
                  key={course._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">

                    <img
                      src={
                        course.image ||
                        "https://placehold.co/100x70?text=Course"
                      }
                      alt={course.name}
                      className="w-24 h-16 object-cover rounded-lg"
                    />

                  </td>

                  <td className="p-4 font-semibold">
                    {course.name}
                  </td>

                  <td className="p-4">
                    {course.level}
                  </td>

                  <td className="p-4">
                    {course.description}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() =>
                        navigate(`/admin/course/${course._id}`)
                      }
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      <FaEye />
                      View Lectures
                    </button>

                    <button
                        onClick={() => deleteCourse(course._id)}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg"
                        >
                        <FaTrash />
                        
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Courses;