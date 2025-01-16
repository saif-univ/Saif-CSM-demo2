import React from "react";
import LiveVideo from "./livevideo";
import GuidancePanel from "./guidancepanel";
import ViewAnnotatePanel from "./ViewAnnotatePanel";
import BroadcastPanel from "./BroadcastPanel";
import { ImageMetadata } from "@/app/types/imageTypes";
import { SessionData } from "@/app/types/sessionData";

interface CenterPanelProps {
  viewMode: string;
  imageToAnnotate?: ImageMetadata;
  sessionData: SessionData;
  onAnnotationSave: () => void;
  onAnnotationClose: () => void;
}

export default function CenterPanel({
  viewMode,
  imageToAnnotate,
  sessionData,
  onAnnotationSave,
  onAnnotationClose,
}: CenterPanelProps) {
  return (
    <div className="center-content-panel">
      <div className="center-content-panel-inner">
        {imageToAnnotate ? (
          <ViewAnnotatePanel
            image={imageToAnnotate}
            onClose={onAnnotationClose}
            sessionData={sessionData}
            onAnnotationSave={onAnnotationSave}
          />
        ) : viewMode === "Capture" ? (
          <LiveVideo sessionData={sessionData} />
        ) : viewMode === "Guidance" ? (
          <GuidancePanel />
        ) : (
          <BroadcastPanel />
        )}
      </div>
    </div>
  );
}
