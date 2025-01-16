// import { showNotification } from "@/app/context/NotificationContext";

// // Utility function to handle API calls with error handling
// export async function fetchWithErrorHandling(
//   url: string,
//   options: RequestInit
// ): Promise<any> {
//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error: any) {
//     console.error(error.message);
//     showNotification("Error occurred while processing your request", "error");
//     throw error;
//   }
// }

// // Function to start recording
// export async function startRecording(
//   sessionId: string,
//   streamName: string
// ): Promise<void> {
//   const url = `/api/surgical-session/${sessionId}/recording/start`;
//   const body = { streamName };
//   await fetchWithErrorHandling(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   showNotification("Recording started successfully", "success");
// }

// // Function to stop recording
// export async function stopRecording(
//   sessionId: string,
//   streamName: string
// ): Promise<void> {
//   const url = `/api/surgical-session/${sessionId}/recording/stop`;
//   const body = { streamName };
//   await fetchWithErrorHandling(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   showNotification("Recording stopped successfully", "success");
// }

// // Function to save a captured image
// export async function captureImage(
//   sessionId: string,
//   imageData: string,
//   metadata: any
// ): Promise<void> {
//   const url = `/api/surgical-session/${sessionId}/images`;
//   const body = { imageData, metadata };
//   await fetchWithErrorHandling(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   showNotification("Image captured and saved successfully", "success");
// }

// // Function to save recorded video metadata
// export async function saveRecordedVideo(
//   sessionId: string,
//   metadata: any
// ): Promise<void> {
//   const url = `/api/surgical-session/${sessionId}/videos`;
//   await fetchWithErrorHandling(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ metadata }),
//   });
//   showNotification("Recorded video saved successfully", "success");
// }
