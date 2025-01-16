import React from "react";

function MultiViewerPanelItem({ children, closePanel, panelId }) {
  console.log(panelId, "panelId MultiViewerPanelItem");

  return (
    <div
      style={{
        border: "1px solid #ccc",
        display: "inline-block",
      }}
    >
      <button
        onClick={() => {
          closePanel(panelId);
        }}
      >
        X
      </button>
      <div
        style={{
          overflow: "auto",
          height: "100%",
          padding: "10px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default MultiViewerPanelItem;
