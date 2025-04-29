import { useQuery } from '@tanstack/react-query';
import { Tag } from '../types/video';
import { fetchTags } from '../api';

export const useTags = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const tags = await fetchTags();
      return tags.map((tag: Tag) => tag.name);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    tags: data ?? [],
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'An unknown error occurred') : null,
  };
}; 