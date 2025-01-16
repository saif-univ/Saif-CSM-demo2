"use client";
import React from "react";

interface IconButtonProps {
  imagePath: string; // Path or URL for the button image
  altText?: string; // Alternative text for the image
  onClick: () => void; // Event handler for button click
  style?: React.CSSProperties; // Optional custom styles
  className: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  imagePath,
  altText = "button",
  onClick,
  style,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        padding: 0,
        cursor: "pointer",
        ...style,
      }}
      className={className}
    >
      <img
        src={imagePath}
        alt={altText}
        style={{
          width: "50px",
          height: "50px",
          padding: "0.5rem",
          border: "2px solid #007BFF",
          borderRadius: "15%",
          //   transition: "border-color 0.3s",
        }}
      />
    </button>
  );
};

export default IconButton;
