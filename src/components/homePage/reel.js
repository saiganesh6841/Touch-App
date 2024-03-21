import React, { useRef, useEffect } from 'react';

const Reel = ({ src, width, height }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
  
    const handleVideoPlay = () => {
      video.loop = true;
      // Check if the video is paused before calling play
      if (video.paused) {
        video.play();
      }
    };
  
    // Check if the video element is loaded and ready
    if (video.readyState >= 1) {
      handleVideoPlay();
    } else {
      // If not ready, wait for the 'loadeddata' event to trigger before playing
      video.addEventListener('loadeddata', handleVideoPlay);
    }
  
    return () => {
      // Clean up event listener
      video.removeEventListener('loadeddata', handleVideoPlay);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      width={width}
      height={height}
      playsInline
      autoPlay
      muted
    />
  );
};

export default Reel;
