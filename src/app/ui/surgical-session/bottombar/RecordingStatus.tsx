import React, { useEffect, useState } from "react";
import styles from "./RecordingStatus.module.css";
import parseRecordingStatus from "@/app/utils/ParseRecordingStatus";
import { SessionData } from "@/app/types/sessionData";
import { RecordStatus } from "@/app/types/recordStatus";
import { formatMStoHHMMSS } from "@/app/utils/FormatMStoHHMMSS";

interface RecordingStatusProps {
  sessionData: SessionData;
}

const RecordingStatus: React.FC<RecordingStatusProps> = ({ sessionData }) => {
  const [recordStatus, setRecordStatus] = useState<RecordStatus | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      getRecordingStatus();
    }, 1000);

    const getRecordingStatus = async () => {
      try {
        // Add `streamName` as a query parameter
        const url = `/api/surgical-session/${sessionData.id}/recordings/status`;

        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to get recording status: ${response.statusText}`
          );
        }

        const data = await response.json();

        // Ensure the data has the correct structure
        if (
          data?.response &&
          Array.isArray(data.response) &&
          data.response.length > 0
        ) {
          const recordingStatus = parseRecordingStatus(data);
          setRecordStatus(recordingStatus); // Update state with parsed recording status
        } else {
          //console.error("Invalid or empty recording status response:", data);
          setRecordStatus(null); // Handle empty or invalid data gracefully
        }
      } catch (error: any) {
        console.error("Error fetching recording status:", error.message);
        setRecordStatus(null); // Handle errors gracefully
      }
    };

    return () => clearInterval(interval);
  }, [sessionData]);

  if (!recordStatus) {
    return null;
  }

  return (
    <div className={styles.recordingStatus}>
      <div className={styles.redIcon}></div>
      <div>
        <p className={styles.text}>
          <span className={styles.bold}>Start Time:</span>{" "}
          {new Date(recordStatus.startTime).toLocaleString()}
        </p>
        <p className={styles.text}>
          <span className={styles.bold}>Record Time:</span>{" "}
          {formatMStoHHMMSS(recordStatus.totalRecordTime)}
        </p>
      </div>
    </div>
  );
};

export default RecordingStatus;
