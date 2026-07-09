import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaEnvelope, FaInbox } from "react-icons/fa";
import api from "../../services/api";

function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInstructors = async () => {
    try {
      const res = await api.get("/users/instructors");
      setInstructors(res.data.instructors || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getInstructors(); }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 space-y-4">
        <div className="w-10 h-10 border-[3.5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xs font-bold text-gray-400 tracking-wider uppercase animate-pulse">Loading staff files...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Instructors</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Verified roster of active pedagogical staff with authorized login access.</p>
      </div>

      {instructors.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-300 mx-auto mb-4 shadow-inner">
            <FaInbox size={26} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">No Records Found</h2>
          <p className="text-sm text-gray-400 mt-1">There are currently no active instructor accounts available within the cloud system.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-blue-100/70 transition-all duration-300 flex items-center gap-4 bg-gradient-to-br from-white to-gray-50/20 transform hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center shrink-0 text-blue-600 shadow-sm">
                <FaChalkboardTeacher size={18} />
              </div>

              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex flex-col">
                  <h2 className="text-sm sm:text-base font-bold text-gray-800 truncate tracking-tight">{instructor.name}</h2>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-0.5 min-w-0">
                    <FaEnvelope size={10} className="shrink-0 text-gray-400/70" />
                    <span className="truncate font-medium">{instructor.email}</span>
                  </div>
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-700 text-[10px] font-bold tracking-wide uppercase">
                  {instructor.role || "Faculty"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Instructors;