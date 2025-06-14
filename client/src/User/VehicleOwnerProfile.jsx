import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleOwnerSidebar from "./VehicleOwnerSidebar";
import styles from "./VehicleOwnerProfile.module.css";

const VehicleOwnerProfile = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    emailid: "",
    mobileno: "",
    dateofbirth: "",
    address: "",
    locationid: "",
    role: "vehicleowner",
  });

  const [locations, setLocations] = useState([]);
  const userId = localStorage.getItem("vehicleownerid");

  useEffect(() => {
    fetchProfile();
    fetchLocations();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/userregister/${userId}`
      );
      console.log("Fetched user:", res.data); // 👈 Yeh line zaroor daalo
      setUserData(res.data); // ya res.data.user, dekhna structure kya hai
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/locationMaster");
      setLocations(res.data);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        fullname: userData.fullname,
        dateofbirth: userData.dateofbirth,
        address: userData.address,
        locationid: userData.locationid,
        role: userData.role,
      };

      await axios.put(
        `http://localhost:5000/userregister/${userId}`,
        updateData
      );
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <VehicleOwnerSidebar />
      </div>

      <div className={styles.content}>
        <h2 className={styles.heading}>My Profile</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={userData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" value={userData.emailid} disabled />
          </div>

          <div className={styles.inputGroup}>
            <label>Mobile Number</label>
            <input type="text" value={userData.mobileno} disabled />
          </div>

          <div className={styles.inputGroup}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateofbirth"
              value={userData.dateofbirth?.substring(0, 10) || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Address</label>
            <textarea
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Location</label>
            <select
              name="locationid"
              value={userData.locationid}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc._id}>
                  {loc.locationname}
                </option>
              ))}
            </select>
          </div>

          <button className={styles.submitBtn} type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleOwnerProfile;
