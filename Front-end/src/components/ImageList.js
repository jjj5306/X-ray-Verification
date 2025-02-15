import React, { useState } from "react";
import "../styles/ImageList.css";
import SelectedImage from "./SelectedImage";

function ImageList({ onSelect }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageInfo, setSelectedImageInfo] = useState({});
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const formatFileName = (fileName) => {
    // 확장자 제거
    return fileName.replace(/\.(png|jpe?g)$/i, "");
  };

  const formatFileType = (fileType) => {
    // image/png -> png, image/jpeg -> jpg 형식으로 변환
    const typeMap = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
    };
    return typeMap[fileType] || fileType;
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);

    for (const file of files) {
      try {
        validateFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            name: formatFileName(file.name),
            type: formatFileType(file.type),
            capacity: `${(file.size / 1024).toFixed(1)}KB`,
            date: new Date().toLocaleString(),
            src: e.target.result,
          };

          setImages((prev) => [...prev, newImage]);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        setErrorMessage(error.message);
        setShowError(true);
      }
    }
    event.target.value = "";
  };

  const handleViewDetails = (image) => {
    setSelectedImage(image.src);
    setSelectedImageInfo(image);
  };

  const handlePredict = (image) => {
    // Predict 기능 수정 필요
    setSelectedImage(image.src);
    setSelectedImageInfo(image);
  };

  // 검색어 변경 처리
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색된 이미지 필터링
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
            {filteredImages.map((image, index) => (
              <tr key={index}>
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
                  <button
                    onClick={() => handlePredict(image)}
                    className="action-button"
                  >
                    Predict
                  </button>
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
          onSelect={onSelect}
        />
      )}

      {showError && (
        <div className="error-dialog">
          <h3>업로드 오류</h3>
          <p>{errorMessage}</p>
          <button onClick={() => setShowError(false)}>확인</button>
        </div>
      )}
    </div>
  );
}

export default ImageList;
