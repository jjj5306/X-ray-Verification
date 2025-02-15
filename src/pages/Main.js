import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import ImageList from "../components/ImageList";
import ResultPage from "../components/ResultPage";
import "../styles/Main.css";

function Main() {
  const [selectedContent, setSelectedContent] = useState("images"); // 초기값을 images로 변경

  const handleSelect = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        <Dashboard onSelect={handleSelect} />
      </div>
      <div className="content">
        <div className="selected-content-container">
          {selectedContent === "images" ? (
            <ImageList onSelect={handleSelect} />
          ) : (
            <ResultPage onBack={() => handleSelect("images")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
