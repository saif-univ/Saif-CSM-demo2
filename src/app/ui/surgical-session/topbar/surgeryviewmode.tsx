import React from "react";

const SurgeryViewMode: React.FC<{
  modes: string[];
  viewMode: string;
  setViewMode: (mode: string) => void;
}> = ({ modes, viewMode, setViewMode }) => {
  return (
    <div className="modes">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`${viewMode === mode ? "button" : "button-active"}`}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

export default SurgeryViewMode;
