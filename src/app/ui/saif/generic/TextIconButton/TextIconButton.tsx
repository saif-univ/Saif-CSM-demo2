import React from "react";

interface TextIconButtonProps {
  text: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  onClick: () => void;
  className?: string;
}

const TextIconButton: React.FC<TextIconButtonProps> = ({
  children,
  icon,
  imageUrl,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 px-4 py-2 border rounded-md ${className}`}
    >
      {icon && !imageUrl && <span className="icon">{icon}</span>}

      {!icon && imageUrl && (
        <img src={imageUrl} alt="Button image" className="h-5 w-5" />
      )}

      <span>{children}</span>
    </button>
  );
};

export default TextIconButton;
