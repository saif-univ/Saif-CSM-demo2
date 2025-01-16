import React from "react";
import CapturedImagesList from "@/app/ui/surgical-session/sidepanel/CapturedImagesList";
import CapturedVideosList from "@/app/ui/surgical-session/sidepanel/CapturedVideosList";
import { ImageMetadata } from "@/app/types/imageTypes";
import { VideoMetadata } from "@/app/types/videoTypes";

interface ResourceContentProps {
  selectedTab: string;
  selectedImage: ImageMetadata | null;
  capturedImages: ImageMetadata[];
  onDelete: (filename: string) => void;
  onSelectImage: (image: ImageMetadata) => void;
  selectedVideo: VideoMetadata | null;
  capturedVideos: VideoMetadata[];
  onSelectVideo: (video: VideoMetadata) => void;
  onDeleteVideo: (filename: string) => void;
}

const ResourceContentPanel: React.FC<ResourceContentProps> = ({
  selectedTab,
  selectedImage,
  capturedImages,
  onDelete,
  onSelectImage,
  capturedVideos,
  onSelectVideo,
  onDeleteVideo,
}) => {
  const renderContent = () => {
    switch (selectedTab) {
      case "Images":
        return (
          <div className="flex flex-1 overflow-auto">
            <CapturedImagesList
              selectedImage={selectedImage}
              images={capturedImages}
              onDelete={onDelete}
              onImageSelect={onSelectImage}
            />
          </div>
        );
      case "Videos":
        return (
          <div>
            <CapturedVideosList
              videos={capturedVideos}
              onDelete={onDeleteVideo}
              onPlay={onSelectVideo}
            />
          </div>
        );
      case "DICOM":
        return <p>This is the DICOM content.</p>;
      case "Patient":
        return <p>This is the Patient content.</p>;
      case "Sources":
        return <p>This is the Sources content.</p>;
      case "Notes":
        return <p>This is the Notes content.</p>;
      default:
        return <p>Select a tab to see the content.</p>;
    }
  };

  return <div className="resource-content-panel">{renderContent()}</div>;
};

export default ResourceContentPanel;
