import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncDemo } from "@tldraw/sync";

export default function App() {
  const store = useSyncDemo({ roomId: "csm-1234" });

  const handleMount = (editor) => {
    editor.createShape({
      type: "text",
      x: 200,
      y: 200,
      props: {
        text: "Choose an image or video in the right panel to get started",
      },
    });

    editor.selectAll();

    editor.zoomToSelection({
      animation: { duration: 1000 },
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Tldraw onMount={handleMount} store={store} persistenceKey="csm" />
    </div>
  );
}
