export interface Tag {
  id: string;
  name: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  duration: number;
  views: number;
  tags: Tag[];
}

export interface VideoFilters {
  search: string;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  tags: string[];
  sortBy: 'newest' | 'oldest' | 'alphabetical' | 'alphabetical-reverse';
}

export interface VideoState {
  videos: Video[];
  isLoading: boolean;
  error: string | null;
  filters: VideoFilters;
  availableTags?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
} 