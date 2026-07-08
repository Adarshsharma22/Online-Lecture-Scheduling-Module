import { FaCalendarAlt, FaBookOpen, FaUserCircle } from "react-icons/fa";

const LectureCard = ({ lecture }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mt-0.5 shrink-0">
            <FaBookOpen size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50/70 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Course Module
            </span>
            <h2 className="text-xl font-bold text-gray-800 mt-2 line-clamp-2 leading-snug">
              {lecture.course?.name || "Untitled Course"}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-gray-600 bg-gray-50 py-2.5 px-3 rounded-xl border border-gray-100 text-sm">
          <FaCalendarAlt size={16} className="text-gray-400" />
          <span className="font-medium">
            {new Date(lecture.lectureDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
        <FaUserCircle size={18} className="text-gray-400" />
        <span>Instructor: <strong className="text-gray-700 font-semibold">{lecture.instructor?.name || "Unassigned"}</strong></span>
      </div>
    </div>
  );
};

export default LectureCard;