import React from "react";
import { RoomProvider } from "@/app/context/RoomContext";

export default function SurgerySessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoomProvider>
      <div className="h-screen flex flex-col bg-gray-50">{children}</div>;
    </RoomProvider>
  );
}
