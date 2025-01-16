"use client";
import React, { useState } from "react";
import RadioButton from "./IconRadioButton/page";
import useTimer from "./hooks/timer/useTimer";
// import TextIconButton from "./IconButton/IconButton";
import ParentLayout from "./MultiViewerPanel/ParentLayout";
import DICOMViewer from "./DICOMViewer/DICOMViewer";
import IconButton from "./IconButton/IconButton";
import TextIconButton from "./TextIconButton/TextIconButton";
import { Provider, useSelector } from "react-redux";
import { store } from "@/app/store";
import DragAndDrop from "./DragExample";

function page() {
  const { time, isRunning, setIsRunning, setTime, formatTime } = useTimer();
  const [splitLayout, setSplitLayout] = useState("");

  const handleData = (e) => {
    console.log(e);
    setSplitLayout(e);
  };

  const data = [
    {
      icon: "",
      value: "single",
      isSelected: true,
    },
    {
      icon: "https://flowbite.com/docs/images/logo.svg",
      value: "split",
      isSelected: false,
    },
    {
      icon: "https://srv.carbonads.net/static/30242/4b723271609d12c16fec10ddea2ce78e9bba0517",
      value: "quad",
      isSelected: false,
    },
  ];

  return (
    // <Provider store={store}>
    <div>
      <h2>{formatTime(time)}</h2>

      {/* <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <h2>{formatTime(time)}</h2>
        <div>
          <button onClick={() => setIsRunning(true)} disabled={isRunning}>
            Start
          </button>
          <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
            Stop
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
          >
            Reset
          </button>
        </div>
      </div> */}
      {/* <TextIconButton>Children TexIconButton</TextIconButton> */}
      {/* <IconButton
        imagePath={
          "https://srv.carbonads.net/static/30242/4b723271609d12c16fec10ddea2ce78e9bba0517"
        }
        //   altText = "button",
        onClick={() => {}}
      /> */}
      <RadioButton handleData={handleData} data={data} />
      {/* ======================================== */}
      {/* <DICOMViewer dicomUrl={"/0020.DCM"} /> */}
      <ParentLayout splitLayout={splitLayout} />
      {/* <DragAndDrop /> */}
    </div>
    // </Provider>
  );
}

export default page;
