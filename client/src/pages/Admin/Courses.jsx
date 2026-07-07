import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import api from "../../services/api";

function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get All Courses
  const getCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.courses);
    } catch (error) {
      console.log(error);
      alert("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // Delete Course
  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/courses/${id}`);

      alert("Course deleted successfully");

      getCourses();
    } catch (error) {
      console.log(error);
      alert("Failed to delete course");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center text-xl mt-10">
        Loading Courses...
      </h2>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Courses
        </h1>

        <button
          onClick={() => navigate("/admin/add-course")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          <FaPlus />
          Add Course
        </button>

      </div>

      {/* Empty */}

      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Courses Found
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Course
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
                      src={course.image}
                      alt={course.name}
                      className="w-20 h-14 object-cover rounded"
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
                      onClick={() => deleteCourse(course._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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