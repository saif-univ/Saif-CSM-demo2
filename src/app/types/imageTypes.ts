export interface ImageMetadata {
  filename: string;
  capturedBy: string;
  timestamp: string;
  description: string;
  sessionId?: string; // Optional, in case you want to include it
}
