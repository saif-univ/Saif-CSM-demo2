import React, { useRef } from "react";

interface VideoPlaybackPanelProps {
  videoSrc: string;
  bookmarks: number[];
}

export default function VideoPlaybackPanel({
  videoSrc,
  bookmarks,
}: VideoPlaybackPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log(videoSrc, "videoSrcvideoSrc");

  const play = () => videoRef.current?.play();
  const pause = () => videoRef.current?.pause();
  const navigateToBookmark = (index: number) => {
    if (videoRef.current) {
      videoRef.current.srcObject = videoSrc;
      videoRef.current.currentTime = bookmarks[index];
      videoRef.current.play();
    }
  };

  return (
    <div>
      <video ref={videoRef} src={videoSrc} controls className="w-full h-auto" />
    </div>
  );
}
