// // components/DICOMViewer.tsx
// import React, { useEffect, useRef } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

// interface DICOMViewerProps {
//   dicomUrl: string; // URL or path to the DICOM file
// }

// const DICOMViewer: React.FC<DICOMViewerProps> = ({ dicomUrl }) => {
//   const elementRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (elementRef.current) {
//       // Initialize cornerstone
//       cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
//       cornerstoneWADOImageLoader.configure({
//         useWebWorkers: true,
//         webWorkerPath: "/path/to/cornerstone-wado-image-loader-worker.js", // Ensure the worker is correctly set up
//       });

//       cornerstone.enable(elementRef.current);

//       // Load and display the DICOM image
//       cornerstone.loadAndCacheImage(dicomUrl).then((image) => {
//         cornerstone.displayImage(elementRef.current, image);
//       });

//       // Clean up on unmount
//       return () => {
//         cornerstone.disable(elementRef.current!);
//       };
//     }
//   }, [dicomUrl]);

//   return <div ref={elementRef} style={{ width: "100%", height: "500px" }} />;
// };

// export default DICOMViewer;
// components/DICOMViewer.tsx
import React, { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser"; // Import dicomParser

interface DICOMViewerProps {
  dicomUrl: string; // URL or path to the DICOM file
}

const DICOMViewer: React.FC<DICOMViewerProps> = ({ dicomUrl }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      // Initialize cornerstone and configure WADO image loader
      cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
      cornerstoneWADOImageLoader.external.dicomParser = dicomParser; // Set dicomParser

      // Configure the WADO image loader
      cornerstoneWADOImageLoader.configure({
        useWebWorkers: true,
        webWorkerPath: "/path/to/cornerstone-wado-image-loader-worker.js", // Adjust path to worker
      });

      cornerstone.enable(elementRef.current);

      // Create a valid imageId for the DICOM file
      const imageId = `wadouri:${dicomUrl}`; // Ensure URL is correct

      // Load and display the image
      cornerstone
        .loadAndCacheImage(imageId)
        .then((image) => {
          cornerstone.displayImage(elementRef.current, image);
        })
        .catch((error) => {
          console.error("Error loading DICOM image:", error);
        });

      // Clean up on unmount
      return () => {
        cornerstone.disable(elementRef.current!);
      };
    }
  }, [dicomUrl]);

  return <div ref={elementRef} style={{ width: "100%", height: "500px" }} />;
};

export default DICOMViewer;
