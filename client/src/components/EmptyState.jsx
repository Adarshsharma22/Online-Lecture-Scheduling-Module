const EmptyState = ({ message }) => {
  return (
    <div className="bg-white rounded-xl shadow p-8 text-center">
      <h2 className="text-xl font-semibold text-gray-700">
        {message}
      </h2>
    </div>
  );
};

export default EmptyState;