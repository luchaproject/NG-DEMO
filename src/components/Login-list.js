import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi ke halaman lain
import '../style.css';

const LoginList = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const correctPassword = 'admin123'; // Password yang benar untuk mengakses halaman admin

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      navigate('/list-ng-admin'); // Jika password benar, redirect ke halaman admin
    } else {
      setError('Password incorrect. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>LOGIN TO ADMIN PAGE</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginList;
