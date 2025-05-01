import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineX, HiOutlineTrash } from 'react-icons/hi';
import { DateRangeFilter } from './DateRangeFilter';
import { TagFilter } from './TagFilter';
import { VideoFilters as VideoFiltersType } from '../../types/video';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (callback: (filters: VideoFiltersType) => VideoFiltersType) => void;
  tags: VideoFiltersType['tags'];
  selectedTags: VideoFiltersType['tags'];
  dateRange: VideoFiltersType['dateRange'];
  clearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  onFiltersChange,
  tags,
  selectedTags,
  dateRange,
  clearFilters,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
        onClick={onClose}
      />
      
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <HiOutlineX className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <DateRangeFilter
                value={dateRange}
                onChange={(dateRange) => onFiltersChange((filters) => ({ ...filters, dateRange }))}
              />

              <TagFilter
                onChange={(tags) => onFiltersChange((filters) => ({ ...filters, tags }))}
                availableTags={tags}
                selectedTags={selectedTags}
              />
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                clearFilters();
                onClose();
              }}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <HiOutlineTrash className="w-5 h-5" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}; 