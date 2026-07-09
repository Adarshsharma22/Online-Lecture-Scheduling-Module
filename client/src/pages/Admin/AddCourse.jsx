import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", level: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);
  const { name, level, description, image } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !level || !description) return alert("Please fill all required fields.");

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
    <div className="max-w-2xl mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl p-5 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center tracking-tight">Add New Course</h1>
        <p className="text-center text-xs sm:text-sm text-gray-400 mt-1">Configure parameters to deploy a new instructional learning architecture track.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Course Name</label>
          <input
            type="text" name="name" value={name} onChange={handleChange}
            placeholder="e.g. Master Clean Code Architecture"
            className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-gray-50/30"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Skill Level</label>
          <select
            name="level" value={level} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-white"
            required
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
          <textarea
            name="description" value={description} onChange={handleChange} rows="4"
            placeholder="Provide an overview description of the course scope..."
            className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-gray-50/30"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Image URL (Optional)</label>
          <input
            type="url" name="image" value={image} onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-gray-50/30"
          />
        </div>

        {image && (
          <div className="bg-gray-50/50 p-3 rounded-2xl border border-dashed border-gray-200 transition-all duration-300">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Live Graphic Preview</span>
            <img
              src={image} alt="Course Preview"
              className="w-full aspect-video md:h-44 object-cover rounded-xl border border-gray-100 shadow-inner"
              onError={(e) => e.target.style.display = "none"}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 mt-6">
          <button
            type="button" onClick={() => navigate("/admin/courses")}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit" disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-500/10 transition-all active:scale-[0.99] disabled:opacity-50 order-1 sm:order-2"
          >
            {loading ? "Saving Module..." : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;