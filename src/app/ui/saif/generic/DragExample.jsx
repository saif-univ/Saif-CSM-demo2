"use client";
import React, { useState } from "react";

const DragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [droppedItems, setDroppedItems] = useState([]);

  // Handle drag start
  const onDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over (required to allow drop)
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle drop
  const onDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      setDroppedItems((prev) => [...prev, draggedItem]);
      setItems((prev) => prev.filter((i) => i !== draggedItem));
      setDraggedItem(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Drag and Drop Example</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Draggable Items */}
        <div>
          <h3>Items</h3>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              minWidth: "100px",
            }}
          >
            {items.map((item) => (
              <div
                key={item}
                draggable
                onDragStart={(e) => onDragStart(e, item)}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #000",
                  backgroundColor: "#f0f0f0",
                  cursor: "grab",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Drop Area */}
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          style={{
            border: "2px dashed #aaa",
            padding: "20px",
            minWidth: "150px",
            minHeight: "100px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>Drop Here</h3>
          {droppedItems.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #000",
                backgroundColor: "#e0f7fa",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
