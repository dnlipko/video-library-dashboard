import { Video } from '../types/video';
import { Link } from 'react-router-dom';
import { formatDuration } from '../utils/format';

interface VideoCardProps {
  video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Link 
      to={`#video-${video.id}`}
      className="group h-full flex flex-col rounded-md"
      aria-label={`Open video: ${video.title}`}
    >
      <div className="relative aspect-video group-hover:shadow-lg transition-shadow bg-gray-100 flex-shrink-0 rounded-md overflow-hidden">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>
      </div>
      <div className="py-3 flex-grow flex flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium truncate text-gray-900">
            {video.title}
          </h3>
        </div>
        <div className="mt-1 flex items-center text-xs text-gray-500">
          {new Date(video.created_at).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}; 