import React, { useState, useEffect } from "react";
import {
  PauseIcon,
  PlayIcon,
  CameraIcon,
  VideoCameraIcon,
  BookmarkIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/solid";
import styles from "@/app/ui/surgical-session/bottombar/bottombar.module.css";
import { SessionData } from "@/app/types/sessionData";
import { useNotification } from "@/app/context/NotificationContext";
import OvenPlayer from "ovenplayer";

const buttons = [
  { name: "Pause", count: 0, icon: PauseIcon },
  { name: "Snapshot", count: 0, icon: CameraIcon },
  { name: "Record", count: 0, icon: VideoCameraIcon },
  { name: "Bookmark", count: 0, icon: BookmarkIcon },
];

interface LiveVideoControlsProps {
  sessionData: SessionData;
  onCapture: () => void;
  onRecordStart: () => void;
  onRecordStop: () => void;
}

export default function LiveVideoControls({
  sessionData,
  onCapture,
  onRecordStart,
  onRecordStop,
}: LiveVideoControlsProps) {
  const { showNotification } = useNotification();
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  async function handleCapture() {
    console.log("Capture button clicked : " + sessionData.id);
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    const video = document.querySelector<HTMLVideoElement>("#player_id video");

    if (ctx && video) {
      ctx.drawImage(video, 0, 0, 1920, 1080);

      // Convert to Base64
      const imageData = canvas.toDataURL("image/jpeg");

      // Prepare metadata
      const metadata = {
        capturedBy: sessionData.surgeon,
        sessionId: sessionData.id,
        description: "Captured image from surgery session",
      };
      setLoading(true);

      // Send image and metadata to the server
      const response = await fetch(
        `/api/surgical-session/${sessionData.id}/images`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData, metadata }),
        }
      );

      if (response.ok) {
        showNotification("Image captured and saved successfully!", "success");
        onCapture();
      } else {
        showNotification("Failed to capture image!", "error");
      }

      setLoading(false);
    }
  }

  function handlePlayer(name: string) {
    const player = OvenPlayer.getPlayerByContainerId("player_id");
    const player_state = player?.getState();
    if (player) {
      if (name === "Pause") {
        if (player_state === "playing") {
          player.pause();
          setPaused(true);
        } else if (player_state === "paused") {
          player.play();
          setPaused(false);
        }
      } else if (name === "PlaybackSpeed") {
        const newSpeed = playbackSpeed >= 2 ? 0.25 : playbackSpeed + 0.25;
        setPlaybackSpeed(newSpeed);
        console.log(`Setting playback speed to ${newSpeed}`);
        player.setPlaybackRate(newSpeed);
      } else if (name === "Fullscreen") {
        //player.fullscreen();
      }
    }
  }

  const startRecording = async () => {
    console.log("Starting recording...");
    try {
      const response = await fetch(
        `/api/surgical-session/${sessionData.id}/recordings/start`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            streamName: sessionData.deviceID, // Pass the `deviceID` as `streamName`
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to start recording: ${response.statusText}`);
      }

      const data = await response.json();
      setRecording(true);
      setElapsedTime(0); // Reset elapsed time
      // onRecordStart();
      showNotification("Recording started", "success");
    } catch (error: any) {
      console.error(error.message);
      showNotification("Failed to stop recording", "error");
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording...");
    try {
      const response = await fetch(
        `/api/surgical-session/${sessionData.id}/recordings/stop`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            streamName: sessionData.deviceID, // Pass the `deviceID` as `streamName`
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to stop recording: ${response.statusText}`);
      }

      setRecording(false);
      saveRecordedVideo();
      //onRecordStop();
      showNotification(
        "Recording stopped and video save successfully",
        "success"
      );
    } catch (error: any) {
      console.error(error.message);
      showNotification("Failed to start recording", "error");
    }
  };

  async function saveRecordedVideo() {
    // Save video to server
    const metadata = {
      recordedBy: sessionData.surgeon,
      sessionId: sessionData.id,
      description: "Recorded video from surgery session",
      elapsedTime,
      bookmarks,
    };
    const response = await fetch(
      `/api/surgical-session/${sessionData.id}/videos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata }),
      }
    );

    if (response.ok) {
      //showNotification("Video saved successfully!", "success");
      //onRecordStop();
    } else {
      showNotification("Failed to save video!", "error");
    }
  }

  const addBookmark = () => {
    if (recording) {
      getRecordingStatus();
      setBookmarks([...bookmarks, elapsedTime]);
      showNotification(`Bookmark added at ${elapsedTime}s`, "success");
    } else {
      showNotification("Cannot add bookmark, recording is not active", "error");
    }
  };

  function handleButtonClick(name: string) {
    console.log(`Button clicked: ${name}`);
    if (name === "Snapshot") {
      handleCapture();
    } else if (name === "Record") {
      console.log("Recording : " + recording);
      if (recording) {
        stopRecording();
      } else {
        startRecording();
      }
    } else if (name === "Bookmark") {
      addBookmark();
    } else if (name === "Settings") {
      console.log("Settings button clicked");
    } else {
      handlePlayer(name);
    }
  }

  return (
    <div className="flex space-x-4">
      {buttons.map((resource) => {
        const isRecordButton = resource.name === "Record";
        const isPauseButton = resource.name === "Pause";
        const isBookmarkButton = resource.name === "Bookmark";
        let ResourceIcon = resource.icon;
        if (isPauseButton && paused) {
          ResourceIcon = PlayIcon;
        } else if (isRecordButton && recording) {
          ResourceIcon = VideoCameraSlashIcon;
        }

        if (isBookmarkButton && !recording) {
          return null; // Hide the Bookmark button when not recording
        }

        return (
          <button
            key={resource.name}
            onClick={() => handleButtonClick(resource.name)}
            className={styles["bottombar-button"]}
            disabled={loading}
          >
            <ResourceIcon />
            <span className="tooltip">{resource.name}</span>
          </button>
        );
      })}
    </div>
  );
}
