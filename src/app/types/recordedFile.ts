// Define the RecordedFile type
export interface RecordedFile {
  transactionId: string;
  id: string;
  vhost: string;
  app: string;
  stream: string;
  filePath: string;
  recordBytes: number;
  recordTime: number;
  sequence: number;
  lastSequence: boolean;
  createdTime: string;
  startTime: string;
  finishTime: string;
}
