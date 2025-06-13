import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css'; // ✅ Import properly
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/adminlogin', formData);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful ✅');
      setTimeout(() => {
        navigate('/admindashboard');
      }, 3000);
    } catch (error) {
      setMessage('Invalid username or password ❌');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.carAnimation}>
          <img src="/ZJFD.gif" alt="Loading..." />
        </div>
      )}
      <form className={styles.adminLoginForm} onSubmit={handleLogin}>
        <h2 className={styles.heading}>Admin Login</h2>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Login</button>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
