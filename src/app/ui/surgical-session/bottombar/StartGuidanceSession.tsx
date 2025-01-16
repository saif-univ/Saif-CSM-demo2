import React, { useState } from "react";
import { useContext } from "react";

import { RoomContext } from "@/app/context/RoomContext";

const StartGuidanceSession: React.FC<> = ({}) => {
  const { ws } = useContext(RoomContext);
  const [isStarting, setIsStarting] = useState(false);

  const handleStartSession = () => {
    setIsStarting(true);
    ws.emit("create-room");
  };

  return (
    <>
      {!isStarting && (
        <button
          className="bg-sky-800 hover:bg-sky-600 text-white px-3 p-1.5 rounded flex items-center text-xs"
          onClick={handleStartSession}
          disabled={isStarting}
        >
          Start Guiding Session
        </button>
      )}
      {isStarting && (
        <div
          className="bg-blue-100 border border-blue-400 text-blue-700 px-3 py-2 rounded relative text-xs"
          role="alert"
        >
          <span className="block sm:inline">
            Starting guiding session, please wait...
          </span>
        </div>
      )}
    </>
  );
};

export default StartGuidanceSession;
