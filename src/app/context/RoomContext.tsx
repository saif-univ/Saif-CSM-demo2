"use client";

import socketIOClient from "socket.io-client";
import React, { useState, useEffect, createContext, useReducer } from "react";
// import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { peersReducer } from "./peersReducer";
import { addPeerAction } from "./peerActions";
import { removePeerAction } from "./peerActions";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useNotification } from "@/app/context/NotificationContext";

//const WS = "http://localhost:8080";
//const SUGERY_CAMERA_NAME = "OBS Virtual"; // Define the camera name

const WS = "https://csmdemo.univlabs.in";
const SUGERY_CAMERA_NAME = "Blackmagic"; // Define the camera name

export const RoomContext = createContext<null | any>(null);
const ws = socketIOClient(WS);

interface RoomProviderProps {
  children: React.ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  // const navigate = useNavigate();
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;
  const { showNotification } = useNotification();

  const [me, setMe] = useState<Peer>();
  const [local, setLocal] = useState<boolean>(true);
  const [stream, setStream] = useState<MediaStream>();
  const [livestream, setLiveStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [isSessionStarted, setIsSessionStarted] = useState<boolean>(false);

  const onRoomCreated = ({ roomId }: { roomId: string }) => {
    console.log("local room created...", roomId);
    setLocal(true);
    // setIsSessionStarted(true)
    router.push(
      `/modules/surgical-session/${sessionId}/guidance-session/${roomId}/local`
    );
  };

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log("remote user entered remote room", roomId);
    setLocal(false);
    router.push(
      `/modules/surgical-session/${sessionId}/guidance-session/${roomId}/remote`
    );
  };

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log("participants", participants);
  };

  const startGuidingSession = (status) => {
    setIsSessionStarted(status);
  };

  const removePeer = (peerId: string) => {
    showNotification("Remote user disconnected!", "error");
    dispatch(removePeerAction(peerId));
  };

  useEffect(() => {
    const meId = uuidv4();
    const peer = new Peer(meId);
    setMe(peer);

    try {
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: true,
      };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        setStream(stream);
      });
    } catch (err) {
      console.log("Error getting media", err);
    }

    ws.on("room-created", onRoomCreated);
    ws.on("user-entered", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("user-disconnected", removePeer);
  }, []);

  function sendStreamToPeer(me, stream, peerId, label) {
    const call = me.call(peerId, stream, {
      metadata: { streamLabel: label }, // Attach metadata
    });
    call.on("stream", (peerStream) => {
      dispatch(addPeerAction(peerId, peerStream));
    });
  }

  // function sendStreamToAllPeer(me, stream, label) {
  //   Object.keys(peers).forEach((peerId) => {
  //     sendStreamToPeer(me, stream, peerId, label);
  //   });
  // }

  useEffect(() => {
    if (!me) return;
    //if (!stream) return;

    ws.on("user-joined", ({ peerId }) => {
      showNotification("Remote user joined!", "success");

      if (stream) {
        sendStreamToPeer(me, stream, peerId, "camera");
      }
      if (livestream) {
        sendStreamToPeer(me, livestream, peerId, "livestream");
      }
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        const { streamLabel } = call.metadata; // Retrieve the metadata
        console.log("streamLabel", streamLabel);
        if (streamLabel === "livestream") {
          setLiveStream(peerStream);
        } else {
          dispatch(addPeerAction(call.peer, peerStream));
        }
      });
    });
  }, [me, stream, livestream]);

  console.log("peers", peers);

  async function getConnectedDevices(type) {
    const availabledevices = await navigator.mediaDevices.enumerateDevices();
    return availabledevices.filter((device) => device.kind === type);
  }

  async function UpdateLiveStream(cameraId) {
    try {
      const constraints = {
        video: { deviceId: { exact: cameraId } },
        audio: false,
      };
      const lstream = await navigator.mediaDevices.getUserMedia(constraints);
      if (lstream) {
        setLiveStream(lstream);
        //sendStreamToAllPeer(me, livestream, "livestream");
      }
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  }

  useEffect(() => {
    async function fetchCameras() {
      if (local) {
        const availabledevices = await getConnectedDevices("videoinput");
        setDevices(availabledevices);
        const cameras = availabledevices.filter((device) =>
          device.label.startsWith(SUGERY_CAMERA_NAME)
        );

        cameras.forEach((camera: MediaDeviceInfo) => {
          UpdateLiveStream(camera.deviceId);
        });
      } else {
        console.log("Remote Surgery");
      }
    }

    fetchCameras();

    if (local) {
      navigator.mediaDevices.addEventListener("devicechange", (event) => {
        fetchCameras();
      });
    }
  }, []);

  return (
    <RoomContext.Provider
      value={{
        ws,
        me,
        stream,
        livestream,
        peers,
        devices,
        isSessionStarted,
        startGuidingSession,
      }}
    >
      <div>{children}</div>
    </RoomContext.Provider>
  );
};
