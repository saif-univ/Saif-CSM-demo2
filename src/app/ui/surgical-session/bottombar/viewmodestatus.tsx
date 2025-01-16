import React, { useState, useEffect } from "react";
import RecordingStatus from "./RecordingStatus";
import { SessionData } from "@/app/types/sessionData";

interface ViewModeStatusProps {
  viewMode: string;
  sessionData: SessionData;
}

export default function ViewModeStatus({
  sessionData,
  viewMode,
}: ViewModeStatusProps) {
  return <div>{/* <RecordingStatus sessionData={sessionData} /> */}</div>;
}
