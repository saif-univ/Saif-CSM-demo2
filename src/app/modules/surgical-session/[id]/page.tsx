"use client";

import { FC, useContext, useEffect, useRef, useState } from "react";
import { TopBar } from "@/app/ui/surgical-session/guidance-session/topbar/TopBar";
import {
  ResourceList,
  Resource,
} from "@/app/ui/surgical-session/guidance-session/sidebar/ResourceList";
import { CameraFeed } from "@/app/ui/surgical-session/guidance-session/sidebar/CameraFeed";
import { CentralPanel } from "@/app/ui/surgical-session/guidance-session/central-panel/CentralPanel";
import BottomBar from "@/app/ui/surgical-session/bottombar/bottombar";
import { LayoutType, PanelContent } from "@/app/types/guidance-session";
import { ImageMetadata } from "@/app/types/imageTypes";
import { VideoMetadata } from "@/app/types/videoTypes";
import {
  VideoCameraIcon,
  UserIcon,
  FilmIcon,
  PhotoIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import ResourceContentPanel from "@/app/ui/surgical-session/guidance-session/sidebar/ResourceContentPanel";

import { useNotification } from "@/app/context/NotificationContext";
import { useConfirmation } from "@/app/context/ConfirmationContext";
import { SessionData } from "@/app/types/sessionData";
import { RoomContext } from "@/app/context/RoomContext";
import SurgicalSession from "../page";

const resources: Resource[] = [
  { id: "cameras", icon: VideoCameraIcon, label: "Cameras", badge: "4" },
  { id: "users", icon: UserIcon, label: "Users" },
  { id: "recordings", icon: FilmIcon, label: "Recordings" },
  { id: "photos", icon: PhotoIcon, label: "Photos" },
  { id: "documents", icon: DocumentDuplicateIcon, label: "Documents" },
  { id: "chat", icon: ChatBubbleLeftRightIcon, label: "Chat" },
];

const SurgicalSession: FC = () => {
  const { ws, isSessionStarted } = useContext(RoomContext);
  // const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [layout, setLayout] = useState<LayoutType>("single");
  const [activeResource, setActiveResource] = useState("cameras");
  const [activePanelId, setActivePanelId] = useState<string>("main");
  const [capturedImages, setCapturedImages] = useState<ImageMetadata[]>([]);
  const [capturedVideos, setCapturedVideos] = useState<VideoMetadata[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(
    null
  );
  const sessionData: SessionData = {
    id: "surgery123",
    deviceID: "device123",
    surgeon: "Dr. John Doe",
    startDateTime: new Date(),
    participants: ["Dr. Alice Brown", "Dr. Mark Smith"],
  };
  const [panels, setPanels] = useState<PanelContent[]>([
    {
      panelId: "main",
      type: "camera",
      id: "endo-cam",
      content: {
        type: "camera",
        id: "endo-cam",
        cameraType: "endo",
        isLive: true,
        onSelect: () => {},
      },
    },
  ]);
  const videoContentRef = useRef();

  const { showNotification } = useNotification();
  const { requestConfirmation } = useConfirmation();

  useEffect(() => {
    console.log("Fetching captured images...");
    refreshCapturedImages();
    console.log("Fetching captured videos...");
    refreshCapturedVideos();
  }, []);

  // Fetch captured images from the server on initial load
  useEffect(() => {}, []);

  // Function to refresh captured images by fetching from the server
  const refreshCapturedImages = async () => {
    const response = await fetch(
      `/api/surgical-session/${sessionData.id}/images`
    );
    if (response.ok) {
      const data = await response.json();
      setCapturedImages(data.metadata || []);
      console.log("Captured images count : " + data.metadata.length);
      // updateResource("Images", data.metadata.length);
    } else {
      console.error("Failed to fetch captured images");
    }
  };

  const refreshCapturedVideos = async () => {
    console.log(
      "Refreshing captured videos with session id : " + sessionData.id
    );
    const response = await fetch(
      `/api/surgical-session/${sessionData.id}/videos`
    );
    if (response.ok) {
      const data = await response.json();
      setCapturedVideos(data.metadata || []);
      console.log("Captured videos count : " + data.metadata.length);
      // updateResource("Videos", data.metadata.length);
    } else {
      console.error("Failed to fetch captured videos");
    }
  };

  const handleLayoutChange = (newLayout: LayoutType) => {
    setLayout(newLayout);
    const existingPanels = [...panels];

    switch (newLayout) {
      case "single":
        // Keep only the first panel if it exists
        setPanels(existingPanels.slice(0, 1));
        break;

      case "split":
        if (existingPanels.length === 1) {
          // If only one panel, keep it
          setPanels(existingPanels);
        } else {
          // Keep first two panels only
          setPanels(existingPanels.slice(0, 2));
        }
        break;

      case "quad":
        if (existingPanels.length <= 4) {
          // If 4 or fewer panels, keep all of them
          setPanels(existingPanels);
        } else {
          // Keep only first 4 panels
          setPanels(existingPanels.slice(0, 4));
        }
        break;

      default:
        setPanels(existingPanels);
    }
  };
  const handleAnnotate = () => {
    const newWhiteboardPanel = {
      panelId: "whiteboard",
      type: "whiteboard",
      id: "whiteboard",
      content: {
        type: "whiteboard",
        id: "whiteboard", // Unique ID for the whiteboard
        cameraType: "endo",
        isLive: true,
        onSelect: () => {},
      },
    };

    if (layout === "single") {
      // Replace the existing panel with the whiteboard
      setPanels([newWhiteboardPanel]);
    } else {
      // Add the whiteboard panel to existing panels
      setPanels((prevPanels) => [...prevPanels, newWhiteboardPanel]);
    }
  };

  const handleImageSelection = (image: ImageMetadata) => {
    console.log("Selected image: " + image.filename);
    setSelectedImage(image);
  };

  const createRoom = () => {
    ws.emit("create-room");
  };

  const handleStartSession = () => {
    // setIsSessionStarted(true);
    createRoom();
  };

  const handleDeleteImage = async (filename: string) => {
    requestConfirmation({
      message: "Delete selected image?",
      onConfirm: async () => {
        try {
          const response = await fetch(
            `/api/surgical-session/${sessionData.id}/images/${filename}`,
            { method: "DELETE" }
          );

          if (response.ok) {
            showNotification("Image deleted successfully", "success");
            refreshCapturedImages(); // Refresh the list after deletion
          } else {
            showNotification("Failed to delete image", "error");
          }
        } catch (error) {
          console.error("Error while deleting image", error);
          showNotification("Error while deleting image", "error");
        }
      },
    });
  };
  return (
    <div className="flex flex-col h-screen">
      <TopBar
        isSessionStarted={isSessionStarted}
        activeLayout={layout}
        onLayoutChange={handleLayoutChange}
      />

      <div className="flex flex-1 pt-12">
        <div className="flex fixed left-0 top-12 bottom-14 transition-all duration-300">
          <ResourceList
            resources={resources}
            activeResource={activeResource}
            onResourceSelect={setActiveResource}
          />
          <div className="bg-[#F4F8F7] w-[220px] py-4 px-7 space-y-9 overflow-y-auto">
            <ResourceContentPanel
              activeResource={activeResource}
              videoContentRef={videoContentRef}
              capturedImages={capturedImages}
              capturedVideos={capturedVideos}
              selectedImage={selectedImage}
              onDelete={handleDeleteImage}
              onSelectImage={handleImageSelection}
            />
          </div>
        </div>

        <div
          className={`flex-1 bg-white h-[calc(100vh-48px-56px)] transition-all duration-300 
          ${activeResource ? "ml-[300px]" : "ml-20"}`}
        >
          <CentralPanel
            layout={layout}
            panels={panels}
            activePanelId={activePanelId}
            onPanelSelect={setActivePanelId}
            videoContentRef={videoContentRef}
          />
        </div>
      </div>
      <BottomBar viewMode="Guidance" />
    </div>
  );
};
export default SurgicalSession;
