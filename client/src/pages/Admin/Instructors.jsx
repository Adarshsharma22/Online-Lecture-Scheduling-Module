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
        <div className="text-sm font-semibold text-gray-400">Loading staff files...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Instructors</h1>
        <p className="text-gray-500 text-sm mt-0.5">Verified roster of pedagogical accounts with access parameters.</p>
      </div>

      {instructors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <FaInbox className="mx-auto text-gray-300 mb-3" size={32} />
          <h2 className="text-lg font-bold text-gray-800">No Records</h2>
          <p className="text-sm text-gray-500 mt-1">There are currently no certified instructors logged within the cloud engine.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                <FaChalkboardTeacher size={20} />
              </div>

              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex flex-col">
                  <h2 className="text-base font-bold text-gray-900 truncate">{instructor.name}</h2>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1 truncate">
                    <FaEnvelope size={11} className="shrink-0" />
                    <span className="truncate">{instructor.email}</span>
                  </div>
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wide">
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