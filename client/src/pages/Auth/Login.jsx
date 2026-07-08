import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import api from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/instructor/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Parameters Invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-2xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <FaGraduationCap size={24} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lecture Scheduler</h1>
          <p className="text-sm text-gray-400">Secure entry access point for administration & faculty logs</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Corporate Email</label>
            <input
              type="email" name="email" placeholder="name@domain.com"
              value={formData.email} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder:text-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Secure Password</label>
            <input
              type="password" name="password" placeholder="••••••••"
              value={formData.password} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder:text-gray-300"
              required
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/10 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Authenticating Credentials..." : "Authenticate Logs"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;