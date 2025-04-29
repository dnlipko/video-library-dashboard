import { VideoFilters, Video, PaginatedResponse } from '../types/video';
import { api } from './axios';
import { AxiosError } from 'axios';

const DEFAULT_LIMIT = 12;

// Map frontend sort options to backend sort options
const sortByMap: Record<string, string> = {
  newest: 'created_at',
  oldest: 'created_at',
  alphabetical: 'title',
  'alphabetical-reverse': 'title',
};

export const fetchVideos = async (filters: VideoFilters & { page?: number; limit?: number }): Promise<PaginatedResponse<Video>> => {
  try {
    const params = {
      ...(filters.search && { search: filters.search }),
      ...(filters.dateRange.start && { startDate: filters.dateRange.start }),
      ...(filters.dateRange.end && { endDate: filters.dateRange.end }),
      ...(filters.tags.length > 0 && { tags: filters.tags.join(',') }),
      sortBy: sortByMap[filters.sortBy] || 'created_at',
      sortOrder: filters.sortBy === 'oldest' || filters.sortBy === 'alphabetical' ? 'asc' : 'desc',
      ...(filters.page && { page: filters.page }),
      limit: filters.limit || DEFAULT_LIMIT,
    };
    
    const response = await api.get<PaginatedResponse<Video>>('/videos', { params });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to fetch videos: ${error.message}`);
    }
    throw error;
  }
};
