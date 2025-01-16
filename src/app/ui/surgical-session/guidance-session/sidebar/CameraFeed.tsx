import { FC, useRef, useContext, useEffect, useState } from "react";

import { RoomContext } from "@/app/context/RoomContext";

interface CameraFeedProps {
  stream: MediaStream;
  id: string;
  cameraType: string;
  isLive?: boolean;
  onSelect: (id: string) => void;
  videoContentRef: any;
  muted: boolean;
}

export const CameraFeed: FC<CameraFeedProps> = ({
  stream,
  id,
  cameraType,
  // isLive,
  onSelect,
  videoContentRef,
  muted,
}) => {
  const { devices } = useContext(RoomContext);

  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log(stream, devices);

  // useEffect(() => {
  //     let stream: MediaStream | null = null;

  //     const startStream = async () => {
  //         try {
  //             stream = await navigator.mediaDevices.getUserMedia({
  //                 video: {
  //                     deviceId: { exact: id }
  //                 },
  //                 audio: false,
  //             })
  //             if (videoRef.current) {
  //                 videoRef.current.srcObject = stream;
  //                 // videoContentRef.current.srcObject = stream;
  //                 setVideoStream(stream)
  //             }
  //         } catch (err) {
  //             console.error(`Error accessing camera ${id}:`, err);
  //         }
  //     };

  //     startStream();

  //     return () => {
  //         if (stream) {
  //             stream.getTracks().forEach(track => track.stop());
  //         }
  //     };
  // }, [id]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setVideoStream(stream);
    }
    if (cameraType == "Live Surgery Camera") {
      videoContentRef.current.srcObject = stream;
    }
  }, [stream, cameraType]);

  return (
    <div className="mb-2">
      <div
        // key={key}
        className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm h-24 pb-4 cursor-pointer"
        onClick={() => {
          videoContentRef.current.srcObject = videoStream;
          onSelect(id);
        }}
      >
        <div className="aspect-video relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-24 object-cover"
            muted={muted}
          />
        </div>
      </div>
      <div className="text-xs font-normal h-2 text-center">{cameraType}</div>
    </div>
  );
};
