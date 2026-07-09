const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center py-32 px-4 space-y-5 min-h-[40vh]">
      <div className="relative flex items-center justify-center">
      
        <div className="absolute w-14 h-14 border border-blue-100 rounded-full animate-ping opacity-70"></div>
        <div className="w-12 h-12 border-[3.5px] border-blue-600 border-t-transparent rounded-full animate-spin shadow-sm"></div>
      </div>
      <div className="text-sm font-bold text-gray-400 tracking-widest uppercase animate-pulse text-center max-w-xs">
        Synchronizing system states...
      </div>
    </div>
  );
};

export default Loading;