const SkeletonLoader = () => {
  return (
    <div className="bg-gray-300 animate-pulse">
      <div className="h-48 bg-gray-400 rounded-lg"></div>
      <div className="mt-4">
        <div className="h-4 bg-gray-400 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-400 rounded w-24"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
