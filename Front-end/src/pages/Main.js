import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import ImageList from '../components/ImageList';
import ResultPage from '../components/resultpage';
import '../styles/Main.css';

function Main() {
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState('home'); // 초기  상태 설정
  const goToLogin = () => {
    navigate('/login');
  };
  const handleSelect = (content) => {
    setSelectedContent(content);
  };
  return (
    <div className="main-container">
      <div className="sidebar">
        <Dashboard onSelect={handleSelect} />
      </div>
      <div className="content">
        <div className="navbar">
          <button onClick={goToLogin} className="user-button">로그인</button>
        </div>
        <div className="selected-content-container">
          {selectedContent === 'home' && <img className="reverse_logo" src={require('../image/reverse_logo.png')} alt="logo" />}
          {selectedContent === 'search' && <span>검색창</span>}
          {selectedContent === 'files' && <span>파일들</span>}
          {selectedContent === 'images' && <ImageList onSelect={handleSelect} />}
          {selectedContent === 'result' && <ResultPage onBack={() => handleSelect('images')} />}
        </div>
      </div>
    </div>
  );
}

export default Main;