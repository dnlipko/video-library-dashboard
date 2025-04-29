import React from 'react';

export const LoadingSkeleton = () => (
  <div className="group bg-white rounded-md overflow-hidden animate-pulse">
    <div className="relative aspect-video bg-gray-200" />
    <div className="p-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="mt-1 h-3 bg-gray-200 rounded w-1/4" />
      <div className="mt-2 flex gap-1">
        <div className="h-5 bg-gray-200 rounded-full w-16" />
        <div className="h-5 bg-gray-200 rounded-full w-16" />
      </div>
    </div>
  </div>
); 