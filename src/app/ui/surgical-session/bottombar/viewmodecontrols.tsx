import React from "react";
import { SessionData } from "@/app/types/sessionData";
import { ImageMetaData } from "@/app/types/imageTypes";
import { VideoMetaData } from "@/app/types/videoTypes";
import styles from "@/app/ui/surgical-session/bottombar/bottombar.module.css";
import SelectedImageViewControls from "./SelectedImageViewControls";
import SelectedVideoPlaybackControl from "./SelectedVideoPlaybackControl";
import LiveVideoControls from "./LiveVideoControls";
import StartGuidanceSession from "./StartGuidanceSession";

interface ViewModeControlProps {
  sessionData: SessionData;
  viewMode: string;
  selectedImage: ImageMetaData | null;
  selectedVideo: VideoMetaData | null;
  onCapture: () => void; // Callback to refresh captured images list
  onRecordStart: () => void;
  onRecordStop: () => void; // Callback to refresh recorded videos list
}

export default function ViewModeControls({
  sessionData,
  viewMode,
  selectedImage,
  selectedVideo,
  onCapture,
  onRecordStart,
  onRecordStop,
}: ViewModeControlProps) {
  return (
    <div className="flex space-x-8">
      {selectedImage ? (
        <SelectedImageViewControls />
      ) : selectedVideo ? (
        <SelectedVideoPlaybackControl />
      ) : (
        <div>
          {viewMode === "Capture" ? (
            <LiveVideoControls
              sessionData={sessionData}
              onCapture={onCapture}
              onRecordStart={onRecordStart}
              onRecordStop={onRecordStop}
            />
          ) : viewMode === "Guidance" ? (
            <StartGuidanceSession />
          ) : viewMode === "Broadcast" ? (
            <strong>Broadcast Controls</strong>
          ) : null}
        </div>
      )}
    </div>
  );
}
