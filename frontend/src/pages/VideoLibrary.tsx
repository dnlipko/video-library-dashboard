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
    <div className="min-h-screen">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Video Library</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
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
      </main>
    </div>
  );
} 