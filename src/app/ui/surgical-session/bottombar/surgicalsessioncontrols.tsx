import React from "react";
import { useRouter } from "next/navigation";
import { useConfirmation } from "@/app/context/ConfirmationContext";

const SurgicalSessionControls: React.FC<{ viewMode: string }> = ({
  viewMode,
}) => {
  const router = useRouter();
  const { requestConfirmation } = useConfirmation();

  function handleClick() {
    requestConfirmation({
      message: "Are you sure you want to end the surgery session?",
      onConfirm: async () => {
        //ws.emit("end-room");  // #TODO - Uncomment this line once comm-server is ready
        router.push(`/`);
      },
    });
  }
  return (
    <div className="space-x-4">
      <button
        className="bg-red-800 hover:bg-red-900 text-white px-3 p-1.5 rounded flex items-center text-xs"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
            clipRule="evenodd"
          />
        </svg>
        End Surgery
      </button>
    </div>
  );
};

export default SurgicalSessionControls;
