'use client';

import React, { useRef } from 'react';
import { RiFullscreenExitFill } from 'react-icons/ri';

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
    else if ((video as HTMLVideoElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
      (video as HTMLVideoElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
    }
  };

  return (
    <div className="video-area w-full h-screen flex items-center justify-center px-4 relative">
      <video
        ref={videoRef}
        className="rounded-3xl shadow-lg max-w-[95%] max-h-[85%] object-cover z-60"
        src="/Videos/HandOnFaceEdit.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <button
        onClick={handleFullscreen}
        className="absolute bottom-6 flex gap-2 items-center right-8 bg-white/80 text-black px-4 py-2 rounded-xl z-90 shadow-md hover:bg-white transition cursor-pointer"
      >
        <RiFullscreenExitFill />
        Fullscreen
      </button>
    </div>
  );
}
