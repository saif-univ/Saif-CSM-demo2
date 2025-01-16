const blankPanel = {
    panelId: `document-${Date.now()}`,
    type: "document",
    id: `document-${Date.now()}`,
    content: {
        type: "document",
        id: `document-${Date.now()}`, // Unique ID for the whiteboard
        cameraType: "",
        // selectedPdfs: doc,
        isLive: true,
        onSelect: () => { },
    },
}



export const setPanelsCallBack = (prevPanels, panelToSet, setLayout) => {
    const newPanels = [...prevPanels];
    console.log("hello", newPanels.length);
    // console.log(doc);
    const obsPanel = newPanels[0]; // Always keep OBS panel

    // Follow same panel management logic as capture
    if (newPanels.length === 1) {
        // If only OBS panel exists, add new panel in position 2
        newPanels.push(panelToSet);
        setLayout("split");
    } else if (newPanels.length === 2) {
        // If two panels exist, add new panel in position 3
        // newPanels.push(panelToSet);
        newPanels.splice(
            3,
            1, blankPanel,
            panelToSet
        );

        setLayout("quad");
    } else if (newPanels.length === 3) {
        console.log("hello else se lenth 33333333");

        // If three panels exist, add new panel in position 4
        // newPanels.push(panelToSet);
        // setLayout("quad");
    } else {
        // If all panels are filled, replace panel 2 and cycle through positions 2-4
        console.log("hello else se");
        // const indexToReplace = ((newPanels.length - 2) % 3) + 1;
        // newPanels[indexToReplace] = panelToSet;
        console.log("hello else se");

        newPanels.splice(2, 1, panelToSet);
    }

    return newPanels;
} 