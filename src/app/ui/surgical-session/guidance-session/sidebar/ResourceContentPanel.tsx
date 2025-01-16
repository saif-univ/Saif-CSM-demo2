import React, { useEffect, useContext, useState } from "react";
import CapturedImagesList from "@/app/ui/surgical-session/guidance-session/sidebar/CapturedImagesList";
import CapturedVideosList from "@/app/ui/surgical-session/sidepanel/CapturedVideosList";
import { ImageMetadata } from "@/app/types/imageTypes";
import { VideoMetadata } from "@/app/types/videoTypes";
import { CameraFeed } from "./CameraFeed";
import Image from "next/image";
import { useParams } from "next/navigation";
import { LocalDisplay } from "./ReportView";
import { RoomContext } from "@/app/context/RoomContext";

interface ResourceContentProps {
  activeResource: string;
  videoContentRef: any;
  selectedImage: ImageMetadata | null;
  capturedImages: ImageMetadata[];
  onDelete: (filename: string) => void;
  onSelectImage: (image: ImageMetadata) => void;
  capturedVideos: VideoMetadata[];
}

const ResourceContentPanel: React.FC<ResourceContentProps> = ({
  activeResource,
  videoContentRef,
  selectedImage,
  capturedImages,
  onDelete,
  onSelectImage,
  capturedVideos,
  isSessionStarted,
  onSelectVideo,
  onDeleteVideo,
  local,
  onSelectPdf,
}) => {
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>(
    []
  );
  const { ws, me, stream, livestream, peers } = useContext(RoomContext);
  const params = useParams();
  const sessionId = params?.id as string | undefined;
  const roomId = params?.roomId as string | undefined;

  console.log(Object.values(peers as PeerState).length);

  console.log(capturedVideos, "capturedVideos");

  //   useEffect(() => {
  //     const fetchCameras = async () => {
  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       console.log(devices);

  //   const params = useParams();
  //   const sessionId = params.id as string;
  //   const roomId = params.roomId as string;

  //   console.log(Object.values(peers as PeerState).length);

  useEffect(() => {
    const fetchCameras = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log(devices);

      const videoInputs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setAvailableCameras(videoInputs);
    };

    fetchCameras();
  }, []);

  const renderContent = () => {
    switch (activeResource) {
      case "cameras":
        return (
          <div className="gap-8">
            {livestream && (
              <CameraFeed
                stream={livestream}
                onSelect={() => {}}
                videoContentRef={videoContentRef}
                cameraType={"Live Surgery Camera"}
                local={local}
              />
            )}
          </div>
        );
      case "photos":
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
      case "users":
        return (
          <div className="gap-8">
            {stream && (
              <CameraFeed
                stream={stream}
                onSelect={() => {}}
                videoContentRef={videoContentRef}
                cameraType={"My Webcam"}
                muted={true}
              />
            )}

            {isSessionStarted && (
              <>
                {Object.values(peers as PeerState).map((peer, index) => (
                  <CameraFeed
                    key={index}
                    stream={peer.stream}
                    onSelect={() => {}}
                    videoContentRef={videoContentRef}
                    cameraType={"Remote Webcam"}
                    muted={false}
                  />
                ))}
              </>
            )}
            {roomId && (
              <div className="surgeon-webcam mt-3">
                <img
                  src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
                  alt="Rotating GIF"
                  style={{
                    width: "50px",
                    height: "50px",
                    animation: "spin 2s linear infinite",
                  }}
                />
                <a
                  href={`mailto:?subject=Join%20Live%20Surgical%20Session&body=Please%20join%20the%20surgical%20session%20using%20the%20following%20link:%0D%0A%0D%0AIf%20the%20link%20does%20not%20open%20automatically,%20please%20copy%20and%20paste%20it%20into%20your%20browser's%20address%20bar.%0D%0A%0D%0A-------------------------%0D%0A%20%20%20https://csm-demo2.vercel.app/modules/surgical-session/${sessionId}/guidance-session/${roomId}/remote%20%20%20%0D%0A-------------------------%0D%0A`}
                  className="text-blue-500 underline"
                >
                  Send Invitation
                </a>
              </div>
            )}
          </div>
        );
      case "documents":
        return (
          <div className="flex flex-1 overflow-auto">
            <LocalDisplay
              onSelectPdf={onSelectPdf}
              //selectedImage={selectedImage}
              //images={capturedImages}
              //onDelete={onDelete}
              //onImageSelect={onSelectImage}
            />
          </div>
        );
      case "recordings":
        return (
          <div>
            <CapturedVideosList
              videos={capturedVideos}
              onDelete={onDeleteVideo}
              onPlay={onSelectVideo}
            />
          </div>
        );
      case "chat":
        return <p>This is {activeResource} content.</p>;
      default:
        return <p>Select a tab to see the content.</p>;
    }
  };

  return renderContent();
};

export default ResourceContentPanel;
