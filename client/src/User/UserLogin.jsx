import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UserLogin.module.css";

const UserLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailid: "",
    password: "",
    role: "", 
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/userlogin", formData);
      setMessage(res.data.message || "Login successful");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", formData.role); 
      }

      // ✅ Navigate based on selected role
      if (formData.role === "passenger") {
        navigate("/userdashboard");
      } else if (formData.role === "vehicleowner") {
        navigate("/vehicleowner/dashboard");
      } else {
        navigate("/"); // fallback
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="emailid"
            value={formData.emailid}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Login As</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Select Role</option>
            <option value="passenger">Passenger</option>
            <option value="vehicleowner">Vehicle Owner</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>Login</button>
      </form>

      {message && <p className={`${styles.message} ${styles.success}`}>{message}</p>}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
    </div>
  );
};

export default UserLogin;
