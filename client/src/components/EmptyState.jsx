import { FaInbox } from "react-icons/fa";

const EmptyState = ({ message }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center max-w-lg mx-auto my-6">
      <div className="mx-auto w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 mb-4">
        <FaInbox size={22} />
      </div>
      <h2 className="text-lg font-bold text-gray-800">No Data Found</h2>
      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
        {message || "There are no records found matches this layout criterion."}
      </p>
    </div>
  );
};

export default EmptyState;