import React from 'react';
import '../styles/resultpage.css';

function ResultPage({ imageName, predictionDetails = [], finalResult, onBack, onSelect }) {
  const imageSrc = imageName ? require('../testimage/' + imageName) : require('../testimage/default_image.png');

  const handleStartPredictions = () => {
    if (onSelect) {
      onSelect('result'); // 대시보드에서 'result' 선택
    }
  };

  return (
    <div className="result-page">
      <div className="result-header">
        <h2>{imageName || '이미지 없음'}</h2>
        <button className="start-predictions-button" onClick={handleStartPredictions}>Start AI Predictions</button>
        <button className="back-button" onClick={onBack}>Back</button>
      </div>
      <div className="result-content">
        <img src={imageSrc} alt={imageName || 'default_image'} className="result-image" />
        <div className="prediction-container">
          <div className="prediction-details">
            <h3>&nbsp;Prediction Details</h3>
            {predictionDetails.map((detail, index) => (
              <p key={index} className={detail.error ? 'error' : 'normal'}>
                {detail.message}
              </p>
            ))}
          </div>
          <div className="final-result-container">
            <h3>&nbsp;AI Prediction Final Result</h3>
            <p className="final-result">{finalResult}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;