// app/surgical-session/[id]/guidance-session/[roomId]/page.tsx
"use client";

import { FC, useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import GuidanceSession from "../../page";
import { RoomContext } from "@/app/context/RoomContext";

const RemoteGuidanceSessionPage: FC = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const sessionId = params.id as string;

  console.log(sessionId, roomId);
  const { startGuidingSession, me, ws } = useContext(RoomContext);

  useEffect(() => {
    console.log("In the room..");
    if (me) {
      console.log("Joining room", roomId);
      ws.emit("join-room", { roomId: roomId, peerId: me._id });
    }
  }, [roomId, me, ws]);

  useEffect(() => {
    startGuidingSession(true);
  }, [startGuidingSession]);

  // You can now use both roomId and sessionId
  return (
    <GuidanceSession
      surgicalSessionId={sessionId}
      roomId={roomId}
      local={false}
    />
  );
};

export default RemoteGuidanceSessionPage;
