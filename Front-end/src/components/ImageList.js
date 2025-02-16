import React, { useState } from "react";
import "../styles/ImageList.css";
import SelectedImage from "./SelectedImage";
import PredictionResultModal from "./PredictedImage";

function ImageList() {
  // onSelect prop 제거
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageInfo, setSelectedImageInfo] = useState({});
  const [predictionResult, setPredictionResult] = useState(null);
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState({});

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      throw new Error("JPG 또는 PNG 파일만 업로드 가능합니다.");
    }

    if (file.size > 3 * 1024 * 1024) {
      throw new Error("파일 크기는 3MB를 초과할 수 없습니다.");
    }

    return true;
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);

    for (const file of files) {
      try {
        validateFile(file);
        const newImage = {
          id: `${file.name}-${Date.now()}`,
          name: file.name.replace(/\.(png|jpe?g)$/i, ""),
          type: file.type.split("/")[1],
          capacity: `${(file.size / 1024).toFixed(1)}KB`,
          date: new Date().toLocaleString(),
          file: file,
          path: URL.createObjectURL(file),
        };

        setImages((prev) => [...prev, newImage]);
      } catch (error) {
        setErrorMessage(error.message);
        setShowError(true);
      }
    }
    event.target.value = "";
  };

  const handleViewDetails = (image) => {
    setSelectedImage(image.path);
    setSelectedImageInfo(image);
  };

  const handlePredict = async (image) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", image.file);

      const response = await fetch("http://localhost:33333/predict", {
        method: "POST",
        body: formData,
        credentials: "omit",
        mode: "cors",
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("예측 처리 중 오류가 발생했습니다.");
      }

      const result = await response.json();
      setPredictions((prev) => ({
        ...prev,
        [image.id]: result,
      }));
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPrediction = (image) => {
    setPredictionResult(predictions[image.id]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="image-list-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2>X-ray Verifier</h2>
          <div>
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              multiple
              accept=".jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="open-folder-button">
              Upload Images
            </label>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>유형</th>
              <th>용량</th>
              <th>날짜</th>
              <th>상세보기</th>
              <th>예측</th>
            </tr>
          </thead>
          <tbody>
            {filteredImages.map((image) => (
              <tr key={image.id}>
                <td>{image.name}</td>
                <td>{image.type}</td>
                <td>{image.capacity}</td>
                <td>{image.date}</td>
                <td>
                  <button
                    onClick={() => handleViewDetails(image)}
                    className="action-button"
                  >
                    View
                  </button>
                </td>
                <td>
                  {predictions[image.id] ? (
                    <button
                      onClick={() => handleShowPrediction(image)}
                      className="action-button"
                    >
                      예측 결과 보기
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePredict(image)}
                      className="action-button"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Predict"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <SelectedImage
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
          imageName={selectedImageInfo.name}
          imageType={selectedImageInfo.type}
          imageCapacity={selectedImageInfo.capacity}
          imageDate={selectedImageInfo.date}
        />
      )}

      {predictionResult && (
        <PredictionResultModal
          result={predictionResult}
          onClose={() => setPredictionResult(null)}
        />
      )}

      {showError && (
        <div className="error-dialog">
          <h3>업로드 오류</h3>
          <p>{errorMessage}</p>
          <button onClick={() => setShowError(false)}>확인</button>
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Predicting...</div>
        </div>
      )}
    </div>
  );
}

export default ImageList;
