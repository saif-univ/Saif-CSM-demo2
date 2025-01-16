import { FC, useState } from "react";
import {
  CameraIcon,
  MicrophoneIcon,
  VideoCameraIcon as VideoCameraSolidIcon,
  ArrowUpOnSquareIcon,
  PencilSquareIcon,
  StopCircleIcon,
} from "@heroicons/react/24/solid";
import { ControlButton } from "./ControlButton";
import EndGuidanceSession from "../../bottombar/EndGuidanceSession";

interface BottomBarProps {
  isSessionStarted: boolean;
  onStartSession: () => void;
  onCameraClick?: () => void;
  onMicrophoneToggle?: () => void;
  onVideoToggle?: () => void;
  onScreenShare?: () => void;
  onAnnotate?: () => void;
  onStopSession?: () => void;
  isRecording?: boolean;
  recordingTime?: string;
}

const BottomBar: FC<BottomBarProps> = ({
  isSessionStarted,
  onStartSession,
  onCameraClick,
  onMicrophoneToggle,
  onVideoToggle,
  onScreenShare,
  onAnnotate,
  onStopSession,
  isRecording = false,
  recordingTime = "00:00:00",
}) => {
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const handleMicrophoneToggle = () => {
    setIsMicEnabled(!isMicEnabled);
    onMicrophoneToggle?.();
  };

  const handleVideoToggle = () => {
    setIsVideoEnabled(!isVideoEnabled);
    onVideoToggle?.();
  };

  return (
    <div className="h-14 bg-[#D9D9D9] fixed bottom-0 left-0 right-0 px-6 flex items-center justify-between z-50">
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-700 font-medium">
          {recordingTime}
        </span>
        <ControlButton
          icon={CameraIcon}
          onClick={onCameraClick}
          aria-label="Take photo"
        />
        {!isRecording && (
          <div className="flex items-center space-x-2">
            <button
              className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
              aria-label="Recording indicator"
            >
              <div className="w-2.5 h-2.5 bg-white rounded-sm" />
            </button>
            <span className="text-sm text-gray-700">{recordingTime}</span>
          </div>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <ControlButton
            icon={MicrophoneIcon}
            options={true}
            color={isMicEnabled ? "text-gray-800" : "text-red-500"}
            onClick={handleMicrophoneToggle}
            aria-label="Toggle microphone"
          />
          <ControlButton
            icon={VideoCameraSolidIcon}
            options={true}
            color={isVideoEnabled ? "text-gray-800" : "text-red-500"}
            onClick={handleVideoToggle}
            aria-label="Toggle video"
          />
          <ControlButton
            icon={ArrowUpOnSquareIcon}
            color="text-gray-800"
            onClick={onScreenShare}
            aria-label="Share screen"
          />
          <ControlButton
            icon={PencilSquareIcon}
            color="text-gray-800"
            onClick={onAnnotate}
            aria-label="Toggle annotation"
          />
          <ControlButton
            icon={StopCircleIcon}
            color="text-red-500"
            onClick={onStopSession}
            aria-label="Stop session"
          />
        </div>
        <div className="absolute right-6">
          <EndGuidanceSession />
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
