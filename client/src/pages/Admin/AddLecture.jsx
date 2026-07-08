import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function AddLecture() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({ instructorId: "", lectureDate: "" });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCourse = async () => {
    const res = await api.get(`/courses/${id}`);
    setCourse(res.data.course);
  };

  const fetchInstructors = async () => {
    const res = await api.get("/users/instructors");
    setInstructors(res.data.instructors);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchCourse(), fetchInstructors()]);
      } catch (error) {
        console.error(error);
        alert("Failed to initialize course parameters.");
      } finally {
        setPageLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.instructorId || !formData.lectureDate) return alert("Please fill all required parameters.");

    try {
      setLoading(true);
      await api.post("/lectures", {
        courseId: id,
        instructorId: formData.instructorId,
        lectureDate: formData.lectureDate,
      });
      alert("Lecture successfully scheduled!");
      navigate(`/admin/course/${id}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong while logging schedule details.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Retrieving parameters...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Schedule a Lecture</h1>
        <p className="text-center text-sm text-gray-500 mt-1">Assign an instructor and allocate calendar dates to this operational module.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Course</label>
          <input
            type="text" value={course?.name || ""} readOnly
            className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-gray-50 font-medium text-gray-600 outline-none select-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assigned Instructor</label>
          <select
            name="instructorId" value={formData.instructorId} onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            required
          >
            <option value="">Choose Instructor</option>
            {instructors.map((inst) => (
              <option key={inst._id} value={inst._id}>{inst.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lecture Date</label>
          <input
            type="date" name="lectureDate" value={formData.lectureDate} onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm p-3.5 rounded-xl font-medium">
            {errorMessage}
          </div>
        )}

        <div className="flex gap-4 pt-4 border-t border-gray-100 mt-6">
          <button
            type="button" onClick={() => navigate(`/admin/course/${id}`)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm transition"
          >
            Cancel
          </button>
          <button
            type="submit" disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm shadow-md shadow-blue-500/10 transition disabled:opacity-50"
          >
            {loading ? "Scheduling..." : "Confirm Assignment"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLecture;