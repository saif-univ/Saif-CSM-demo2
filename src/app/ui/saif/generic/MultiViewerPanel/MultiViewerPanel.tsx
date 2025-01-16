import React, { useState } from "react";
import BlankPanelItem from "./BlankPanelItem";
import MultiViewerPanelItem from "./MultiViewerPanelItem";
import { useSelector } from "react-redux";

function MultiViewerPanel({ splitLayout, panels, setPanels, closePanel }) {
  const datass = useSelector((store) => store);
  // console.log(datass, "datadatadatadatadatadata from stoe");
  // const splitLayout = "single"; // after click on redio button. is slpit or not
  const [selectedPanel, setSelectedPanel] = useState(""); // here will be panle id
  // const [panels, setPanels] = useState({
  //   panel1: {
  //     panelId: "panel1", // main panel
  //     content: <div>Live video</div>,
  //     isOpen: true,
  //     iseSelect: false,
  //     isBlank: false,
  //   },
  //   panel2: {
  //     panelId: "panel2",
  //     content: (
  //       <BlankPanelItem setSelectedPanel={setSelectedPanel} panelId="panel2" />
  //     ),
  //     isOpen: true,
  //     iseSelect: false,
  //     isBlank: true,
  //   },
  //   panel3: {
  //     panelId: "panel3",
  //     content: (
  //       <BlankPanelItem setSelectedPanel={setSelectedPanel} panelId="panel3" />
  //     ),
  //     isOpen: true,
  //     iseSelect: false,
  //     isBlank: true,
  //   },
  //   panel4: {
  //     panelId: "panel4",
  //     content: (
  //       <BlankPanelItem setSelectedPanel={setSelectedPanel} panelId="panel4" />
  //     ),
  //     isOpen: true,
  //     iseSelect: false,
  //     isBlank: true,
  //   },
  // });

  const getLayoutClass = (splitLayout = "single") => {
    switch (splitLayout) {
      case "single":
        return "grid-cols-1";
      case "split":
        return "grid-cols-2";
      case "quad":
        return "grid-cols-2 grid-rows-2";
      default:
        return "grid-cols-1";
    }
  };

  // <button
  //   onClick={() =>
  //     setPanels({
  //       ...panels,
  //       [panel.panelId]: {
  //         ...panel,
  //         isOpen: false,
  //         // content: <div>Panel Changeed datat</div>,
  //       },
  //     })
  //   }
  // ></button>;

  const getPanelView = (splitLayout = "single") => {
    switch (splitLayout) {
      case "single":
        return (
          <MultiViewerPanelItem
            closePanel={closePanel}
            panelId="panel1"
            panels={panels}
          >
            {panels.panel1.content}
          </MultiViewerPanelItem>
        );
      case "split":
        return (
          <>
            <MultiViewerPanelItem
              closePanel={closePanel}
              panelId="panel1"
              panels={panels}
            >
              {panels.panel1.content}
            </MultiViewerPanelItem>
            <MultiViewerPanelItem
              closePanel={closePanel}
              panelId="panel2"
              panels={panels}
            >
              {panels.panel2.content}
            </MultiViewerPanelItem>
          </>
        );
      case "quad":
        return (
          <>
            <MultiViewerPanelItem
              closePanel={closePanel}
              panelId="panel1"
              panels={panels}
            >
              {panels.panel1.content}
            </MultiViewerPanelItem>
            <MultiViewerPanelItem
              closePanel={closePanel}
              panelId="panel2"
              panels={panels}
            >
              {panels.panel2.content}
            </MultiViewerPanelItem>
            <MultiViewerPanelItem
              closePanel={closePanel}
              panelId="panel3"
              panels={panels}
            >
              {panels.panel3.content}
            </MultiViewerPanelItem>
            <MultiViewerPanelItem
              closePanel={closePanel}
              panelId="panel4"
              panels={panels}
            >
              {panels.panel4.content}
            </MultiViewerPanelItem>
          </>
        );
      default:
        return (
          <MultiViewerPanelItem
            closePanel={closePanel}
            panelId="panel1"
            panels={panels}
          >
            {panels.panel1.content}
          </MultiViewerPanelItem>
        );
    }
  };
  return (
    <div>
      <div className={`grid gap-2 h-screen ${getLayoutClass(splitLayout)}`}>
        {/* {Object.values(panels).map((panel, index) => (
        <div
          key={index}
          style={{
            // width: "50%",
            // height: "500px",
            border: "1px solid #ccc",
            display: "inline-block",
          }}
        >
          <h2>{`Panel ${index + 1}`}</h2>
          <div
            style={{
              overflow: "auto",
              height: "400px",
              padding: "10px",
            }}
          >
            {panel.isOpen ? panel.content : null}
          </div>
          <button
            onClick={() =>
              setPanels({
                ...panels,
                [panel.panelId]: {
                  ...panel,
                  isOpen: false,
                  content: <div>Panel Changeed datat</div>,
                },
              })
            }
          >
            Toggle Panel
          </button>
        </div>
      ))} */}
        {getPanelView(splitLayout)}
      </div>
    </div>
  );
}

export default MultiViewerPanel;
