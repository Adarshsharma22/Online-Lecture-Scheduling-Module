import { FaCalendarAlt, FaBookOpen, FaUserCircle } from "react-icons/fa";

const LectureCard = ({ lecture }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100/80 hover:border-blue-100 p-5 md:p-6 transition-all duration-300 ease-out transform hover:-translate-y-1 flex flex-col justify-between h-full bg-gradient-to-b from-white to-gray-50/30">
      <div>
        <div className="flex items-start gap-4 mb-5">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white shadow-sm">
            <FaBookOpen size={20} />
          </div>
          <div className="min-w-0 space-y-2">
            <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-full uppercase tracking-widest">
              Course Module
            </span>
            <h2 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-2 leading-snug tracking-tight group-hover:text-blue-600 transition-colors duration-200">
              {lecture?.course?.name || "Untitled Course"}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600 bg-white py-3 px-4 rounded-xl border border-gray-100 shadow-inner-sm text-sm">
          <FaCalendarAlt size={15} className="text-gray-400 shrink-0" />
          <span className="font-semibold tracking-wide text-gray-700">
            {lecture?.lectureDate 
              ? new Date(lecture.lectureDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Date unassigned"}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100/80 flex items-center gap-2.5 text-xs md:text-sm text-gray-500">
        <FaUserCircle size={18} className="text-gray-400 shrink-0" />
        <span className="truncate">
          Instructor: <strong className="text-gray-700 font-bold ml-0.5">{lecture?.instructor?.name || "Unassigned"}</strong>
        </span>
      </div>
    </div>
  );
};

export default LectureCard;