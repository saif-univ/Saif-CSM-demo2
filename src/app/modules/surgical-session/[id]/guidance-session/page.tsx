"use client";

import { FC, useContext, useEffect, useRef, useState } from "react";
import { TopBar } from "@/app/ui/surgical-session/guidance-session/topbar/TopBar";
import {
  ResourceList,
  Resource,
} from "@/app/ui/surgical-session/guidance-session/sidebar/ResourceList";
import { CentralPanel } from "@/app/ui/surgical-session/guidance-session/central-panel/CentralPanel";
import BottomBar from "@/app/ui/surgical-session/guidance-session/bottombar/BottomBar";
import { LayoutType, PanelContent } from "@/app/types/guidance-session";
import { ImageMetadata } from "@/app/types/imageTypes";
import { VideoMetadata } from "@/app/types/videoTypes";
import html2canvas from "html2canvas";
import { setPanelsCallBack } from "./constants";

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
import { RoomContext } from "@/app/context/RoomContext";
import AnnotationPanel from "@/app/ui/surgical-session/guidance-session/central-panel/AnnotationPanel";
import { useParams } from "next/navigation";

const resources = [
  { id: "cameras", icon: VideoCameraIcon, label: "Cameras", badge: "4" },
  { id: "users", icon: UserIcon, label: "Users" },
  { id: "recordings", icon: FilmIcon, label: "Recordings" },
  { id: "photos", icon: PhotoIcon, label: "Photos" },
  { id: "documents", icon: DocumentDuplicateIcon, label: "Documents" },
  { id: "chat", icon: ChatBubbleLeftRightIcon, label: "Chat" },
];

const GuidanceSession: FC = ({ surgicalSessionId, roomId, local }) => {
  const { ws, me, stream, livestream, peers, isSessionStarted } =
    useContext(RoomContext);
  const [snapshot, setSnapshot] = useState<ImageData>();
  const [editor, setEditor] = useState<Editor>();

  // const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [layout, setLayout] = useState<LayoutType>("single");
  const [activeResource, setActiveResource] = useState("cameras");
  const [activePanelId, setActivePanelId] = useState<string>("main");
  const [capturedImages, setCapturedImages] = useState<ImageMetadata[]>([]);
  const [capturedVideos, setCapturedVideos] = useState<VideoMetadata[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(
    null
  );
  const [selectedVideo, setSelectedVideo] = useState<RecordedFile | null>(null);
  const [selectedPdfs, setselectedPdfs] = useState("");
  const [newWhiteboardPanel, setNewWhiteboardPanel] = useState(null);

  const [capturedImageSnapshot, setCapturedImageSnapshot] =
    useState<string>(null);

  const videoContentRef = useRef();
  const centralPanelRef = useRef();

  // const navigate = useNavigate();
  const params = useParams();
  const sessionId = params.id as string;

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

  useEffect(() => {
    console.log("In the room..");
    if (me) {
      console.log("Joining room", roomId);
      ws.emit("join-room", { roomId: roomId, peerId: me._id });
    }
  }, [roomId, me, ws]);

  const { showNotification } = useNotification();
  const { requestConfirmation } = useConfirmation();

  const obsPanelRef = useRef();

  // Function to capture only OBS panel and create whiteboard
  const captureAndCreateWhiteboard = async () => {
    if (!obsPanelRef.current) return;

    // if (!editor) {
    //   return;
    // }

    // if (newWhiteboardPanel) {
    //   addWhiteboardPanel(newWhiteboardPanel);
    //   return;
    // }

    try {
      const canvas = await html2canvas(obsPanelRef.current);
      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImageSnapshot(imageDataUrl);
      // const createdWhiteboardPanel = {
      //   panelId: `whiteboard-${Date.now()}`,
      //   type: "whiteboard",
      //   id: `whiteboard-${Date.now()}`,
      //   content: {
      //     type: "whiteboard",
      //     id: `whiteboard-${Date.now()}`,
      //     backgroundImage: imageDataUrl,
      //     onSelect: () => {},
      //     isAnnotatable: true,
      //     annotations: [],
      //     toolbarVisible: true,
      //   },
      // };

      // setNewWhiteboardPanel(createdWhiteboardPanel);
      // addWhiteboardPanel(createdWhiteboardPanel);
    } catch (error) {
      console.error("Error capturing OBS panel:", error);
    }
  };

  const addWhiteboardPanel = (whiteboardPanel) => {
    setPanels((prevPanels) => {
      const newPanels = [...prevPanels];
      const existingWhiteboardIndex = newPanels.findIndex(
        (panel) => panel.type === "whiteboard"
      );

      if (existingWhiteboardIndex !== -1) {
        newPanels[existingWhiteboardIndex] = whiteboardPanel;
      } else {
        newPanels.push(whiteboardPanel);
      }

      // Always keep the first panel (OBS camera)
      if (newPanels.length === 2) {
        setLayout("split");
      } else if (newPanels.length === 3 || newPanels.length === 4) {
        setLayout("quad");
      }

      return newPanels;
    });
  };

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
  // Modified handleLayoutChange to preserve OBS camera in first panel
  const handleLayoutChange = (newLayout: LayoutType) => {
    setLayout(newLayout);
    const existingPanels = [...panels];
    const obsPanel = existingPanels[0]; // Keep OBS panel

    switch (newLayout) {
      case "single":
        setPanels([obsPanel]);
        break;
      case "split":
        setPanels([obsPanel, ...existingPanels.slice(1, 2)]);
        break;
      case "quad":
        setPanels([obsPanel, ...existingPanels.slice(1, 4)]);
        break;
      default:
        setPanels(existingPanels);
    }
  };

  const onSelectPdf = (doc) => {
    setselectedPdfs(doc);
    const pdfPanel = {
      panelId: `document-${Date.now()}`,
      type: "document",
      id: `document-${Date.now()}`,
      content: {
        type: "document",
        id: `document-${Date.now()}`, // Unique ID for the whiteboard
        cameraType: "",
        selectedPdfs: doc,
        isLive: true,
        onSelect: () => {},
      },
    };
    setPanels((prevPanels) => {
      return setPanelsCallBack(prevPanels, pdfPanel,setLayout);
    });
  };

  const handleMount = (editor) => {
    setEditor(editor);
    editor.createShape({
      type: "text",
      x: 200,
      y: 200,
      props: {
        text: "Click Snapshot button below to start annotation",
      },
    });

    //editor.selectAll();

    editor.zoomToSelection({
      animation: { duration: 1000 },
    });
  };

  const handleAnnotate = () => {
    const panelToSet = {
      panelId: `whiteboard-${Date.now()}`,
      type: "whiteboard",
      id: `whiteboard-${Date.now()}`,
      content: {
        type: "whiteboard",
        id: `whiteboard-${Date.now()}`,
        // backgroundImage: imageDataUrl,
        onSelect: () => {},
        isAnnotatable: true,
        annotations: [],
        toolbarVisible: true,
      },
    };

    setNewWhiteboardPanel(newWhiteboardPanel);
    setPanels((prevPanels) => {
      return setPanelsCallBack(prevPanels, panelToSet,setLayout);
    });
    // setPanels((prevPanels) => {
    //   const newPanels = [...prevPanels];
    //   const obsPanel = newPanels[0]; // Always keep OBS panel

    //   // Follow same panel management logic as capture
    //   if (newPanels.length === 1) {
    //     // If only OBS panel exists, add new panel in position 2
    //     newPanels.push(newWhiteboardPanel);
    //     setLayout("split");
    //   } else if (newPanels.length === 2) {
    //     // If two panels exist, add new panel in position 3
    //     newPanels.push(newWhiteboardPanel);
    //     setLayout("quad");
    //   } else if (newPanels.length === 3) {
    //     // If three panels exist, add new panel in position 4
    //     newPanels.push(newWhiteboardPanel);
    //     setLayout("quad");
    //   } else {
    //     // If all panels are filled, replace panel 2 and cycle through positions 2-4
    //     const indexToReplace = ((newPanels.length - 2) % 3) + 1;
    //     newPanels[indexToReplace] = newWhiteboardPanel;
    //   }

    //   return newPanels;
    // });
  };

  const handleImageSelection = (image: ImageMetadata) => {
    console.log("Selected image: " + image.filename);
    setSelectedImage(image);
    const panelToSet = {
      panelId: `image-${Date.now()}`,
      type: "image",
      id: `image-${Date.now()}`,
      content: {
        type: "image", // Changed to image type
        id: `image-${Date.now()}`,
        imageUrl: `/surgical-session/${image.sessionId}/images/${image.filename}`,
        onSelect: () => {},
      },
    };
    setPanels((prevPanels) => {
      return setPanelsCallBack(prevPanels, panelToSet,setLayout);
    });
    // setPanels((prevPanels) => {
    //   const newPanels = [...prevPanels];
    //   const obsPanel = newPanels[0]; // Always keep OBS panel

    //   // Follow same panel management logic as capture
    //   if (newPanels.length === 1) {
    //     // If only OBS panel exists, add new panel in position 2
    //     newPanels.push(newImagePanel);
    //     setLayout("split");
    //   } else if (newPanels.length === 2) {
    //     // If two panels exist, add new panel in position 3
    //     newPanels.push(newImagePanel);
    //     setLayout("quad");
    //   } else if (newPanels.length === 3) {
    //     // If three panels exist, add new panel in position 4
    //     newPanels.push(newImagePanel);
    //     setLayout("quad");
    //   } else {
    //     // If all panels are filled, replace panel 2 and cycle through positions 2-4
    //     const indexToReplace = ((newPanels.length - 2) % 3) + 1;
    //     newPanels[indexToReplace] = newImagePanel;
    //   }

    //   return newPanels;
    // });
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

  const handleDeleteVideo = async (filepath: string) => {
    requestConfirmation({
      message: "Delete selected video?",
      onConfirm: async () => {
        try {
          const response = await fetch(
            `/api/surgical-session/device123/videos/remove`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                filepath: filepath,
                deviceId: sessionData.deviceID,
              }),
            }
          );

          if (response.ok) {
            showNotification("Video deleted successfully", "success");
            refreshCapturedVideos(); // Refresh the list after deletion
          } else {
            showNotification("Failed to delete video", "error");
          }
        } catch (error) {
          console.error("Error while deleting video", error);
          showNotification("Error while deleting video", "error");
        }
      },
    });
  };
  const handleVideoSelection = (video: RecordedFile) => {
    console.log("Selected video: " + video);
    setSelectedVideo(video);
    const panelToSet = {
      panelId: "recordings",
      type: "recordings",
      id: "endo-cam",
      content: {
        type: "recordings",
        id: "endo-cam",
        cameraType: "endo",
        isLive: true,
        onSelect: () => {},
      },
    };
    setPanels((prevPanels) => {
      return setPanelsCallBack(prevPanels, panelToSet,setLayout);
    });
    // setPanels((prevPanels) => {
    //   const newPanels = [...prevPanels];
    //   const obsPanel = newPanels[0]; // Always keep OBS panel

    //   // Follow same panel management logic as capture
    //   if (newPanels.length === 1) {
    //     // If only OBS panel exists, add new panel in position 2
    //     newPanels.push(newVideoPanel);
    //     setLayout("split");
    //   } else if (newPanels.length === 2) {
    //     // If two panels exist, add new panel in position 3
    //     newPanels.push(newVideoPanel);
    //     setLayout("quad");
    //   } else if (newPanels.length === 3) {
    //     // If three panels exist, add new panel in position 4
    //     newPanels.push(newVideoPanel);
    //     setLayout("quad");
    //   } else {
    //     // If all panels are filled, replace panel 2 and cycle through positions 2-4
    //     const indexToReplace = ((newPanels.length - 2) % 3) + 1;
    //     newPanels[indexToReplace] = newVideoPanel;
    //   }

    //   return newPanels;
    // });
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
              isSessionStarted={isSessionStarted}
              local={local}
              onDeleteVideo={handleDeleteVideo}
              onSelectVideo={handleVideoSelection}
              selectedVideo={selectedVideo}
              onSelectPdf={onSelectPdf}
            />
          </div>
        </div>

        <div
          className={`flex-1 bg-white h-[calc(100vh-75px-16px)] transition-all duration-300 
          ${activeResource ? "ml-[300px]" : "ml-20"}`}
        >
          <CentralPanel
            layout={layout}
            panels={panels}
            activePanelId={activePanelId}
            onPanelSelect={setActivePanelId}
            videoContentRef={videoContentRef}
            local={local}
            selectedImage={selectedImage}
            selectedVideo={selectedVideo}
            selectedPdfs={selectedPdfs}
            obsPanelRef={obsPanelRef}
            capturedImageSnapshot={capturedImageSnapshot}
          />
        </div>
      </div>

      <BottomBar
        isSessionStarted={isSessionStarted}
        onStartSession={handleStartSession}
        onCameraClick={captureAndCreateWhiteboard}
        onMicrophoneToggle={() => {}}
        onVideoToggle={() => {}}
        onScreenShare={() => {}}
        onAnnotate={handleAnnotate}
        onStopSession={() => {}}
        isRecording={false}
        recordingTime={"00:00"}
      />
    </div>
  );
};

export default GuidanceSession;
