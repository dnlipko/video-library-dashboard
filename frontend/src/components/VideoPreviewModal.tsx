import { Video } from '../types/video';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { VideoDetails } from './VideoDetails';
import { Modal } from './Modal';

interface VideoPreviewModalProps {
  video: Video | null;
  onClose: () => void;
}

export const VideoPreviewModal = ({ video, onClose }: VideoPreviewModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={!!video}>
      <div className="rounded-lg overflow-hidden relative group">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-50 rounded-full p-[6px] flex z-10 transition-opacity duration-200"
          aria-label="Close modal"
        >
          <XMarkIcon className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 relative">
            <div className="aspect-video bg-black relative">
              <img 
                src={video?.thumbnail_url} 
                alt={video?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 line-clamp-2">
                  {video?.title}
                </h3>
              </div>
            </div>
          </div>
          {video && <VideoDetails video={video} />}
        </div>
      </div>
    </Modal>
  );
}; 