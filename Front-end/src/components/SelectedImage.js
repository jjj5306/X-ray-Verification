import React from "react";
import "../styles/SelectedImage.css";

function SelectedImage({
  src,
  onClose,
  imageName,
  imageType,
  imageCapacity,
  imageDate,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &lt;&nbsp;BACK
        </button>
        <h2 style={{ color: "white" }}>{imageName}</h2>
        <div style={{ color: "white" }}>
          <p>타입: {imageType}</p>
          <p>용량: {imageCapacity}</p>
          <p>날짜: {imageDate}</p>
        </div>
        <img src={src} alt="Selected" className="modal-image" />
      </div>
    </div>
  );
}

export default SelectedImage;
