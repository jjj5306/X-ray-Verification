import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직 추가
  };

  return (
    <div className="login-container">
      <img 
        src={require('../image/colored_logo.png')} 
        alt="logo" 
        className="colored_logo" 
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      />
      <h2>Log in</h2>
      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit" className="login-button">Login</button>
        <button type="button" className="signup-button" onClick={() => navigate('/signup')}>Signup</button>
      </form>
    </div>
  );
}

export default Login;