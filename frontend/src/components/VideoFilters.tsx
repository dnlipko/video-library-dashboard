import { VideoFilters as VideoFiltersType } from '../types/video';
import { SearchInput } from './filters/SearchInput';
import { FilterToggle } from './filters/FilterToggle';
import { SortSelect, SortOption } from './filters/SortSelect';

interface VideoFiltersProps {
  filters: VideoFiltersType;
  onFiltersChange: (filters: VideoFiltersType) => void;
  clearFilters: () => void;
  tags: string[];
  activeFiltersCount: number;
}

export const VideoFilters = ({ filters, onFiltersChange, clearFilters, tags, activeFiltersCount }: VideoFiltersProps) => {
  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleSortChange = (sortBy: SortOption) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleFiltersChange = (callback: (filters: VideoFiltersType) => VideoFiltersType) => {
    onFiltersChange(callback(filters));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search videos..."
          />
        </div>

        <FilterToggle
          dateRange={filters.dateRange}
          onFiltersChange={handleFiltersChange}
          activeFiltersCount={activeFiltersCount}
          clearFilters={clearFilters}
          tags={tags}
          selectedTags={filters.tags}
        />

        <SortSelect
          value={filters.sortBy}
          onChange={handleSortChange}
        />
      </div>
    </div>
  );
}; 