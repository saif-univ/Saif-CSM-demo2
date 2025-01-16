/**
 * Converts milliseconds to HH:MM:SS format.
 * @param milliseconds - Total time in milliseconds.
 * @returns The formatted time as a string in HH:MM:SS format.
 */
export function formatMStoHHMMSS(milliseconds: number): string {
  // Ensure the input is a positive integer
  if (milliseconds < 0) {
    throw new Error("Milliseconds cannot be negative");
  }

  // Convert milliseconds to total seconds
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Extract hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Pad the values to ensure two digits
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  // Return the formatted string
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}
