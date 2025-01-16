import React, { useEffect, useState } from "react";
import MultiViewerPanel from "./MultiViewerPanel";
import Component1, { Component2 } from "../tempComponents/Component1";
import BlankPanelItem from "./BlankPanelItem";
import { deepCopy } from "../helpper";

function ParentLayout({ splitLayout }) {
  const [item, setItem] = useState(null);

  const [selectedPanelId, setSelectedPanelId] = useState(""); // here will be panle id
  const [panels, setPanels] = useState({
    panel1: {
      panelId: "panel1", // main panel
      content: <div>Live video</div>,
      isOpen: true,
      iseSelect: false,
      isBlank: false,
    },
    panel2: {
      panelId: "panel2",
      content: (
        <BlankPanelItem
          setSelectedPanelId={setSelectedPanelId}
          panelId="panel2"
        />
      ),
      isOpen: true,
      iseSelect: false,
      isBlank: true,
    },
    panel3: {
      panelId: "panel3",
      content: (
        <BlankPanelItem
          setSelectedPanelId={setSelectedPanelId}
          panelId="panel3"
        />
      ),
      isOpen: true,
      iseSelect: false,
      isBlank: true,
    },
    panel4: {
      panelId: "panel4",
      content: (
        <BlankPanelItem
          setSelectedPanelId={setSelectedPanelId}
          panelId="panel4"
        />
      ),
      isOpen: true,
      iseSelect: false,
      isBlank: true,
    },
  });

  const closePanel = (panelId) => {
    // const panelsCopy = deepCopy(panels);
    setSelectedPanelId(panelId);
    console.log(panelId, "panelIdpanelIdpanelIdpanelId close selectedPanelId");

    let panel = panels[panelId];
    panel = {
      ...panel,

      content: (
        <BlankPanelItem
          setSelectedPanelId={setSelectedPanelId}
          panelId={panelId}
        />
      ),
      isBlank: true,
      isOpen: true,
      iseSelect: false,
    };
    console.log(item, panel, "panels");

    setPanels({
      ...panels,
      [panelId]: panel,
    });
  };

  useEffect(() => {
    if (item && selectedPanelId) {
      let panel = panels[selectedPanelId];

      panel = {
        ...panel,
        isOpen: true,
        iseSelect: true,
        content: item,
      };
      console.log(item, panel, "panels on selectedPanelId", selectedPanelId);

      setPanels({
        ...panels,
        [selectedPanelId]: panel,
      });
    } else if (item && splitLayout === "split") {
      let panel = panels.panel2;
      panel = {
        ...panel,
        isOpen: true,
        iseSelect: true,
        content: item,
        isBlank: false,
      };
      setPanels({
        ...panels,
        [panel.panelId]: panel,
      });
    } else if (item && splitLayout === "quad") {
      let panel =
        panels.panel2.isBlank == true
          ? panels.panel2
          : panels.panel3.isBlank == true
          ? panels.panel3
          : panels.panel4.isBlank == true
          ? panels.panel4
          : null;
      panel = {
        ...panel,
        isOpen: true,
        iseSelect: true,
        content: item,
        isBlank: false,
      };
      setPanels({
        ...panels,
        [panel?.panelId]: panel,
      });
    }
    setSelectedPanelId("");
  }, [item]);

  console.log(panels, "panels-----------\\\\");

  return (
    <div>
      <Component1 splitLayout={splitLayout} setItem={setItem} />
      <Component2 splitLayout={splitLayout} setItem={setItem} />

      <MultiViewerPanel
        closePanel={closePanel}
        splitLayout={splitLayout}
        panels={panels}
      />
    </div>
  );
}

export default ParentLayout;
