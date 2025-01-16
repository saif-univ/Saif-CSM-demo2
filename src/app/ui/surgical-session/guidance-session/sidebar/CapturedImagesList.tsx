import React, { useState } from "react";
import { ImageMetadata } from "@/app/types/imageTypes";
import { TrashIcon } from "@heroicons/react/24/outline";
const imgData = [
    {
        filename: "img1.jpg",
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

interface CapturedImagesListProps {
    images: ImageMetadata[];
    onDelete: (filename: string) => void;
    onImageSelect: (image: ImageMetadata) => void;
    selectedImage: ImageMetadata | null;
}

const CapturedImagesList: React.FC<CapturedImagesListProps> = ({
    images,
    onDelete,
    onImageSelect,
    selectedImage,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Increased for better grid layout

    const totalPages = Math.ceil(imgData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedImages = imgData
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .toReversed()
        .slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    console.log(imgData, "imgDataimgDataimgDataimgData");


    return (
        <div className="flex flex-col h-full w-full">
            <h2 className="text-lg font-semibold mb-4">Captured Images check 2</h2>

            {/* Responsive Grid Container */}
            <div className="grid grid-cols-1 space-y-2 h-1/2 overflow-y-auto flex-grow">
                {paginatedImages.map((image) => (
                    <div
                        key={image.filename}
                        className={`relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow
                            ${selectedImage?.filename === image.filename ? 'ring-2 ring-blue-100' : ''}`}
                    >
                        {/* Image Thumbnail */}
                        <div>
                            {/* <img
                                src={`/surgical-session/${image.sessionId}/images/${image.filename}`}
                                alt={image.description}
                                onClick={() => onImageSelect(image)}
                                className="w-full h-24 object-cover cursor-pointer"
                            /> */}
                            <div
                                onClick={() => onImageSelect(image)}
                            >

                                Check IMG {image.filename}
                            </div>

                            {/* Delete Button - Appears on Hover */}
                            <button
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(image.filename);
                                }}
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Image Information */}
                        <div className="p-2 bg-white text-sm">
                            <p className="font-medium truncate">{image.capturedBy}</p>
                            <p className="text-gray-500 text-xs">
                                {new Date(
                                    Date.UTC(
                                        parseInt(image.timestamp.slice(0, 4)),
                                        parseInt(image.timestamp.slice(4, 6)) - 1,
                                        parseInt(image.timestamp.slice(6, 8)),
                                        parseInt(image.timestamp.slice(9, 11)),
                                        parseInt(image.timestamp.slice(11, 13)),
                                        parseInt(image.timestamp.slice(13, 15)),
                                        parseInt(image.timestamp.slice(15, 18))
                                    )
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-4 py-2">
                <button
                    className="px-3 text-sm py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>

                <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`w-8 h-8 rounded ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button
                    className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CapturedImagesList;