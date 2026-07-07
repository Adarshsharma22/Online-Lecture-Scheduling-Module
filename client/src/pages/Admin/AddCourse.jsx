import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, level, description, image } = formData;

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !level || !description) {
      return alert("Please fill all required fields.");
    }

    try {
      setLoading(true);

      await api.post("/courses", formData);

      alert("Course created successfully!");

      navigate("/admin/courses");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Add New Course
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Course Name */}
        <div>
          <label className="block mb-2 font-semibold">
            Course Name
          </label>

          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter Course Name"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Level */}
        <div>
          <label className="block mb-2 font-semibold">
            Level
          </label>

          <select
            name="level"
            value={level}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            rows="5"
            placeholder="Enter Course Description"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-2 font-semibold">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={image}
            onChange={handleChange}
            placeholder="https://example.com/image.png"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Preview */}
        {image && (
          <div>
            <label className="block mb-2 font-semibold">
              Image Preview
            </label>

            <img
              src={image}
              alt="Course Preview"
              className="w-full h-56 object-cover rounded-lg border"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Saving..." : "Save Course"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddCourse;