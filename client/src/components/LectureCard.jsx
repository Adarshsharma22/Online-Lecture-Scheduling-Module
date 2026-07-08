import { FaCalendarAlt, FaBookOpen } from "react-icons/fa";

const LectureCard = ({ lecture }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-4">
        <FaBookOpen className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">
          {lecture.course?.name}
        </h2>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <FaCalendarAlt size={18} />
        <span>
          {new Date(lecture.lectureDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Instructor: <strong>{lecture.instructor?.name}</strong>
      </div>
    </div>
  );
};

export default LectureCard;