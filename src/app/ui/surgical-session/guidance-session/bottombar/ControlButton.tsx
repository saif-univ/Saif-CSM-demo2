// src/components/controls/ControlButton.tsx
import { FC } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

interface ControlButtonProps {
  icon: React.ElementType;
  options?: boolean;
  color?: string;
  onClick?: () => void;
}

export const ControlButton: FC<ControlButtonProps> = ({
  icon: Icon,
  options,
  color,
  onClick,
}) => (
  <button
    className="p-2 rounded-lg hover:bg-white/50 transition-colors border border-gray-300"
    onClick={onClick}
  >
    <div className="w-11 h-6 flex items-center justify-center">
      <Icon className={`w-8 h-8 ${color}`} />
      {options && <ChevronUpIcon className="w-5 h-5 ml-1 text-gray-800 mb-6" />}
    </div>
  </button>
);
