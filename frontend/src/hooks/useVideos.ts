import { useState, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { VideoFilters, PaginatedResponse, Video } from '../types/video';
import { fetchVideos } from '../api';

const initialFilters: VideoFilters = {
  search: '',
  dateRange: {
    start: null,
    end: null,
  },
  tags: [],
  sortBy: 'newest',
};

export const useVideos = (customInitialFilters?: Partial<VideoFilters>) => {
  const [filters, setFilters] = useState<VideoFilters>({
    ...initialFilters,
    ...customInitialFilters,
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['videos', filters],
    queryFn: ({ pageParam = 1 }) => fetchVideos({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage: PaginatedResponse<Video>) => {
      return lastPage.pagination.page < lastPage.pagination.totalPages ? lastPage.pagination.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const videos = useMemo(() => {
    return data?.pages.flatMap(page => page.data) ?? [];
  }, [data?.pages]);

  const handleFiltersChange = (newFilters: VideoFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      ...initialFilters,
      ...customInitialFilters,
    });
  };

  const loadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const activeFiltersCount = 
    (filters.dateRange?.start ? 1 : 0) + 
    (filters.dateRange?.end ? 1 : 0) + 
    (filters.tags?.length || 0);

  return {
    videos,
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'An unknown error occurred') : null,
    hasMore: hasNextPage ?? false,
    filters,
    handleFiltersChange,
    clearFilters,
    loadMore,
    activeFiltersCount,
  };
}; 