export const LoadingSkeleton = () => (
  <div className="group h-full flex flex-col rounded-md">
    <div className="relative aspect-video bg-gray-200 rounded-md overflow-hidden flex-shrink-0" />
    <div className="py-3 flex-grow flex flex-col">
      <div className="flex items-start justify-between">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
      <div className="mt-1 h-3 bg-gray-200 rounded w-1/4" />
    </div>
  </div>
); 