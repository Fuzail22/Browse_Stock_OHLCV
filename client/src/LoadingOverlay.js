import React from "react";
import "./LoadingOverlay.css";

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p
        style={{
          color: "red",
          textAlign: "justify",
          fontSize: "3vh",
          padding: "15vw",
        }}
      >
        If this is your first time visiting (or) if you've been inactive for 15
        minutes, please note that there may be a slight delay of up to 2 minutes
        for the first request as my free server needs to start up.
      </p>
    </div>
  );
};

export default LoadingOverlay;
