import React, { useState } from 'react';
import '../styles/ImageList.css';
import SelectedImage from './selectedimage';

function ImageList({ onSelect }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageInfo, setSelectedImageInfo] = useState({});

  const images = [
    { name: 'Abdomen-00051', type: 'JPG File', capacity: '55KB', date: '2024-10-10, 2:55PM', fitness: 0.78, bcs: 3, src: require('../testimage/testimage1.jpg') },
    { name: 'Thorax-00021', type: 'JPG File', capacity: '78KB', date: '2024-10-10, 3:06PM', fitness: 0.85, bcs: 4, src: require('../testimage/testimage2.jpg') },
    { name: 'Abdomen-00051', type: 'JPG File', capacity: '55KB', date: '2024-10-10, 2:55PM', fitness: 0.78, bcs: 3, src: require('../testimage/testimage1.jpg') },
    { name: 'Thorax-00021', type: 'JPG File', capacity: '78KB', date: '2024-10-10, 3:06PM', fitness: 0.85, bcs: 4, src: require('../testimage/testimage2.jpg') },
    { name: 'Abdomen-00051', type: 'JPG File', capacity: '55KB', date: '2024-10-10, 2:55PM', fitness: 0.78, bcs: 3, src: require('../testimage/testimage1.jpg') },
    { name: 'Thorax-00021', type: 'JPG File', capacity: '78KB', date: '2024-10-10, 3:06PM', fitness: 0.85, bcs: 4, src: require('../testimage/testimage2.jpg') },
    { name: 'Abdomen-00051', type: 'JPG File', capacity: '55KB', date: '2024-10-10, 2:55PM', fitness: 0.78, bcs: 3, src: require('../testimage/testimage1.jpg') },
    { name: 'Thorax-00021', type: 'JPG File', capacity: '78KB', date: '2024-10-10, 3:06PM', fitness: 0.85, bcs: 4, src: require('../testimage/testimage2.jpg') },
    { name: 'Abdomen-00051', type: 'JPG File', capacity: '55KB', date: '2024-10-10, 2:55PM', fitness: 0.78, bcs: 3, src: require('../testimage/testimage1.jpg') },
    { name: 'Thorax-00021', type: 'JPG File', capacity: '78KB', date: '2024-10-10, 3:06PM', fitness: 0.85, bcs: 4, src: require('../testimage/testimage2.jpg') },
    { name: 'Abdomen-00051', type: 'JPG File', capacity: '55KB', date: '2024-10-10, 2:55PM', fitness: 0.78, bcs: 3, src: require('../testimage/testimage1.jpg') },
    { name: 'Thorax-00021', type: 'JPG File', capacity: '78KB', date: '2024-10-10, 3:06PM', fitness: 0.85, bcs: 4, src: require('../testimage/testimage2.jpg') },
    { name: 'Abdomen-00051', type: 'JPG File', capacity: '55KB', date: '2024-10-10, 2:55PM', fitness: 0.78, bcs: 3, src: require('../testimage/testimage1.jpg') },
    { name: 'Thorax-00021', type: 'JPG File', capacity: '78KB', date: '2024-10-10, 3:06PM', fitness: 0.85, bcs: 4, src: require('../testimage/testimage2.jpg') },
    { name: 'Abdomen-00051', type: 'JPG File', capacity: '55KB', date: '2024-10-10, 2:55PM', fitness: 0.78, bcs: 3, src: require('../testimage/testimage1.jpg') },
    { name: 'Thorax-00021', type: 'JPG File', capacity: '78KB', date: '2024-10-10, 3:06PM', fitness: 0.85, bcs: 4, src: require('../testimage/testimage2.jpg') },
    // 추가 이미지 데이터
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image.src);
    setSelectedImageInfo(image);
  };

  return (
    <div>
      <div className="image-list-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h2 style={{ margin: 0 }}>X-ray Verifier</h2>
          <div style={{ marginLeft: 'auto' }}>
            <button className="open-folder-button">Open New Folder</button>
          </div>
        </div>
        <input type="text" placeholder="Search" className="search-input" />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>유형</th>
              <th>용량</th>
              <th>날짜</th>
              <th>fitness</th>
              <th>BCS</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr key={index} onClick={() => handleImageClick(image)}>
                <td>{image.name}</td>
                <td>{image.type}</td>
                <td>{image.capacity}</td>
                <td>{image.date}</td>
                <td>{image.fitness}</td>
                <td>{image.bcs}</td>
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
          imageScore={selectedImageInfo.fitness}
          imageBcs={selectedImageInfo.bcs}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}

export default ImageList;