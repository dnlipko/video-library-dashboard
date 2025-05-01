import React from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

export type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'alphabetical-reverse';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="pl-4 pr-10 w-full h-full py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="alphabetical">A-Z</option>
        <option value="alphabetical-reverse">Z-A</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <HiOutlineChevronDown className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
}; 