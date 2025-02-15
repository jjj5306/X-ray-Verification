import React from "react";
import "../styles/Dashboard.css";

function Dashboard({ onSelect }) {
  return (
    <div className="dashboard-container">
      <div className="sidebar-header">
        <img
          src={require("../image/cleaned_logo.png")}
          alt="logo"
          className="cleaned_logo"
        />
        <h2>X-ray Verifier</h2>
      </div>

      <div className="sidebar-buttons">
        <button onClick={() => onSelect("images")}>IMAGES</button>
      </div>
    </div>
  );
}

export default Dashboard;
