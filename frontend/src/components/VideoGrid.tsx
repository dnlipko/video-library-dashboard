import { Video } from '../types/video';
import { VideoCard } from './VideoCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';
import { EmptyState } from './EmptyState';
import { useEffect, useRef, useCallback } from 'react';

interface VideoGridProps {
  videos: Video[];
  isLoading: boolean;
  error: string | null;
  onLoadMore: () => void;
  hasMore: boolean;
}

export const VideoGrid = ({ 
  videos, 
  isLoading, 
  error, 
  onLoadMore,
  hasMore 
}: VideoGridProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && !isLoading && hasMore) {
      onLoadMore();
    }
  }, [isLoading, hasMore, onLoadMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading && videos.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="grid gap-4 pb-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
        <EmptyState />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 pb-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
        {videos.map((video) => (
          <VideoCard 
            key={video.id} 
            video={video} 
          />
        ))}
      </div>
      
      <div ref={loadMoreRef} className="h-10 w-full">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </>
  );
}; 