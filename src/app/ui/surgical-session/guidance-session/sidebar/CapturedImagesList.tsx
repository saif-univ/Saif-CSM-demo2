import React, { useState } from "react";
import { ImageMetadata } from "@/app/types/imageTypes";
import { TrashIcon } from "@heroicons/react/24/outline";


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

    const totalPages = Math.ceil(images.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedImages = images
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .toReversed()
        .slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col h-full w-full">
            <h2 className="text-lg font-semibold mb-4">Captured Images</h2>

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
                            <img
                                src={`/surgical-session/${image.sessionId}/images/${image.filename}`}
                                alt={image.description}
                                onClick={() => onImageSelect(image)}
                                className="w-full h-24 object-cover cursor-pointer"
                            />

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