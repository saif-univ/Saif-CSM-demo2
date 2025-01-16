import React, { useEffect, useState } from "react";
import OvenPlayer from "ovenplayer";
import styles from "./livevideo.module.css";
import { SessionData } from "@/app/types/sessionData";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
interface LiveVideoProps {
  sessionData: SessionData;
}

export default function LiveVideo({ sessionData }: LiveVideoProps) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const startDateTime = sessionData.startDateTime.toLocaleString();
    const player = OvenPlayer.create("player_id", {
      debug: false,
      autoStart: true,
      autoFallback: true,
      controls: true,
      showBigPlayButton: true,
      disableSeekUI: true,
      showSeekControls: false,
      timecode: true,
      mute: true,
      title: "Live",
      // image: "/csm-white.svg",
      timeoutMaxRetry: 10,
      waterMark: {
        //image: "/csm-white.svg",
        text: `Surgeon: ${sessionData.surgeon} <br/>Start Time: ${startDateTime}`,
        font: {
          "font-size": "10px",
          color: "#fff",
        },
        position: "top-right",
        x: "20px",
        y: "20px",
      },
      sources: [
        {
          label: "csm_live_video",
          type: "webrtc",
          file: `ws://172.20.208.1:3333/csm/${sessionData.deviceID}`,
        },
      ],
    });

    player.on("ready", () => {
      player.play();
    });

    // Poll player state every second
    const interval = setInterval(() => {
      const currentState = player.getState(); // Get the current state of the player
      if (currentState === "error") {
        console.log("Error detected in video playback, retrying...");
        player.load(); // Reload the video
        player.play(); // Attempt to play again
        setPlaying(false);
      } else if (currentState === "playing") {
        setPlaying(true);
      } else {
        setPlaying(false);
      }
    }, 1000); // Check every 1 second

    // Cleanup on component unmount
    return () => {
      clearInterval(interval); // Clear the interval to prevent memory leaks
      player.remove();
    };
  }, [sessionData]);

  const handleTroubleshootClick = () => {
    alert("Check your device connection or try restarting the video feed.");
    // Here, you can open a help modal or navigate to a troubleshooting page.
  };

  return (
    <>
      {!playing && (
        <div className="player-message">
          <div className="message-content">
            <p>Waiting for live video feed from the device...</p>
            <button onClick={handleTroubleshootClick}>
              <QuestionMarkCircleIcon className="help-button" />
            </button>
          </div>
        </div>
      )}
      <div className={playing ? "player-wrapper" : "player-hidden"}>
        <div id="player_id"></div>
      </div>
    </>
  );
}
