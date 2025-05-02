import { HiFilm } from 'react-icons/hi';

export const EmptyState = () => {
  return (
    <div className="col-span-full p-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
          <HiFilm className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Videos Found</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          We couldn't find any videos matching your criteria. Try adjusting your search filters or browse our collection.
        </p>
      </div>
    </div>
  );
}; 