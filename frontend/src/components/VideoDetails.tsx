import { Video } from '../types/video';

interface VideoDetailsProps {
  video: Video;
}

export const VideoDetails = ({ video }: VideoDetailsProps) => {
  return (
    <div className="w-full md:w-1/3 p-4 md:p-6 bg-gray-50">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Video Details</h4>
          <div className="space-y-2">
            <p className="text-base text-gray-700">
              <span className="font-medium">Duration:</span> {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
            </p>
            <p className="text-base text-gray-700">
              <span className="font-medium">Views:</span> {video.views.toLocaleString()}
            </p>
            <p className="text-base text-gray-700">
              <span className="font-medium">Created:</span> {new Date(video.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        {video.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-white text-gray-600 border border-gray-200"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 