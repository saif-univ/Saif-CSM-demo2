"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import UserNotification from "@/app/ui/notification/UserNotification";

interface Notification {
  message: string;
  type: "success" | "error";
}

interface NotificationContextType {
  notification: Notification | null;
  showNotification: (message: string, type: "success" | "error") => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(hideNotification, 3000); // Auto-hide after 3 seconds
  };

  const hideNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
      {notification && (
        <UserNotification
          message={notification.message}
          type={notification.type}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
