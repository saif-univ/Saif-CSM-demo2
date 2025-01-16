"use client";

import React from "react";
import { useState } from "react";
import { useNotification } from "@/app/context/NotificationContext";
import { ImageMetaData } from "@/app/types/imageTypes";

interface CaptureButtonProps {
  sessionData: ImageMetaData;
  onCapture: () => void; // Callback to refresh captured images list
}

export default function CaptureButton({
  sessionData,
  onCapture,
}: CaptureButtonProps) {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  async function handleCapture() {
    console.log("Capture button clicked");
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
        surgeon: sessionData.surgeon,
        id: sessionData.id,
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
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={handleCapture}
      disabled={loading}
    >
      {loading ? "Saving..." : "Capture"}
    </button>
  );
}
