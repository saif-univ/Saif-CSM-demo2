"use client";
// import React, { useState } from "react";

// interface RadioOption {
//   icon: string; // Path or URL for the image
//   value: boolean;
// }

// interface RadioButtonProps {
//   data: RadioOption[];
//   handleData: (selectedValue: boolean) => void;
// }

// const RadioButton: React.FC<RadioButtonProps> = ({ data, handleData }) => {
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const handleSelection = (index: number) => {
//     setSelectedIndex(index);
//     handleData(data[index].value);
//   };

//   return (
//     <div style={{ display: "flex", gap: "1rem" }}>
//       {data.map((item, index) => (
//         <div
//           key={index}
//           onClick={() => handleSelection(index)}
//           style={{
//             cursor: "pointer",
//             border: "2px solid",
//             borderColor: selectedIndex === index ? "#007BFF" : "#ccc",
//             borderRadius: "8px",
//             padding: "0.5rem",
//             textAlign: "center",
//             transition: "border-color 0.3s",
//           }}
//         >
//           <img
//             src={item.icon}
//             alt={`Option ${index + 1}`}
//             style={{
//               width: "40px",
//               height: "40px",
//               opacity: selectedIndex === index ? 1 : 0.5,
//               transition: "opacity 0.3s",
//             }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RadioButton;

import React, { useState, useEffect } from "react";

interface RadioOption {
  icon: string; // Path or URL for the image
  value: string;
  isSelected: boolean;
}

interface RadioButtonProps {
  data: RadioOption[];
  handleData: (selectedValue: boolean) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  data,
  handleData,
  imgStyle,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(data);

  useEffect(() => {
    // Trigger the handleData callback with the default selection
    handleData(data[0]?.value);
  }, [data, handleData]);

  const handleSelection = (index: number) => {
    const changedData = data?.map((e, i) => {
      return { ...e, isSelected: i === index };
    });
    setSelectedIndex(changedData);
    handleData(data[index].value);
  };

  console.log(selectedIndex, "selectedIndex");

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {selectedIndex.map((item, index) => (
        <div
          key={index}
          onClick={() => handleSelection(index)}
          style={{
            cursor: "pointer",
            border: "2px solid",
            borderColor: item.isSelected ? "#007BFF" : "#95d4ff",
            borderRadius: "8px",
            padding: "0.3rem",
            textAlign: "center",
            transition: "border-color 0.3s",
          }}
        >
          {item.icon ? (
            <img
              src={item.icon}
              alt={`Option ${index + 1}`}
              style={{
                width: "20px",
                height: "20px",
                opacity: item.isSelected ? 1 : 0.8,
                transition: "opacity 0.3s",
                ...imgStyle,
              }}
            />
          ) : (
            <img
              // src={"https://flowbite.com/docs/images/logo.sv"}
              alt={`Option ${index + 1}`}
              style={{
                width: "20px",
                height: "20px",
                opacity: 0,
                transition: "opacity 0.3s",
                ...imgStyle,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
