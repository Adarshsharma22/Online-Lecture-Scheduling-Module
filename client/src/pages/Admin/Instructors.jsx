import { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import api from "../../services/api";

function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInstructors = async () => {
    try {
      const res = await api.get("/users/instructors");
      setInstructors(res.data.instructors);
    } catch (error) {
      console.log(error);
      alert("Failed to load instructors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInstructors();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        Loading Instructors...
      </div>
    );
  }

  return (
    <div>

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Instructors
        </h1>

        <p className="text-gray-500 mt-2">
          List of all registered instructors.
        </p>
      </div>

      {/* Empty State */}
      {instructors.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Instructors Found
          </h2>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaChalkboardTeacher
                    size={30}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    {instructor.name}
                  </h2>

                  <p className="text-gray-600">
                    {instructor.email}
                  </p>

                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    {instructor.role}
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Instructors;