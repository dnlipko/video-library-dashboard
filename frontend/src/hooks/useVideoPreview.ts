import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Video } from '../types/video';

export function useVideoPreview(videos: Video[]) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const prevHashRef = useRef(location.hash);

  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
    navigate('');
  }, [navigate]);

  // Handle hash changes and initial hash after videos are loaded
  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const videoId = hash.replace('#video-', '');
      const video = videos.find(v => v.id === videoId);
      if (video) {
        setSelectedVideo(video);
      }
    }
    prevHashRef.current = location.hash;
  }, [location.hash, videos]);

  return {
    selectedVideo,
    handleCloseModal,
  };
} 