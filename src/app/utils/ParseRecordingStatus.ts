import recordStatus from "@/app/types/recordStatus";

function parseRecordingStatus(data: any) {
  try {
    // Ensure the response contains the necessary information
    if (data.message === "OK" && data.response?.length > 0) {
      const { startTime, totalRecordBytes, totalRecordTime, state } =
        data.response[0];

      // Construct a `recordStatus` object to send to the `RecordStatus` component
      const recordingStatus: recordStatus = {
        startTime,
        totalRecordBytes,
        totalRecordTime,
        state,
      };

      return recordingStatus;
    } else {
      console.error("Invalid recording status data received", data);
    }
  } catch (error) {
    console.error("Failed to parse recording status data:", error.message);
  }
}

export default parseRecordingStatus;
