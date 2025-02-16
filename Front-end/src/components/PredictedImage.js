import React from "react";
import "../styles/SelectedImage.css"; // 기존 스타일 재사용

function PredictionResultModal({ result, onClose }) {
  if (!result) return null;

  const { posture, abnormal_codes, message, status } = result;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &lt;&nbsp;BACK
        </button>
        <h2 style={{ color: "white" }}>예측 결과</h2>

        <div style={{ color: "white", marginBottom: "20px" }}>
          <p>자세: {posture}</p>
          <p>상태: {status === "error" ? "오류 발생" : "정상"}</p>
          <p>메시지: {message}</p>

          {abnormal_codes && abnormal_codes.length > 0 ? (
            <div>
              <h3 style={{ marginTop: "20px" }}>발견된 오류</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {abnormal_codes.map((error, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <strong>{error.code}:</strong> {error.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p style={{ marginTop: "20px" }}>발견된 오류가 없습니다.</p>
          )}
        </div>

        {result.image && (
          <img
            src={`data:image/jpeg;base64,${result.image}`}
            alt="Prediction result"
            className="modal-image"
          />
        )}
      </div>
    </div>
  );
}

export default PredictionResultModal;
