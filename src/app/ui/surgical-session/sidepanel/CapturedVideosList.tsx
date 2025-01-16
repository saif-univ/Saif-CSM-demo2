import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { VideoMetadata } from "@/app/types/videoTypes";

interface CapturedVideosListProps {
  videos: VideoMetadata[];
  onDelete: (filename: string) => void;
  onPlay: (video: VideoMetadata) => void;
}

const myVideos = [
  {
    "recordedBy": "Dr. John Doe",
    "sessionId": "surgery123",
    "description": "Recorded video from surgery session",
    "elapsedTime": 7,
    "filename": "clip1.jpg",
    "filepath": "clip1.mp4",
    "bookmarks": []
  }
]

export default function CapturedVideoList({
  videos,
  onDelete,
  onPlay, // play video
}: CapturedVideosListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {myVideos.map((video) => (
        <div key={video.filename} className="relative bg-gray-100 p-2 rounded">
          <img
            // src={`/videos/thumbnails/${video.filename}.jpg`}
            src={`/surgical-session/surgery123/videos/thumbnails/${video.filename}`}
            alt="Video Thumbnail"
            className="w-full h-auto rounded cursor-pointer"
            // onClick={() => onPlay(video)}
            onClick={() =>
              onPlay(
                `/surgical-session/surgery123/videos/${video.filepath}`
              )
            }
          />
          {/* {console.log(video, "video.filename")} */}
          <button
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full"
            onClick={() => onDelete(video.filename)}
          >
            <TrashIcon className="w-5 h-5 text-white" />
          </button>
          <p className="text-sm mt-2">Recorded by: {video.recordedBy}</p>
          <p className="text-sm">Duration: {video.duration}s</p>
        </div>
      ))}
    </div>
  );
}
