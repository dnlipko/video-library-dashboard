import { VideoFilters as VideoFiltersComponent } from '../components/VideoFilters';
import { VideoGrid } from '../components/VideoGrid';
import { useTags } from '../hooks/useTags';
import { VideoPreviewModal } from '../components/VideoPreviewModal';
import { useVideoPreview } from '../hooks/useVideoPreview';
import { useVideos } from '../hooks/useVideos';

export function VideoLibrary() {
  const { tags } = useTags();

  const { 
    videos, 
    isLoading, 
    error, 
    filters, 
    handleFiltersChange, 
    clearFilters,
    hasMore,
    loadMore,
    activeFiltersCount 
  } = useVideos();

  const { selectedVideo, handleCloseModal } = useVideoPreview(videos);

  return (
    <>
        <div className="mb-6">
          <VideoFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            tags={tags}
            clearFilters={clearFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>

        <VideoGrid 
          videos={videos} 
          isLoading={isLoading} 
          error={error}
          onLoadMore={loadMore}
          hasMore={hasMore}
        />

        <VideoPreviewModal
          video={selectedVideo}
          onClose={handleCloseModal}
        />
    </>
  );
} 