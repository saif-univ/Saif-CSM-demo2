// src/components/panels/CentralPanel.tsx
import { FC, useState, useEffect } from "react";
import { LayoutType, PanelContent } from "@/app/types/guidance-session";
import { PanelContainer } from "./PanelContainer";
import "tldraw/tldraw.css";

import Image from "next/image";
import { RenderPdfModal } from "../sidebar/RenderPDF";
import AnnotationPanel from "./AnnotationPanel";
import { useParams } from "next/navigation";
import { AssetRecordType, Editor } from "tldraw";

interface CentralPanelProps {
  layout: LayoutType;
  panels: PanelContent[];
  activePanelId?: string;
  onPanelSelect: (panelId: string) => void;
  videoContentRef: any;
}

export const CentralPanel: FC<CentralPanelProps> = ({
  layout,
  panels,
  activePanelId,
  onPanelSelect,
  videoContentRef,
  selectedImage,
  selectedVideo,
  local,
  selectedPdfs,
  obsPanelRef,
  capturedImageSnapshot,
}) => {
  const [editor, setEditor] = useState<Editor>();
  // const navigate = useNavigate();
  const params = useParams();
  const sessionId = params.id as string;

  const getLayoutClass = () => {
    switch (layout) {
      case "single":
        return "grid-cols-1";
      case "split":
        return "grid-cols-2";
      case "quad":
        return "grid-cols-2 grid-rows-2";
    }
  };

  useEffect(() => {
    if (capturedImageSnapshot) {
      insertImage(capturedImageSnapshot);
    }
  }, [capturedImageSnapshot]);

  function insertImage(imageData: string) {
    //[2]
    const assetId = AssetRecordType.createId();
    const imageWidth = 1200;
    const imageHeight = 675;
    if (!editor) return;

    editor.createAssets([
      {
        id: assetId,
        type: "image",
        typeName: "asset",
        props: {
          name: "tldraw.png",
          src: imageData, // You could also use a base64 encoded string here
          w: imageWidth,
          h: imageHeight,
          mimeType: "image/png",
          isAnimated: false,
        },
        meta: {},
      },
    ]);
    //[3]
    editor.createShape({
      type: "image",
      props: {
        assetId,
        w: imageWidth,
        h: imageHeight,
      },
    });

    editor.selectAll();

    editor.zoomToSelection({
      animation: { duration: 1000 },
    });
  }

  const handleMount = (editor, image) => {
    setEditor(editor);
    editor.createShape({
      type: "text",
      x: 200,
      y: 200,
      props: {
        text: "Click Snapshot button below to start annotation",
      },
    });

    if (image) {
      insertImage(image);
    } else {
      editor.selectAll();

      editor.zoomToSelection({
        animation: { duration: 1000 },
      });
    }
  };

  console.log(panels, "panels", selectedImage);

  return (
    <div className={`grid gap-4 h-full ${getLayoutClass()}`}>
      {panels.map((panel, index) => (
        <PanelContainer
          key={panel.panelId}
          content={panel}
          isActive={panel.panelId === activePanelId}
          onSelect={() => onPanelSelect(panel.panelId)}
        >
          {panel.content.type === "camera" && (
            <div ref={index === 0 ? obsPanelRef : null}>
              <video
                ref={index === 0 ? videoContentRef : null}
                autoPlay
                playsInline
                controls
                className="w-full h-full object-cover"
                muted={local || index === 0}
              />
            </div>
          )}
          {panel.content.type === "whiteboard" && (
            <div className="w-full h-full absolute">
              <AnnotationPanel
                onMount={(editor) =>
                  handleMount(editor, panel.content.backgroundImage)
                }
                roomId={sessionId}
              />
            </div>
          )}
          {panel.content.type === "image" && (
            <Image
              src={panel.content.imageUrl}
              alt={"image"}
              height={500}
              width={750}
            />
          )}
          {panel.content.type === "recordings" && (
            // <VideoPlaybackPanel
            //   selectedVideo={selectedVideo}
            //   //   sessionData={sessionData}
            // />

            <video src={selectedVideo} controls autoPlay className="h-full" />
          )}
          {panel.content.type === "document" && (
            <RenderPdfModal selectedPdf={panel.content.selectedPdfs} />
          )}
        </PanelContainer>
      ))}
    </div>
  );
};
