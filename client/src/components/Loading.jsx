const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center py-24 space-y-4">
      <div className="w-10 h-10 border-[3.5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-sm font-semibold text-gray-500 tracking-medium animate-pulse">
        Synchronizing system states...
      </div>
    </div>
  );
};

export default Loading;