const SkeletonCard = () => (
  <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="h-24 w-24 bg-gray-700 rounded-full mb-4 animate-pulse"></div>
      <div className="h-8 w-3/4 bg-gray-700 rounded-md animate-pulse"></div>
    </div>
  </div>
);

export default SkeletonCard;
