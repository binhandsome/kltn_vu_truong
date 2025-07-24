import React from "react";

const ToastMessage = ({ show, message, type = "error" }) => {
    if (!show) return null;
  
    const bgColor = type === "success" ? "#4CAF50" : "#f44336";
  
    return (
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
          padding: "12px 20px",
          backgroundColor: bgColor,
          color: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {message}
      </div>
    );
  };  

export default ToastMessage;
