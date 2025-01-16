import { useEffect, useRef, useState } from "react";
import * as markerjs2 from "markerjs2";
import { SessionData } from "@/app/types/sessionData";
import { useNotification } from "@/app/context/NotificationContext";
import { useConfirmation } from "@/app/context/ConfirmationContext";

interface ViewAnnotatePanelProps {
  image: ImageMetadata;
  onClose: () => void;
  onAnnotationSave: () => void;
  sessionData: SessionData;
}

/**
 * Component for viewing and annotating an image within a surgical session.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.image - The image data to be annotated.
 * @param {Function} props.onClose - Callback function to handle the close event.
 * @param {Object} props.sessionData - The session data containing session details.
 * @param {Function} props.onAnnotationSave - Callback function to handle the annotation save event.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function ViewAnnotatePanel({
  image,
  onClose,
  sessionData,
  onAnnotationSave,
}: ViewAnnotatePanelProps) {
  const imageRef = useRef<HTMLImageElement | null>(null); // Ref for the image element
  const [annotatedImage, setAnnotatedImage] = useState<string | null>(null);
  const { showNotification } = useNotification();
  const { requestConfirmation } = useConfirmation();

  /**
   * Displays the Marker.js UI for annotating the image.
   * Sets up event listeners for rendering and closing the Marker.js UI.
   */
  const showMarkerArea = () => {
    if (imageRef.current) {
      const markerArea = new markerjs2.MarkerArea(imageRef.current);

      markerArea.addEventListener("render", (event) => {
        const confirmSave = confirm("Do you want to save the annotated image?");
        if (confirmSave) {
          const annotatedDataUrl = event.dataUrl;
          setAnnotatedImage(annotatedDataUrl); // Save the annotated image as a Data URL
          saveAnnotatedImage(annotatedDataUrl);
        } else {
          event.preventDefault();
        }
      });

      // Handle the close event when the Marker.js UI is closed
      markerArea.addEventListener("close", () => {
        onClose();
      });

      // Handle beforeclose to confirm user intent
      markerArea.addEventListener("beforeclose", (event) => {
        const confirmClose = confirm(
          "Are you sure you want to close without saving?"
        );
        if (!confirmClose) {
          event.preventDefault(); // Prevent closing if the user cancels
        }
      });

      markerArea.show(); // Show Marker.js UI
    } else {
      console.error("Image element not found or not loaded yet.");
    }
  };

  /**
   * Saves the annotated image to the server.
   *
   * @param {string} annotatedDataUrl - The Data URL of the annotated image.
   */
  const saveAnnotatedImage = async (annotatedDataUrl: string) => {
    try {
      const response = await fetch(
        `/api/surgical-session/${sessionData.id}/images`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageData: annotatedDataUrl,
            sessionId: sessionData.id,
            metadata: {
              sessionId: sessionData.id,
              description: "Annotated image",
              capturedBy: sessionData.capturedBy,
            },
          }),
        }
      );

      if (response.ok) {
        onAnnotationSave();
        showNotification("Annotated image saved successfully!", "success");
      } else {
        showNotification("Failed to save annotated image", "error");
      }
    } catch (error) {
      console.error("Error while saving annotated image", error);
      showNotification("Error while saving annotated image", "error");
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      const imageElement = imageRef.current;
      if (!imageElement.complete) {
        imageElement.onload = () => {
          console.log("Image loaded and ready for annotation");
        };
      }
    }
  }, [image]);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      showMarkerArea(); // Show the Marker.js UI after the image is loaded
    } else if (imageRef.current) {
      imageRef.current.onload = () => {
        showMarkerArea(); // Show the Marker.js UI after the image is loaded
      };
    }
  }, [image]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden mt-10">
        <img
          ref={imageRef}
          src={`/surgical-session/${image.sessionId}/images/${image.filename}`}
          alt={image.description}
          className="w-full h-full object-contain"
        />
        {annotatedImage && (
          <div>
            <h3 className="text-lg font-bold">Annotated Image Preview:</h3>
            <img
              src={annotatedImage}
              alt="Annotated"
              className="w-full h-auto mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}
