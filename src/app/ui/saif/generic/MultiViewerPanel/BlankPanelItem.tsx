import React from "react";
import TextIconButton from "../IconButton/IconButton";

function BlankPanelItem({ setSelectedPanelId, panelId, style }) {
  const onClickShare = (e) => {
    console.log(panelId, "panelId selectedPanelId blank panel item click");
    setSelectedPanelId(panelId);
  };
  const onClick = (e) => {
    console.log("blank panel item click");
  };
  const className =
    "p-2 rounded-lg hover:bg-white/50 transition-colors border border-gray-300";
  return (
    <div
      style={{
        width: `100%`,
        height: `100%`,
        transformOrigin: "top left",
        alignItems: "center",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        //   transform: `scale(${scale})`,
        ...style,
      }}
    >
      <TextIconButton
        onClick={onClickShare}
        className={className}
        imagePath={
          "https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Photos.png"
        }
      />
      <TextIconButton
        onClick={onClick}
        className={className}
        imagePath={
          "https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"
        }
      />
    </div>
  );
}

export default BlankPanelItem;
