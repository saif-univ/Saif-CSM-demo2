//

"use client";

import React from "react";
import TopBar from "@/app/ui/surgical-session/topbar/topbar";
import CommandPanel from "@/app/ui/surgical-session/sidepanel/commandpanel";
import CaptureButton from "@/app/ui/surgical-session/bottombar/capturebutton";
import LiveVideo from "@/app/ui/surgical-session/centerpanel/livevideo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen flex flex-col bg-gray-50">{children}</div>;
}
