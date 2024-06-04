const PostShimmer = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-300 rounded-full h-12 w-12"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-32 bg-gray-300 rounded"></div>
      </div>
      <div className="mt-4 flex space-x-4">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default PostShimmer;
