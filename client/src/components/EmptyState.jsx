import { FaInbox } from "react-icons/fa";

const EmptyState = ({ message }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-sm p-8 md:p-14 text-center max-w-lg mx-auto my-8 w-[calc(100%-2rem)] transition-all duration-300 hover:shadow-md">
      <div className="mx-auto w-14 h-14 bg-gradient-to-b from-gray-50 to-gray-100/50 rounded-2xl flex items-center justify-center text-gray-400 mb-5 border border-gray-100 shadow-inner">
        <FaInbox size={24} className="text-gray-400/80" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 tracking-tight">No Data Found</h3>
      <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-xs mx-auto font-medium">
        {message || "There are no records found matching this layout criterion."}
      </p>
    </div>
  );
};

export default EmptyState;