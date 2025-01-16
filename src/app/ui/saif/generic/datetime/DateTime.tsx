"use client";
import React, { Fragment, useEffect, useState } from "react";

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();

      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format, and handle midnight as 12

      //   setCurrentDateTime(`${day}/${month}/${year} ${hours}:${minutes} ${ampm}`);
      setCurrentDateTime(
        <Fragment>
          <h2>{`${day}/${month}/${year}`}</h2>
          <h2>{`${hours}:${minutes} ${ampm}`}</h2>
        </Fragment>
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h2>{currentDateTime}</h2>;
};

export default DateTime;
