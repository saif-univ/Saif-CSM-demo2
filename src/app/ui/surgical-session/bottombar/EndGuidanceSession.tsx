import React from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { RoomContext } from "@/app/context/RoomContext";
import { useConfirmation } from "@/app/context/ConfirmationContext";

const EndGuidanceSession: React.FC<> = ({}) => {
  const { ws } = useContext(RoomContext);
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;
  const { requestConfirmation } = useConfirmation();

  function onEndGuidingSession() {
    requestConfirmation({
      message: "Are you sure you want to end the guiding session?",
      onConfirm: async () => {
        //ws.emit("end-room");  // #TODO - Uncomment this line once comm-server is ready
        router.push(`/modules/surgical-session/${sessionId}`);
      },
    });
  }

  return (
    <button
      className="bg-red-800 hover:bg-red-900 text-white px-3 p-1.5 rounded flex items-center text-xs"
      onClick={onEndGuidingSession}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-1.5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 11H7a1 1 0 110-2h10a1 1 0 110 2z"
          clipRule="evenodd"
        />
      </svg>
      End Guiding Session
    </button>
  );
};

export default EndGuidanceSession;
