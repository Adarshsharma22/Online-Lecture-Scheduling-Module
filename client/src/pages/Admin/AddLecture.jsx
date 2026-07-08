import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function AddLecture() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);

  const [formData, setFormData] = useState({
    instructorId: "",
    lectureDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch Course
  const fetchCourse = async () => {
    const res = await api.get(`/courses/${id}`);
    setCourse(res.data.course);
  };

  // Fetch Instructors
  const fetchInstructors = async () => {
    const res = await api.get("/users/instructors");
    setInstructors(res.data.instructors);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchCourse(),
          fetchInstructors(),
        ]);
      } catch (error) {
        console.error(error);
        alert("Failed to load page.");
      } finally {
        setPageLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setErrorMessage("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.instructorId || !formData.lectureDate) {
      return alert("Please fill all fields.");
    }

    try {
      setLoading(true);

      await api.post("/lectures", {
        courseId: id,
        instructorId: formData.instructorId,
        lectureDate: formData.lectureDate,
      });

      alert("Lecture added successfully!");

      navigate(`/admin/course/${id}`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Add Lecture
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Course */}

        <div>

          <label className="block font-semibold mb-2">
            Course
          </label>

          <input
            type="text"
            value={course?.name}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />

        </div>

        {/* Instructor */}

        <div>

          <label className="block font-semibold mb-2">
            Instructor
          </label>

          <select
            name="instructorId"
            value={formData.instructorId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Instructor
            </option>

            {instructors.map((instructor) => (
              <option
                key={instructor._id}
                value={instructor._id}
              >
                {instructor.name}
              </option>
            ))}

          </select>

        </div>

        {/* Date */}

        <div>

          <label className="block font-semibold mb-2">
            Lecture Date
          </label>

          <input
            type="date"
            name="lectureDate"
            value={formData.lectureDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Error */}

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Buttons */}

        <div className="flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading ? "Saving..." : "Save Lecture"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(`/admin/course/${id}`)
            }
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddLecture;
