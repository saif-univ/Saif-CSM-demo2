import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const StartButton: React.FC = () => {
  const [btnDisable, setbtnDisable] = useState(false);
  const router = useRouter();
  const sessionId = uuidv4();
  const createRoom = () => {
    router.push(`/modules/surgical-session/${sessionId}`);
    setbtnDisable(true);
    setTimeout(() => {
      setbtnDisable(true);
    }, 5000);
  };
  return (
    <div className="items-center justify-center">
      <button
        className="bg-blue-400 py-2 px-8 rounded-lg text-xl hover:bg-blue-600 text-white"
        onClick={createRoom}
        disabled={btnDisable}
      >
        Start Surgery Session
      </button>
    </div>
  );
};

export default StartButton;
