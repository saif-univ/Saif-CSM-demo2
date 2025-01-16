import React, { useState } from "react";
import { ImageMetadata } from "@/app/types/imageTypes";
import { TrashIcon } from "@heroicons/react/24/outline";
import styles from "./CapturedImagesList.module.css";

interface CapturedImagesListProps {
  images: ImageMetadata[];
  onDelete: (filename: string) => void; // Callback for deleting an image
  onImageSelect: (image: ImageMetadata) => void; // Callback for selecting an image
  selectedImage: ImageMetadata | null; // Currently selected image
}

const imgData = [
  {
    filename: "surgery_20241127T050921224Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241127T050921224Z",
  },
  {
    filename: "surgery_20241127T051117336Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241127T051117336Z",
  },
  {
    filename: "surgery_20241127T052713675Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241127T052713675Z",
  },
  {
    filename: "surgery_20241127T053245666Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241127T053245666Z",
  },
  {
    filename: "surgery_20241127T054154431Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241127T054154431Z",
  },
  {
    filename: "surgery_20241127T054304128Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241127T054304128Z",
  },
  {
    filename: "surgery_20241127T065120733Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241127T065120733Z",
  },
  {
    filename: "surgery_20241127T065122354Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241127T065122354Z",
  },
  {
    filename: "surgery_20241127T065125739Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241127T065125739Z",
  },
  {
    filename: "surgery_20241128T154959937Z.jpg",
    sessionId: "surgery123",
    description: "Annotated image",
    timestamp: "20241128T154959937Z",
  },
  {
    filename: "surgery_20241128T175727736Z.jpg",
    sessionId: "surgery123",
    description: "Annotated image",
    timestamp: "20241128T175727736Z",
  },
  {
    filename: "surgery_20241129T052737429Z.jpg",
    capturedBy: "Sridhar",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T052737429Z",
  },
  {
    filename: "surgery_20241129T052841301Z.jpg",
    sessionId: "surgery123",
    description: "Annotated image",
    timestamp: "20241129T052841301Z",
  },
  {
    filename: "surgery_20241129T100608524Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T100608524Z",
  },
  {
    filename: "surgery_20241129T100624931Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T100624931Z",
  },
  {
    filename: "surgery_20241129T100636585Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T100636585Z",
  },
  {
    filename: "surgery_20241129T100739514Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T100739514Z",
  },
  {
    filename: "surgery_20241129T100805991Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T100805991Z",
  },
  {
    filename: "surgery_20241129T100832322Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T100832322Z",
  },
  {
    filename: "surgery_20241129T100937167Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T100937167Z",
  },
  {
    filename: "surgery_20241129T101006994Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T101006994Z",
  },
  {
    filename: "surgery_20241129T101153684Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T101153684Z",
  },
  {
    filename: "surgery_20241129T101217545Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T101217545Z",
  },
  {
    filename: "surgery_20241129T101449183Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T101449183Z",
  },
  {
    filename: "surgery_20241129T101617388Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T101617388Z",
  },
  {
    filename: "surgery_20241129T102321433Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T102321433Z",
  },
  {
    filename: "surgery_20241129T102430362Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T102430362Z",
  },
  {
    filename: "surgery_20241129T102526088Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T102526088Z",
  },
  {
    filename: "surgery_20241129T104344385Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T104344385Z",
  },
  {
    filename: "surgery_20241129T133929442Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241129T133929442Z",
  },
  {
    filename: "surgery_20241129T134133293Z.jpg",
    sessionId: "surgery123",
    description: "Annotated image",
    timestamp: "20241129T134133293Z",
  },
  {
    filename: "surgery_20241129T134200189Z.jpg",
    sessionId: "surgery123",
    description: "Annotated image",
    timestamp: "20241129T134200189Z",
  },
  {
    filename: "surgery_20241201T163438625Z.jpg",
    sessionId: "surgery123",
    description: "Annotated image",
    timestamp: "20241201T163438625Z",
  },
  {
    filename: "surgery_20241202T072338558Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241202T072338558Z",
  },
  {
    filename: "surgery_20241204T062332010Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241204T062332010Z",
  },
  {
    filename: "surgery_20241204T062354211Z.jpg",
    sessionId: "surgery123",
    description: "Annotated image",
    capturedBy: "Dr. John Doe",
    timestamp: "20241204T062354211Z",
  },
  {
    filename: "surgery_20241204T103606087Z.jpg",
    sessionId: "surgery123",
    description: "Annotated image",
    capturedBy: "Dr. John Doe",
    timestamp: "20241204T103606087Z",
  },
  {
    filename: "surgery_20241204T105256449Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241204T105256449Z",
  },
  {
    filename: "surgery_20241205T043908662Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241205T043908662Z",
  },
  {
    filename: "surgery_20241205T043938980Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241205T043938980Z",
  },
  {
    filename: "surgery_20241205T094821817Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241205T094821817Z",
  },
  {
    filename: "surgery_20241205T095112349Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241205T095112349Z",
  },
  {
    filename: "surgery_20241205T095540032Z.jpg",
    capturedBy: "Dr. John Doe",
    sessionId: "surgery123",
    description: "Captured image from surgery session",
    timestamp: "20241205T095540032Z",
  },
  {
    filename: "surgery_20241205T100201587Z.jpg",
    sessionId: "surgery123",
    description: "Annotated image",
    capturedBy: "Dr. John Doe",
    timestamp: "20241205T100201587Z",
  },
];

export default function CapturedImagesList({
  images,
  onDelete,
  onImageSelect,
  selectedImage,
}: CapturedImagesListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = images
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .toReversed()
    .slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Captured Images</h2>

      {/* Captured Images Grid */}
      <div className={styles["captured-images-grid"]}>
        {imgData.map((image) => (
          <div key={image.filename} className={styles["captured-image-card"]}>
            {/* Image Thumbnail */}
            <img
              src={`/surgical-session/${image.sessionId}/images/${image.filename}`}
              alt={image.description}
              onClick={() => onImageSelect(image)}
            />

            {/* Delete Icon */}
            <button
              className={styles["delete-icon"]}
              onClick={() => onDelete(image.filename)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>

            {/* Image Information */}
            <div className={styles["captured-image-info"]}>
              <p>{image.capturedBy}</p>
              <p>
                {new Date(
                  Date.UTC(
                    parseInt(image.timestamp.slice(0, 4)), // year
                    parseInt(image.timestamp.slice(4, 6)) - 1, // month (0-based)
                    parseInt(image.timestamp.slice(6, 8)), // day
                    parseInt(image.timestamp.slice(9, 11)), // hour
                    parseInt(image.timestamp.slice(11, 13)), // minute
                    parseInt(image.timestamp.slice(13, 15)), // second
                    parseInt(image.timestamp.slice(15, 18)) // millisecond
                  )
                ).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={styles["pagination-controls"]}>
        <button
          className={styles["pagination-button"]}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`${styles["pagination-button"]} ${
              currentPage === index + 1 ? "bg-blue-500" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles["pagination-button"]}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
