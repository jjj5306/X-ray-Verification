import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // API 요청
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        alert('회원가입 성공!');
        navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message || '오류가 발생했습니다.'}`);
      }
    } catch (error) {
      alert(`회원가입 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <img 
        src={require('../image/colored_logo.png')} 
        alt="logo" 
        className="colored_logo" 
        onClick={() => navigate('/')} // 클릭 시 메인 화면으로 이동
        style={{ cursor: 'pointer' }} // 포인터 커서 추가
      />
      <h2>Sign up</h2>
      <form onSubmit={handleSignup} className="login-form">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Signup</button>
        <button type="button" className="signup-button" onClick={() => navigate('/login')}>Cancel</button>
      </form>
    </div>
  );
}

export default Signup;
