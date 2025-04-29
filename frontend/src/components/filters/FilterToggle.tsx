import React, { useState, useRef } from 'react';
import { VideoFilters as VideoFiltersType } from '../../types/video';
import { FilterPanel } from './FilterPanel';
import { HiOutlineFilter } from 'react-icons/hi';

interface FilterToggleProps {
  activeFiltersCount: number;
  onFiltersChange: (callback: (filters: VideoFiltersType) => VideoFiltersType) => void;
  clearFilters: () => void;
  tags: VideoFiltersType['tags'];
  selectedTags: VideoFiltersType['tags'];
  dateRange: VideoFiltersType['dateRange'];
}

export const FilterToggle: React.FC<FilterToggleProps> = ({
  activeFiltersCount,
  onFiltersChange,
  clearFilters,
  dateRange,
  tags,
  selectedTags,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <HiOutlineFilter className="mr-2 h-5 w-5 text-gray-400" />
        Filters
        {activeFiltersCount > 0 && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {activeFiltersCount}
          </span>
        )}
      </button>

      <FilterPanel
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        onFiltersChange={onFiltersChange}
        tags={tags}
        selectedTags={selectedTags}
        clearFilters={clearFilters}
        dateRange={dateRange}
      />
    </>
  );
}; 