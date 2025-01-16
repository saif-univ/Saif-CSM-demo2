import React from "react";

const ViewModeInfo: React.FC<{ viewMode: string }> = ({ viewMode }) => {
  return (
    <div className="flex space-x-8">
      <p>
        View Mode: <strong>{viewMode}</strong>
      </p>
    </div>
  );
};

export default ViewModeInfo;
