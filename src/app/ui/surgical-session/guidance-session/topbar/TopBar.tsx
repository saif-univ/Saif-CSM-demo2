import { FC } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { LayoutButton } from "./LayoutButton";
import { LayoutType } from "@/app/types/guidance-session";
import { useParams } from "next/navigation";

interface TopBarProps {
  isSessionStarted: boolean;
  activeLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}

export const TopBar: FC<TopBarProps> = ({
  isSessionStarted,
  activeLayout,
  onLayoutChange,
}) => {
  const params = useParams();
  const sessionId = params?.id as string | undefined;
  const roomId = params?.roomId as string | undefined;

  return (
    <div className="topbar">
      <div className="h-12 bg-[#D9D9D9] flex justify-between items-center px-4 fixed top-0 left-0 right-0 z-50">
        <div className="csm-icon-container">
          <img src="/csm.svg" alt="CSM Icon" className="csm-icon" />
        </div>

        <div className="flex-1" />
        {roomId && (
          <div className="flex items-center space-x-2">
            <a
              href={`mailto:?subject=Join%20Live%20Surgical%20Session&body=Please%20join%20the%20surgical%20session%20using%20the%20following%20link:%0D%0A%0D%0AIf%20the%20link%20does%20not%20open%20automatically,%20please%20copy%20and%20paste%20it%20into%20your%20browser's%20address%20bar.%0D%0A%0D%0A-------------------------%0D%0A%20%20%20https://csm-demo2.vercel.app/modules/surgical-session/${sessionId}/guidance-session/${roomId}/remote%20%20%20%0D%0A-------------------------%0D%0A`}
              className="text-blue-500 underline"
            >
              Send Invitation
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://csm-demo2.vercel.app/modules/surgical-session/${sessionId}/guidance-session/${roomId}/remote`
                );
                alert(
                  "The remote user invite link has been copied to the clipboard. Please send this to the remote user to join this session."
                );
              }}
              className="ml-2 p-0.5 hover:bg-[#E7ECEB] rounded-full border border-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H8zM8 4h8v1H8V4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 11h8m-4-4v8"
                />
              </svg>
            </button>
          </div>
        )}
        <div style={{ width: "50px" }} />

        {isSessionStarted && (
          <div className="flex items-center space-x-2">
            <LayoutButton
              layout="single"
              activeLayout={activeLayout}
              onClick={onLayoutChange}
            />
            <LayoutButton
              layout="split"
              activeLayout={activeLayout}
              onClick={onLayoutChange}
            />
            <LayoutButton
              layout="quad"
              activeLayout={activeLayout}
              onClick={onLayoutChange}
            />
          </div>
        )}
        <button className="ml-8 p-0.5 hover:bg-[#E7ECEB] rounded-full border border-gray-500">
          <UserIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
