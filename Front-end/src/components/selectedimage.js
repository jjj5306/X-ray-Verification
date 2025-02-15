// image.js

import React from 'react';
import '../styles/selectedimage.css';

function SelectedImage({ src, onClose, imageName, imageScore, imageBcs, onSelect }) {
  const handleStartPredictions = () => {
    onClose(); // 모달 닫기
    onSelect('result'); // 대시보드에서 'result' 선택
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&lt;&nbsp;BACK</button>
        <h2 style={{ color: 'white' }}>{imageName}</h2>
        <h2 style={{ color: 'white' }}>fitness : {imageScore} / BCS : {imageBcs}</h2>
        <img src={src} alt="Selected" className="modal-image" />
        <button className="start-predictions-button" onClick={handleStartPredictions}>Start AI Predictions</button>
      </div>
    </div>
  );
}

export default SelectedImage;
