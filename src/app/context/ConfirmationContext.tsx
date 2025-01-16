"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import UserConfirmation from "@/app/ui/confirmation/UserConfirmation";

interface ConfirmationOptions {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface ConfirmationContextType {
  requestConfirmation: (options: ConfirmationOptions) => void;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(
  undefined
);

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmationOptions | null>(null);

  const requestConfirmation = (confirmationOptions: ConfirmationOptions) => {
    setOptions(confirmationOptions);
  };

  const handleConfirm = () => {
    if (options?.onConfirm) options.onConfirm();
    setOptions(null); // Close the confirmation dialog
  };

  const handleCancel = () => {
    if (options?.onCancel) options.onCancel();
    setOptions(null); // Close the confirmation dialog
  };

  return (
    <ConfirmationContext.Provider value={{ requestConfirmation }}>
      {children}
      {options && (
        <UserConfirmation
          message={options.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      "useConfirmation must be used within a ConfirmationProvider"
    );
  }
  return context;
};
