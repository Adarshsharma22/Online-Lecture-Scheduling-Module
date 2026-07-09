import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4 antialiased">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
      
      <div className="w-full max-w-md bg-white border border-gray-100/80 shadow-xl rounded-3xl p-6 sm:p-10 space-y-6 relative z-10 transition-all duration-300">
        
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 transform hover:rotate-6 transition-transform duration-300">
            <FaGraduationCap size={26} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lecture Scheduler</h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-[280px] mx-auto leading-relaxed">
              Secure entry access point for administration & faculty logs
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Corporate Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <FaEnvelope size={14} />
              </div>
              <input
                type="email" name="email" placeholder="name@domain.com"
                value={formData.email} onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50/30 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Secure Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <FaLock size={14} />
              </div>
              <input
                type="password" name="password" placeholder="••••••••"
                value={formData.password} onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50/30 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all focus:bg-white"
                required
              />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" size={14} />
                <span>Authenticating Credentials...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;