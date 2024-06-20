const SkeletonCircle = ({ size = "16" }) => {
  return (
    <div
      className={`w-${size} h-${size} bg-gray-300 rounded-full animate-pulse`}
    ></div>
  );
};

export default SkeletonCircle;
