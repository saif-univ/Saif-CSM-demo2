import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncDemo } from "@tldraw/sync";
import React from "react";

interface AnnotationPanelProps {
  roomId: string;
  onMount?: (editor: any) => void;
}

export default function AnnotationPanel({
  roomId,
  onMount,
}: AnnotationPanelProps) {
  const store = useSyncDemo({ roomId });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Tldraw onMount={onMount} store={store} persistenceKey="csm-demo" />
    </div>
  );
}
