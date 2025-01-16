import React, { useState } from "react";

const BroadcastPanel: React.FC = () => {
  const [status, setStatus] = useState("stopped");

  const handleStart = () => setStatus("broadcasting");
  const handleStop = () => setStatus("stopped");
  const handlePause = () => setStatus("paused");
  const handleResume = () => setStatus("broadcasting");

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h2>Broadcast Panel</h2>
      <div>
        <button onClick={handleStart} disabled={status === "broadcasting"}>
          Start
        </button>
        <button onClick={handleStop} disabled={status === "stopped"}>
          Stop
        </button>
        <button onClick={handlePause} disabled={status !== "broadcasting"}>
          Pause
        </button>
        <button onClick={handleResume} disabled={status !== "paused"}>
          Resume
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <strong>Status:</strong> {status}
      </div>
    </div>
  );
};

export default BroadcastPanel;
