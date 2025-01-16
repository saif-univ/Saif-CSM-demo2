import React from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const UserNotification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default UserNotification;
