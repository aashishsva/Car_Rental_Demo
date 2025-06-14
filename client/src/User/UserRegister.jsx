import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserRegister.module.css";  // Import CSS module

const UserRegister = () => {
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    fullname: "",
    emailid: "",
    mobileno: "",
    password: "",
    dateofbirth: "",
    address: "",
    locationid: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/locationMaster")
      .then(res => setLocations(res.data))
      .catch(err => console.error("Error fetching locations", err));
  }, []);

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
      const res = await axios.post("http://localhost:5000/userregister", formData);
      setMessage(res.data.message || "Registration successful");
      setFormData({
        fullname: "",
        emailid: "",
        mobileno: "",
        password: "",
        dateofbirth: "",
        address: "",
        locationid: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Registration</h2>
      <form onSubmit={handleSubmit}>

        <div className={styles.formGroup}>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

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
          <label className={styles.label}>Mobile No</label>
          <input
            type="tel"
            name="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Enter 10 digit mobile number"
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
            minLength={6}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Date of Birth</label>
          <input
            type="date"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Location</label>
          <select
            name="locationid"
            value={formData.locationid}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Select Location</option>
            {locations.map(loc => (
              <option key={loc._id} value={loc._id}>{loc.locationname}</option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.button}>Register</button>
      </form>

      {message && <p className={`${styles.message} ${styles.success}`}>{message}</p>}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
    </div>
  );
};

export default UserRegister;
